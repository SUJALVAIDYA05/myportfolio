# CONTACT-FIX.md — Make the Contact Form Actually Send

**Symptom:** submitting the form on `/contact` always shows
"Something went wrong sending your message — please email me directly instead."

That message is the frontend's generic error state. It appears when the
`fetch` to `/api/contact` fails **or** the server answers with a non-2xx.
This file lists the real causes (most likely first), how to tell which one
you have, and the corrected code.

---

## 1. Root causes, most likely first

1. **`dotenv` loaded too late (bug in the original `backend.md`).** With ES
   modules, all `import`s run before the file body. `lib/email.js` created
   the email client at import time, *before* `dotenv.config()` ran, so the
   API key was `undefined` — the server either crashes on startup
   (→ "connection refused" in the browser) or has no credentials.
   **Fix:** `import "dotenv/config"` as the very first import, and create the
   email client lazily inside a function (both done in §4).
2. **Resend failures were swallowed.** The Resend SDK returns
   `{ data, error }` instead of throwing, so the original code never noticed
   a rejected send. It also used `reply_to`; the SDK expects `replyTo`.
3. **Resend sandbox sender restriction.** With the default
   `onboarding@resend.dev` sender, Resend only delivers to the email
   address the Resend account was created with. If that isn't
   `sujalv641@gmail.com`, sends are rejected until you verify a domain.
4. **The backend isn't running / isn't deployed.** The Express server in
   `/server` is a separate process. Vite alone doesn't run it, and Vercel
   or Netlify hosting of the frontend does **not** host it.
5. **`VITE_API_URL` is missing or wrong.** It's baked in at build time — after
   changing it you must restart `npm run dev` or redeploy.
6. **CORS mismatch.** `CLIENT_ORIGIN` on the server must exactly equal the
   frontend's origin (e.g. `http://localhost:5173` locally, or the full
   deployed URL with no trailing slash).

---

## 2. Diagnose in two minutes

Run these in order from the project root and note the first one that fails.

```bash
# A. Does the server start cleanly?
cd server && npm start
# Expect: "Contact server running on http://localhost:4000"
# If it crashes with "Missing API key" -> cause #1 / missing .env

# B. Is it reachable? (new terminal)
curl http://localhost:4000/health
# Expect: {"ok":true}

# C. Does the endpoint work, bypassing the browser entirely?
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"hello","company":""}'
# Expect: {"success":true}  and an email in sujalv641@gmail.com
```

| Result | Meaning | Go to |
|---|---|---|
| A crashes on startup | Env vars/dotenv problem | §4 (corrected files) + §5 (`.env`) |
| B: connection refused | Server not running | Start it; if deployed, see §6 |
| C returns `{"success":false,...}` with a Resend message | Email provider rejecting | Cause #3 / bad API key |
| C works, browser still fails | Frontend URL or CORS | Causes #5 and #6; open browser DevTools → Console/Network |

In the browser, DevTools → **Network** → click the failed `contact` request.
"CORS error" = cause #6, "ERR_CONNECTION_REFUSED" = cause #4,
"404" = wrong `VITE_API_URL`, "500/502" = read the server terminal.

---

## 3. Optional: skip CORS entirely in local dev

Add a proxy so the browser only ever talks to Vite's own origin
(`vite.config.js`):

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": "http://localhost:4000" },
  },
});
```

Then leave `VITE_API_URL` **empty** locally and call `/api/contact`
(relative). Production still uses the real backend URL (§6).

---

## 4. Corrected code

### `server/index.js`

```js
import "dotenv/config"; // MUST be first
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
  console.log("Email provider key loaded:", Boolean(process.env.RESEND_API_KEY || process.env.GMAIL_APP_PASSWORD));
});
```

### `server/lib/email.js` (Resend)

```js
import { Resend } from "resend";

let client;
function getClient() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

export async function sendContactEmail({ name, email, message }) {
  const { data, error } = await getClient().emails.send({
    from: process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>",
    to: [process.env.CONTACT_EMAIL_TO],
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  if (error) throw new Error(`Resend error: ${error.name} - ${error.message}`);
  return data;
}
```

### `server/routes/contact.js`

```js
import express from "express";
import { sendContactEmail } from "../lib/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message, company } = req.body || {};

  if (company) return res.json({ success: true }); // honeypot hit: pretend success

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Please provide a valid email." });
  }

  try {
    await sendContactEmail({ name: name.trim(), email: email.trim(), message: message.trim() });
    return res.json({ success: true });
  } catch (err) {
    console.error("Contact email failed:", err); // <- the real reason shows in the server terminal
    return res.status(502).json({ success: false, error: "Email service failed. Please try again." });
  }
});

export default router;
```

### `src/components/contact/ContactForm.jsx` — submit handler

```js
async function handleSubmit(e) {
  e.preventDefault();
  setStatus("sending");
  try {
    const base = import.meta.env.VITE_API_URL ?? ""; // empty = same origin (proxy / serverless)
    const res = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, company }), // company = hidden honeypot
    });

    let data = {};
    try { data = await res.json(); } catch { /* non-JSON response */ }

    if (!res.ok || !data.success) {
      console.error("Contact API failed:", res.status, data);
      setStatus("error");
      return;
    }
    setStatus("success");
    // clear the form fields here
  } catch (err) {
    console.error("Contact request failed (network or CORS):", err);
    setStatus("error");
  }
}
```

---

## 5. Environment files

**`server/.env`** (never commit)

```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
CONTACT_EMAIL_TO=sujalv641@gmail.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
# EMAIL_FROM=Portfolio Contact <contact@yourdomain.com>   # only after verifying a domain in Resend
```

**Frontend `.env.local`** (project root)

```
VITE_API_URL=http://localhost:4000
```

**Resend checklist**
- Create the API key at resend.com → API Keys, paste into `server/.env`.
- Sign up to Resend with `sujalv641@gmail.com`, otherwise the sandbox
  sender will refuse to deliver there (cause #3).
- Check your Gmail **Spam** folder for the first test message.

**Prefer to stay on Gmail instead of Resend?** Use the Nodemailer option in
`backend.md`, with `GMAIL_USER` and a 16-character Google **App Password**
(requires 2-Step Verification). The normal Gmail password will not work.

---

## 6. If the site is deployed (production)

The Express server must be hosted somewhere too. Pick one:

### Path A — Separate backend host (Render / Railway / Fly.io)
1. Deploy the `/server` folder as a Node web service; set its env vars
   (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CLIENT_ORIGIN`) in the host's dashboard.
2. `CLIENT_ORIGIN` = your deployed frontend URL, exactly, no trailing slash.
3. In the frontend host's env settings set `VITE_API_URL` = the backend's
   public URL, then **redeploy the frontend** (Vite bakes it in at build time).
4. Free tiers may sleep — the first submission after idle can be slow.

### Path B — Vercel serverless function (recommended if the frontend is on Vercel)
No separate server needed. Create `api/contact.js` at the **project root**:

```js
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }
  const { name, email, message, company } = req.body || {};
  if (company) return res.json({ success: true });
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY missing");
    return res.status(500).json({ success: false, error: "Server misconfigured." });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>",
    to: [process.env.CONTACT_EMAIL_TO],
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  if (error) {
    console.error("Resend error:", error);
    return res.status(502).json({ success: false, error: "Email service failed." });
  }
  return res.json({ success: true });
}
```

Then: add `resend` to the **root** `package.json`, add `RESEND_API_KEY` and
`CONTACT_EMAIL_TO` in Vercel → Project Settings → Environment Variables,
leave `VITE_API_URL` **unset** (the form calls `/api/contact` on the same
origin), and redeploy. Locally, either keep using the Express server with
the proxy from §3, or run `vercel dev`.

---

## 7. Done-when checklist

- [ ] `npm start` in `/server` prints the "running" line and key-loaded `true`
- [ ] `curl` test in §2-C returns `{"success":true}`
- [ ] The email lands in `sujalv641@gmail.com` (check Spam)
- [ ] Submitting the real form shows the **success** message, not the notice
- [ ] Same works on the deployed site (env vars set + frontend redeployed)
- [ ] A deliberately wrong API key now shows the real reason in the server log

---

## 8. "Email service failed. Please try again." (server reached, provider rejected)

This message is the server's 502 response. Everything up to the email
provider is working (URL, CORS, validation). The real reason is printed in
the server terminal on a line starting `Contact email failed:`.

| Log line contains | Cause | Fix |
|---|---|---|
| `RESEND_API_KEY is not set` | Key not reaching the server | `.env` must live inside `server/`; restart after editing; on a host, set it in the dashboard and redeploy |
| `API key is invalid` | Wrong/revoked key | Generate a new key at resend.com |
| `You can only send testing emails to your own email address` | Resend sandbox restriction | Sign up to Resend with sujalv641@gmail.com, verify a domain, or use Gmail below |
| `Invalid login` / `535` / `Application-specific password required` | Gmail rejecting the password | Use a 16-character App Password (needs 2-Step Verification), pasted without spaces |

### Most reliable option: Gmail + Nodemailer (no domain needed)

1. Google Account -> Security -> turn on **2-Step Verification**.
2. Google Account -> Security -> **App passwords** -> create one named "portfolio" -> copy the 16 characters.
3. `cd server && npm install nodemailer`
4. Replace `server/lib/email.js` with the Nodemailer version from `backend.md` §4
   Option B (lazy transporter, uses `replyTo`).
5. `server/.env`:

```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
CONTACT_EMAIL_TO=sujalv641@gmail.com
GMAIL_USER=sujalv641@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

6. Restart the server, then re-run the `curl` test from §2-C.

Notes: the `from` address must be the Gmail account itself (Gmail rewrites
anything else). The visitor's address goes in `replyTo`, so hitting Reply in
Gmail answers them. The first test mail can land in Spam. On a host or
Vercel, add the same three variables in the dashboard and redeploy.

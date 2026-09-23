# BACKEND.md — Sujal Vaidya Portfolio

This portfolio does **not** need a database. All project/bio content is
static, living in `src/data/projects.js` on the frontend (see
`content.md`). The only backend responsibility is: **receive the Contact
page form submission and deliver it to Sujal's inbox**
(`sujalv641@gmail.com`).

Since the frontend is plain **Vite + React** (no built-in server), this is
built as a small **standalone Node.js/Express server** living in `/server`,
per `folder-structure.md`. The React app calls it over HTTP with `fetch`.

---

## 1. Scope

- One endpoint: `POST /api/contact`, served by the Express app in `/server`.
- Input: `{ name: string, email: string, message: string, company: string }`
  (`company` is the honeypot field — see Section 5).
- Action: send an email to Sujal containing the submission, and (nice-to-have)
  an auto-reply confirmation to the sender.
- Output: `{ success: true }` or `{ success: false, error: string }`.

No auth, no user accounts, no persistence layer required. If Sujal later
wants a record of submissions, add a lightweight log — out of scope for v1.

---

## 2. Server setup: `server/index.js`

```js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/contact", contactRouter);

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
});
```

`server/package.json` needs: `express`, `cors`, `dotenv`, plus either
`resend` or `nodemailer` (Section 4). Run with `node index.js` or
`nodemon index.js` in dev. Add `"type": "module"` to `server/package.json`
to use ES module `import` syntax as shown above (or switch every example
in this doc to `require()` if the agent prefers CommonJS — stay consistent
either way).

---

## 3. Route: `server/routes/contact.js`

```js
import express from "express";
import { sendContactEmail } from "../lib/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message, company } = req.body;

    // --- Honeypot: if this hidden field is filled, it's a bot.
    //     Silently succeed without sending, so bots don't learn to avoid it.
    if (company) {
      return res.json({ success: true });
    }

    // --- Validation ---
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Please provide a valid email." });
    }

    await sendContactEmail({ name, email, message });

    return res.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
});

export default router;
```

---

## 4. Email sending: `server/lib/email.js`

Use **Resend** (simplest for a solo dev, generous free tier, no SMTP
fiddling) as the default. Nodemailer + Gmail App Password is given as a
fallback if Sujal prefers to keep everything on his existing Gmail account.

### Option A — Resend (recommended)

```js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({ name, email, message }) {
  await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>", // swap once a custom domain is verified
    to: process.env.CONTACT_EMAIL_TO, // sujalv641@gmail.com
    reply_to: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
```

### Option B — Nodemailer + Gmail App Password (fallback)

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,          // sujalv641@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD,  // 16-char App Password, NOT the login password
  },
});

export async function sendContactEmail({ name, email, message }) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
```

> Gmail App Passwords require 2-Step Verification enabled on the Google
> account, then generating an App Password under Google Account → Security.
> Never commit the real password — only reference it via `server/.env`.

---

## 5. Frontend side: calling the API

In `src/components/contact/ContactForm.jsx`, submit with `fetch`:

```js
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message, company }), // company = honeypot field's value
});
const data = await res.json();
```

- `VITE_API_URL` lives in the frontend's `.env.local`
  (e.g. `VITE_API_URL=http://localhost:4000` in dev,
  the deployed server's URL in production).
- **Honeypot field**: add a hidden input named `company` to the form —
  invisible to humans via CSS (`display: none` or visually-hidden
  off-screen), but visible to bots that auto-fill every field. Its value
  is sent along with the real fields; the server rejects silently if it's
  non-empty (Section 3).
- Keep server-side validation even though the form also validates
  client-side — never trust client-only validation.

---

## 6. Environment Variables

### `server/.env` (never commit — add to `server/.gitignore`)

```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
CONTACT_EMAIL_TO=sujalv641@gmail.com

# Option A (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Option B (Nodemailer/Gmail) — only if using the fallback instead
GMAIL_USER=sujalv641@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
```

### `server/.env.example` (commit this one, no real values)

```
PORT=4000
CLIENT_ORIGIN=
CONTACT_EMAIL_TO=
RESEND_API_KEY=
GMAIL_USER=
GMAIL_APP_PASSWORD=
```

### Frontend `.env.local` / `.env.example` (project root)

```
VITE_API_URL=http://localhost:4000
```

---

## 7. Deployment Notes

- The frontend (Vite build output) and backend (Express server) deploy
  **separately** since they're different apps:
  - Frontend: any static host (Vercel, Netlify, GitHub Pages) serving the
    `vite build` output.
  - Backend: any Node host that keeps a process running (Render, Railway,
    Fly.io, a small VPS) — plain static hosts won't run Express.
- After deploying the backend, update the frontend's `VITE_API_URL` (in
  the hosting provider's environment variable settings, not just
  `.env.local`) to point at the deployed backend's URL, and update
  `CLIENT_ORIGIN` on the backend to the deployed frontend's URL so CORS
  allows it.
- If using Resend: verify a custom domain if Sujal wants emails to come
  "from" his own domain rather than `onboarding@resend.dev`; otherwise the
  default sender works fine for a portfolio contact form.

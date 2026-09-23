# FOLDER-STRUCTURE.md — Sujal Vaidya Portfolio

Stack: **Vite + React + JavaScript (no TypeScript) + React Router +
Tailwind CSS**, plus a small standalone **Node.js/Express** server for the
contact form. This is two separate apps in one repo (a monorepo-style
layout): the React frontend (`/`) and the Express backend (`/server`).

This split was chosen because:
- Vite doesn't run server code itself (unlike Next.js), so the contact
  form needs its own small Express server (see `backend.md`).
- React Router gives real routes for `/`, `/projects`, `/projects/:slug`,
  and `/contact`, matching the architecture in `design.md`.
- One data file (`src/data/projects.js`) drives both the Projects grid and
  the dynamic detail-page template — no page is hand-written per project.

---

## Full Tree

```
sujal-portfolio/
├── src/                              # ─── React frontend (Vite) ───
│   ├── main.jsx                      # entry point, mounts <App />, sets up React Router
│   ├── App.jsx                       # <Routes> definitions: /, /projects, /projects/:slug, /contact
│   ├── index.css                     # design tokens (CSS vars from design.md), Tailwind base
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # "/" — Intro + About (single scroll page)
│   │   ├── Projects.jsx              # "/projects" — 6-card grid
│   │   ├── ProjectDetail.jsx         # "/projects/:slug" — dynamic detail template (useParams)
│   │   └── Contact.jsx               # "/contact"
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # persistent nav on /projects, /projects/:slug, /contact
│   │   │   ├── Footer.jsx            # shared footer w/ social icons
│   │   │   └── PageTransition.jsx    # Framer Motion route-change wrapper (AnimatePresence)
│   │   │
│   │   ├── intro/
│   │   │   ├── Logo.jsx              # inline SVG "SV" monogram badge
│   │   │   └── Hero.jsx              # headline, subtext, "Contact me" button
│   │   │
│   │   ├── about/
│   │   │   └── AboutSection.jsx      # scroll-revealed About block (text + arch photo)
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx       # single grid card (used on /projects)
│   │   │   ├── ProjectGrid.jsx       # maps src/data/projects.js -> ProjectCard[]
│   │   │   ├── ProjectDetailHeader.jsx # title + tag + hero image on detail page
│   │   │   ├── TechStackChips.jsx    # small pill tags for tech stack list
│   │   │   └── DemoButton.jsx        # live-demo / GitHub-fallback / coming-soon button
│   │   │
│   │   ├── contact/
│   │   │   ├── ContactForm.jsx       # name/email/message form, fetch POST to Express API
│   │   │   └── SocialLinks.jsx       # email, GitHub, LinkedIn, Instagram chips
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx            # shared primary/secondary/ghost button
│   │       ├── Squiggle.jsx          # hand-drawn underline flourish (SVG, animatable)
│   │       ├── OvalScribble.jsx      # hand-drawn oval accent around "About"
│   │       └── ArchImage.jsx         # reusable arch-topped image frame
│   │
│   └── data/
│       └── projects.js               # array of 6 plain-object project entries (single
│                                      # source of truth for cards + detail pages — see content.md)
│
├── public/
│   ├── images/
│   │   ├── about/
│   │   │   └── about-photo.jpg       # dev/workspace photo for About section
│   │   └── projects/
│   │       ├── nexus.jpg
│   │       ├── trustledger.jpg
│   │       ├── industriguard.jpg
│   │       ├── docsage.jpg
│   │       ├── fasalrakshak.jpg
│   │       └── portfolio.jpg         # add once the live site has a screenshot of itself
│   └── favicon.ico
│
├── server/                           # ─── Express backend (contact form only) ───
│   ├── index.js                      # Express app entry, mounts the /api/contact route, CORS
│   ├── routes/
│   │   └── contact.js                # POST /api/contact — validation + honeypot check
│   ├── lib/
│   │   └── email.js                  # Resend/Nodemailer helper (see backend.md)
│   ├── .env.example                  # CONTACT_EMAIL_TO, RESEND_API_KEY, etc. (no secrets)
│   └── package.json                  # separate deps (express, cors, resend/nodemailer, dotenv)
│
├── .env.example                      # frontend env template — VITE_API_URL=http://localhost:4000
├── .env.local                        # actual frontend env (gitignored)
├── index.html                        # Vite entry HTML — load Google Fonts here
├── vite.config.js
├── tailwind.config.js                # register design tokens as Tailwind theme extensions
├── postcss.config.js
├── package.json                      # frontend deps (react, react-router-dom, framer-motion, tailwindcss)
├── .gitignore
└── README.md                         # how to run both the Vite dev server and Express server locally
```

---

## Notes for the AI agent building this

1. **`src/data/projects.js` is the single source of truth.** Both
   `ProjectGrid.jsx` (the `/projects` page) and `ProjectDetail.jsx` (the
   `/projects/:slug` page, via `useParams()` + `.find()`) should read from
   this one file — never hardcode project text directly inside a page
   component. This makes adding a 7th project later a one-object addition,
   no new route/component files needed. It's a plain array of JS objects —
   no TypeScript types, just consistent object shape (see `content.md` §5).
2. **Routing**: define all routes in `src/App.jsx` using
   `react-router-dom`'s `<Routes>`/`<Route>`, e.g.
   `<Route path="/projects/:slug" element={<ProjectDetail />} />`. In
   `ProjectDetail.jsx`, read the slug with `useParams()`, look it up in
   `src/data/projects.js`, and redirect to `/projects` (or show a
   not-found state) if no match is found.
3. **Images**: since this is plain Vite (no Next.js `<Image />`), reference
   project screenshots and the about photo directly from `public/images/...`
   with a standard `<img>` tag, `loading="lazy"`, and explicit `width`/
   `height` (or `aspect-ratio` in CSS) to avoid layout shift.
4. **Fonts**: load `Playfair Display` (incl. italic) and `Inter` via a
   Google Fonts `<link>` tag in `index.html`, expose as CSS variables in
   `src/index.css`, consumed by the Tailwind config, per `design.md` §2.2.
5. **Frontend ↔ backend connection**: the React app talks to the Express
   server over HTTP using `fetch`, not through a bundler-level API route.
   Store the Express server's base URL in `VITE_API_URL` (frontend `.env`)
   and call `` `${import.meta.env.VITE_API_URL}/api/contact` `` from
   `ContactForm.jsx`. Enable CORS on the Express server for the Vite dev
   origin (`http://localhost:5173` by default) — see `backend.md`.
6. **Do not create a database** for this project — project data is static
   content (`src/data/projects.js`); the only dynamic/server piece is the
   contact form email send in `server/routes/contact.js` (see
   `backend.md`).
7. **Running locally**: two processes — `npm run dev` in the project root
   for Vite (frontend), and `npm run dev`/`npm start` inside `server/` for
   Express (backend). Document both commands in the root `README.md`.

# CONTENT.md — Sujal Vaidya Portfolio

This is the actual copy to place into the site — the "what to say," while
`design.md` covers "how it should look." Where something is still pending
(a live link, a photo), it is marked `TODO` — keep the layout slot in place
per `design.md` so nothing has to be redesigned later, just filled in.

---

## 1. Global / Meta

- **Site title tag**: `Sujal Vaidya — Full Stack Developer`
- **Meta description**: `Portfolio of Sujal Vaidya, a Computer Science Engineering student and full-stack developer building scalable, user-focused software.`
- **Footer text**: `© 2026 Sujal Vaidya`

---

## 2. Home — Intro Section

- **Logo monogram**: `SV`
- **Headline** (mixed italic/upright, per `design.md` §3.1):
  > *Hello*, I am Sujal!
- **Subtext** — pick one, or use as-is (all are original, short, dev-flavored):
  1. `I turn "it should work" into "it works." My code is built on clean logic and real problem-solving.`
  2. `Full-stack developer who believes good software is equal parts structure and craft.`
  3. `I write code that ships — scalable, thoughtful, and built to actually solve the problem.`
- **Button**: `Contact me` → links to `/contact`

---

## 3. Home — About Section

- **Heading**: *About* **SUJAL VAIDYA** (italic "About" with the oval scribble accent, upright caps surname, per `design.md` §4.2)
- **Bio paragraph** (as provided by Sujal):

  > I'm Sujal Ashok Vaidya, a Computer Science Engineering student
  > specializing in Full Stack Development. I'm passionate about building
  > scalable, user-focused software solutions and enjoy solving technical
  > problems through practical, structured approaches. My technical skill
  > set includes C, Java, Python, and JavaScript, along with technologies
  > such as React.js, Node.js, and Express.js, and databases including
  > MySQL and MongoDB. I'm also experienced with Git, GitHub, and modern
  > development tools. Alongside my technical capabilities, I bring strong
  > interpersonal communication, critical problem-solving, teamwork, and an
  > iterative approach to development. I'm continuously expanding my
  > knowledge and looking for opportunities to apply my skills, learn from
  > challenging problems, and grow as a software developer.

- **Optional small stat line** under the bio (nice-to-have, mirrors the
  "12+ / 30+ / 3" stat row style seen in the FasalRakshak screenshot, keep
  understated/text-only here, not badge-heavy):
  `CGPA: 8.1 (till 6th semester)`
- **About photo**: `TODO` — dev/workspace-themed image, placeholder until
  Sujal supplies a personal photo (see `design.md` §4.2).

---

## 4. Projects Page (`/projects`)

- **Heading**: `Projects` (with squiggle flourish, per `design.md` §4.3)
- **Grid order**: NEXUS → TrustLedger → Industriguard-AI → DocSage →
  FasalRakshak → This Portfolio

Card blurbs (1–2 lines each, for the grid — full write-ups are in Section 5
for the detail pages):

| Project | Card blurb |
|---|---|
| NEXUS | Full-stack reselling marketplace with role-based access, real-time chat, and server-authoritative checkout. |
| TrustLedger | Milestone-based escrow platform with AI-assisted dispute resolution and automated invoicing. |
| Industriguard-AI | Real-time PPE compliance monitoring using computer vision and live safety analytics. |
| DocSage | RAG-based chatbot that answers questions strictly from your uploaded PDFs. |
| FasalRakshak | AI-powered crop failure predictor for Indian farmers, with multi-language voice support. |
| This Portfolio | The site you're on right now — designed and built from scratch, end to end. |

---

## 5. Project Detail Pages (`data/projects.js` source content)

Each object below maps to one entry in `data/projects.js` per
`folder-structure.md`. Descriptions here are condensed/rewritten for a
portfolio audience from Sujal's fuller project write-ups (kept shorter than
the original docs — full technical depth can live in each project's own
GitHub README).

### 5.1 NEXUS

```js
{
  slug: "nexus",
  name: "NEXUS",
  tagline: "Online Reselling Platform",
  summary: "A full-stack marketplace for buying and selling pre-owned goods, with role-based access, real-time chat, and a server-authoritative checkout system.",
  overview: "NEXUS is a full-stack online reselling marketplace built for a complete buy/sell workflow rather than a simple listings page. It supports Buyers, Sellers, and Admins through role-based access control, with 24+ frontend pages routed according to each role.",
  features: [
    "Role-based access control for Buyer, Seller, and Admin",
    "Real-time buyer–seller chat",
    "Wishlist functionality",
    "JWT-based authentication integrated with role permissions",
    "Server-authoritative checkout with database-backed transactions",
    "Automated platform fee calculation at checkout",
    "Multi-image uploads via Cloudinary",
  ],
  techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary"],
  highlights: [
    "Backend-controlled transaction processing (not client-trusted)",
    "Database-backed checkout workflow",
    "Real-time communication between users",
    "Frontend route protection by role",
  ],
  liveUrl: "https://nexus-beige-chi.vercel.app/",
  githubUrl: null, // TODO — add repo link if it should be public
  image: "/images/projects/nexus.jpg",
}
```

### 5.2 TrustLedger

```js
{
  slug: "trustledger",
  name: "TrustLedger",
  tagline: "Milestone-Based Escrow Platform",
  summary: "An escrow platform that locks client funds in digital wallets and releases them only after mutual approval — with AI-assisted milestone generation and dispute resolution.",
  overview: "TrustLedger manages client funds through a milestone-based escrow workflow: funds stay locked while a milestone's work is in progress and are released only after both parties approve. AI (Gemini 1.5 Flash) assists with generating milestones and supporting dispute resolution, alongside real-time mediation chat and automated invoicing.",
  features: [
    "Milestone-based fund release (not single lump-sum transactions)",
    "Digital wallets holding client funds in escrow",
    "AI-assisted milestone generation (Gemini 1.5 Flash)",
    "AI-assisted dispute resolution support",
    "Real-time mediation chat between parties",
    "Automated invoice generation",
  ],
  techStack: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Gemini 1.5 Flash", "Docker"],
  highlights: [
    "Escrow-based transaction workflow design",
    "AI integrated directly into the milestone/dispute workflow, not bolted on",
    "Dockerized deployment",
    "PostgreSQL + Prisma data layer",
  ],
  liveUrl: null, // TODO — Sujal to provide
  githubUrl: null,
  image: "/images/projects/trustledger.jpg",
}
```

### 5.3 Industriguard-AI

```js
{
  slug: "industriguard-ai",
  name: "Industriguard-AI",
  tagline: "AI-Powered Industrial Safety Surveillance",
  summary: "Real-time PPE compliance detection for industrial workplaces, using computer vision, QR-based employee identification, and live safety analytics.",
  overview: "Industriguard-AI monitors workplace safety and detects PPE (helmet, vest, gloves, glasses, boots) compliance in real time using YOLOv8 computer vision, paired with QR-based employee identification so observations are tied to a specific worker. Results are stored, reported, and streamed live to a dashboard via WebSockets.",
  features: [
    "Real-time PPE compliance detection (YOLOv8)",
    "QR-based employee identification",
    "Live employee safety status dashboard",
    "Compliance trend tracking over time",
    "Exportable safety reports",
  ],
  techStack: ["YOLOv8", "React", "Flask", "SQLite", "WebSockets"],
  highlights: [
    "End-to-end pipeline: detection → storage → reporting → live analytics",
    "Computer-vision model in a real production-style monitoring app",
    "Real-time updates via WebSockets",
  ],
  liveUrl: null, // no live demo available
  githubUrl: "https://github.com/SUJALVAIDYA05", // TODO — swap for project-specific repo if available
  image: "/images/projects/industriguard.jpg",
}
```

### 5.4 DocSage

```js
{
  slug: "docsage",
  name: "DocSage",
  tagline: "RAG-Based PDF Question-Answering Chatbot",
  summary: "Upload any PDF and ask it questions — answers are generated strictly from the document's own content using retrieval-augmented generation.",
  overview: "DocSage answers questions using only the content of documents a user uploads, rather than relying on the language model's general knowledge. It extracts text from PDFs, converts it into embeddings, retrieves the most relevant passages with a vector search, and uses an LLM to generate a grounded, context-aware answer.",
  features: [
    "PDF upload and text extraction (PyMuPDF)",
    "Semantic embeddings (Sentence Transformers)",
    "Fast vector search over document content (FAISS)",
    "Context-aware answer generation (Groq LLM — LLaMA 3.3)",
    "Interactive chat interface (Gradio)",
  ],
  techStack: ["PyMuPDF", "Sentence Transformers", "FAISS", "Groq / LLaMA 3.3", "Gradio"],
  highlights: [
    "Full RAG pipeline: extraction → embeddings → retrieval → generation",
    "Document-grounded answers instead of general-purpose chat",
    "Deployed and usable via Hugging Face Spaces",
  ],
  liveUrl: "https://huggingface.co/spaces/sujalvaidya/DocSage",
  githubUrl: null,
  image: "/images/projects/docsage.jpg",
}
```

### 5.5 FasalRakshak

```js
{
  slug: "fasalrakshak",
  name: "FasalRakshak",
  tagline: "Hyper-Local Crop Failure Predictor",
  summary: "A mobile-first web app that predicts crop failure risk at the district level in India, combining satellite NDVI data, weather forecasts, and AI-generated recommendations for small and marginal farmers.",
  overview: "FasalRakshak helps small and marginal farmers anticipate crop risk before it becomes crop loss. Given a district, crop type, and growth stage, it produces a 0–100 crop health score split across three risk channels — drought stress, pest pressure, and nutrient deficiency — plus a 7-day weather-correlated forecast. Recommendations are generated by the Gemini API and delivered in English, Hindi, or Kannada, with voice readout in Kannada for low-literacy users on basic smartphones over 3G.",
  features: [
    "District-level crop health score (0–100)",
    "Three-channel risk scoring: drought, pest, nutrient deficiency",
    "7-day weather-correlated risk forecast",
    "Multi-language, quantity-aware recommendations (English, Hindi, Kannada)",
    "Voice readout via Web Speech API for low-literacy users",
    "Mobile-first design built for basic smartphones on 3G",
  ],
  techStack: ["HTML5", "CSS3", "JavaScript", "Node.js / FastAPI", "Open-Meteo API", "Sentinel-2 / MODIS NDVI", "Gemini API", "Web Speech API"],
  highlights: [
    "Real satellite NDVI + weather data combined into a single risk score",
    "Designed for accessibility: low-literacy, low-bandwidth users",
    "Supports 10 major crops including Paddy, Wheat, Maize, Ragi, and Cotton",
  ],
  liveUrl: "https://hyper-local-crop-failure-predictor-sigma.vercel.app/",
  githubUrl: null,
  image: "/images/projects/fasalrakshak.jpg",
}
```

### 5.6 This Portfolio

```js
{
  slug: "portfolio",
  name: "This Portfolio",
  tagline: "Personal Developer Portfolio",
  summary: "The site you're currently on — designed to match a set of visual references pixel-for-pixel and built as a real React application, not a template.",
  overview: "This portfolio was built to present Sujal's work with the same craft and attention to detail as the projects it showcases: a custom design system, a scroll-driven Intro/About experience, a dynamic project-template architecture, and a working Express-backed contact form.",
  features: [
    "Custom design system (color, type, spacing tokens)",
    "Scroll-revealed Intro → About experience on a single page",
    "Data-driven project template powering all project detail pages",
    "Working contact form with a standalone Express backend for email delivery",
  ],
  techStack: ["React", "Vite", "React Router", "Tailwind CSS", "Framer Motion", "Node.js", "Express"],
  highlights: [
    "Built from image references into a fully custom, non-templated design",
    "Reusable component architecture (see folder-structure.md)",
  ],
  liveUrl: null, // TODO — add once deployed
  githubUrl: null, // TODO
  image: "/images/projects/portfolio.jpg", // TODO — screenshot once built
}
```

---

## 6. Contact Page (`/contact`)

- **Heading**: `Let's talk`
- **Subtext**: `Have a project in mind, a question, or just want to say hi? Reach out — I usually reply within a day or two.`
- **Contact list**:

| Label | Value | Link |
|---|---|---|
| Email | sujalv641@gmail.com | `mailto:sujalv641@gmail.com` |
| GitHub | SUJALVAIDYA05 | https://github.com/SUJALVAIDYA05 |
| LinkedIn | Sujal Vaidya | https://www.linkedin.com/in/sujal-vaidya-/ |
| Instagram | @sujalvaidya_ | https://www.instagram.com/sujalvaidya_/?hl=en |

- **Contact form fields**: Name, Email, Message, `Send` button (wired to
  `POST /api/contact` per `backend.md`).
- **Success message**: `Thanks for reaching out — I'll get back to you soon!`
- **Error message**: `Something went wrong sending your message — please email me directly instead.`

---

## 7. Outstanding TODOs (fill in as they arrive)

- [ ] TrustLedger — live demo link
- [ ] Portfolio — live demo link + self-screenshot, once deployed
- [ ] Industriguard-AI — project-specific GitHub repo link (currently falls back to profile)
- [ ] About section — Sujal's own photo (currently a placeholder dev/workspace image)
- [ ] Confirm final hero subtext line from the 3 options in Section 2

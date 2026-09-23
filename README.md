# Sujal Vaidya — Portfolio

Personal developer portfolio built with **Vite + React + React Router + Tailwind CSS**, with a standalone **Express** backend for the contact form.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Frontend (Vite dev server)

```bash
# From the project root
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

### Backend (Express contact form server)

```bash
cd server
npm install
cp .env.example .env   # fill in your email/API keys (or leave blank to test in dev mode)
npm start              # starts the Express server on port 4000 (or 'npm run dev' with watch mode)
```

Runs at [http://localhost:4000](http://localhost:4000).

### Environment Variables

**Frontend** (`.env.local` in project root):
```
VITE_API_URL=http://localhost:4000
```

**Backend** (`server/.env`):
```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
CONTACT_EMAIL_TO=sujalv641@gmail.com
RESEND_API_KEY=your_resend_api_key_here
```

## Project Structure

See [folder-structure.md](./folder-structure.md) for the full tree.

## Design System

See [design.md](./design.md) for colors, typography, spacing, and component specs.

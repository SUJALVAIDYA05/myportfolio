# DESIGN.md — Sujal Vaidya Portfolio

This document is the single source of truth for the visual design of the site.
Follow it exactly. Where a reference image was provided, match layout, spacing,
type pairing and color mood as closely as possible — do not substitute a
generic template look.

---

## 1. Site Architecture (read this first)

- **`/` (Home)** — Intro section + About section on ONE page. About is
  revealed as the user scrolls down from Intro (scroll-triggered reveal, see
  `animations.md`). This is NOT two separate routes.
- **`/projects`** — Projects grid page (separate route).
- **`/projects/:slug`** — Dynamic project detail page, one per project
  (separate route, templated — do not hardcode 6 pages).
- **`/contact`** — Contact page (separate route).

Stack: **Vite + React + JavaScript (no TypeScript) + React Router +
Tailwind CSS**, with a small standalone **Node.js/Express** server for the
contact form (see `backend.md`). React Router handles `/projects`,
`/projects/:slug`, `/contact` as real routes, while Intro+About stay
together as one scrollable route at `/`. Preserve this exact route
structure and the distinction between "single-page scroll" (Home) vs
"separate pages" (Projects, Project Detail, Contact) regardless of how the
agent organizes files.

---

## 2. Design Tokens

### 2.1 Color Palette

Warm, minimal, editorial. Cream background, near-black charcoal text, a single
rust/terracotta accent used sparingly for emphasis, links, and CTAs.

```css
:root {
  --color-bg:            #F3EEE3; /* main page background, cream */
  --color-bg-alt:        #EAE2D0; /* card / arch-image backdrop, slightly deeper cream */
  --color-surface:       #FFFFFF; /* rare — form inputs, elevated cards if needed */

  --color-text-primary:  #262220; /* headings, body copy */
  --color-text-secondary:#6B6259; /* subtext, captions, muted labels */
  --color-text-inverse:  #F3EEE3; /* text on dark/accent-filled buttons */

  --color-accent:        #A85C32; /* rust/terracotta — links, underlines, logo fill */
  --color-accent-dark:   #8B4826; /* hover/active state of accent */
  --color-accent-soft:   #EFD9C6; /* faint accent backgrounds, badges */

  --color-border:        #DDD3C0; /* hairline dividers, card outlines */
  --color-overlay:       rgba(38, 34, 32, 0.55); /* modal/menu overlays if needed */
}
```

Do not introduce additional hues. Project screenshots inside arch-frames will
naturally bring their own colors (NEXUS is dark navy/pink, DocSage is dark
indigo, Industriguard is dark/orange, FasalRakshak is dark green) — that
contrast against the cream frame is intentional and should be preserved, not
color-matched.

### 2.2 Typography

Two-font pairing: an elegant serif for display/headings (with true italics
used for emphasis words), and a clean sans for body copy and UI.

```css
--font-display: 'Playfair Display', 'Georgia', serif; /* headings */
--font-body:    'Inter', -apple-system, sans-serif;    /* paragraphs, nav, buttons, forms */
```

Load both from Google Fonts, including the **italic** weight of Playfair
Display (used for words like "*Hello*" and "*About*").

Type scale (fluid, using `clamp()`):

```css
--fs-hero:     clamp(2.75rem, 6vw, 5rem);      /* "Hello, I am Sujal!" */
--fs-h1:       clamp(2.25rem, 4.5vw, 3.25rem); /* "About SUJAL VAIDYA", "Projects" */
--fs-h2:       clamp(1.5rem, 3vw, 2rem);       /* project card titles, section subheads */
--fs-body-lg:  1.25rem;   /* hero subtext */
--fs-body:     1.0625rem; /* paragraphs */
--fs-small:    0.9375rem; /* captions, nav links, buttons */

line-height: 1.15 for display headings; 1.6 for body copy.
```

### 2.3 Spacing & Layout

- Max content width: `1200px`, centered, `padding-inline: 24px` on mobile,
  `48px+` on desktop.
- Section vertical rhythm: generous — `96–140px` top/bottom padding on
  desktop sections, `56–72px` on mobile.
- Base spacing unit: `8px` grid.

### 2.4 Shape & Elevation

- Buttons: fully rounded pill (`border-radius: 999px`) for primary CTAs like
  "Contact me", "Start Analysis"-style buttons.
- Arch-shaped image frames (see 3.3): flat sides, semicircular top —
  `border-radius: 999px 999px 0 0` on a container with fixed aspect ratio, OR
  an SVG clip-path arch. Prefer CSS `border-radius` on a `3:4`-ish container
  for simplicity.
- Shadows: none by default (flat, editorial look). Use a very soft shadow
  only on hover of interactive cards: `0 12px 24px -8px rgba(38,34,32,0.15)`.

---

## 3. Global Components

### 3.1 Logo

Circular SVG badge, matching the reference: a thin outer ring, rust-brown
(`--color-accent`) circular fill, and a serif monogram **"SV"** centered in
cream/white, in italic Playfair Display style lettering (matching the "RS"
reference mark's elegance).

Build it as an inline SVG (not a raster image) so it stays crisp:

```html
<svg viewBox="0 0 72 72" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
  <circle cx="36" cy="36" r="34" fill="var(--color-accent)" stroke="var(--color-accent-dark)" stroke-width="1.5"/>
  <circle cx="36" cy="36" r="29" fill="none" stroke="#F3EEE3" stroke-width="1"/>
  <text x="36" y="45" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="26" fill="#F3EEE3">SV</text>
</svg>
```

Placed top-center on the Intro section; smaller version (top-left, linked to
`/`) in the persistent nav on Projects/Contact pages.

### 3.2 Navigation

- On the Home page (Intro+About), keep chrome minimal — just the centered
  logo at the very top of Intro; no traditional navbar links needed there,
  since it's a scroll story.
- On `/projects`, `/projects/:slug`, `/contact`, show a slim persistent nav
  bar: logo (left, links to `/`) + text links "Projects" / "Contact" (right),
  sans-serif, `--fs-small`, uppercase or normal case with generous letter
  spacing. Active route gets an accent-colored underline.
- Footer (on all non-Home pages, and at the end of Home): small, centered,
  muted — "© 2026 Sujal Vaidya" + the four social icons (see 6.4), reusing
  the Contact page's icon set at a smaller size.

### 3.3 Arch Image Frame

Reused across About (photo) and Projects (screenshots):

- Container with a flat bottom/sides and a semicircular top edge.
- Background `--color-bg-alt` shows behind the image if the image doesn't
  perfectly fill the arch (use `object-fit: cover` so it always fills it).
- Implementation: a `div` with `border-radius: 50% 50% 0 0 / <value> <value> 0 0`
  sized so the top curve reads as a true semicircle at the container's
  width, `overflow: hidden`, image inside with `object-fit: cover`.

### 3.4 Hand-drawn Accents

Two recurring hand-drawn doodle accents appear in the reference designs:
1. An **oval scribble** circling part of a heading (used around "About").
2. A **squiggle/underline flourish** trailing off a heading (used after
   "Design Focuses" → now "Projects").

Implement both as inline SVG freehand paths, stroke-only, no fill,
`stroke="var(--color-text-primary)"`, `stroke-width: 2`, `stroke-linecap: round`.
Keep them loose and imperfect (slightly wobbly bezier curves), not
geometric — they should read as pen-drawn, not vector-perfect. These animate
in with a "draw-on" effect (see `animations.md`).

### 3.5 Buttons

- **Primary (filled)**: rust-brown background, cream text, pill shape,
  `padding: 14px 32px`, `--fs-small` weight 600. Hover: darker accent +
  slight upward translate (`translateY(-2px)`).
- **Secondary (outline/ghost)**: transparent or `--color-bg-alt` background,
  `--color-text-primary` text, thin border. Used for things like "How it
  works" style secondary actions if ever needed.
- **Text link style**: rust-brown text, no underline by default, underline
  or arrow appears on hover. Used for inline links like social links on
  Contact.

---

## 4. Page-by-Page Specs

### 4.1 Home — Intro Section (top of `/`)

Reference: full-bleed cream background, everything centered, generous
vertical whitespace, content vertically centered in the viewport
(`min-height: 100svh`).

Top → bottom, centered:
1. Logo (SVG, ~56–64px), see 3.1.
2. Hero heading, `--fs-hero`, two-part: *"Hello"* in italic Playfair
   Display, followed by regular-weight `, I am Sujal!` in upright Playfair
   Display — matching the mixed italic/upright treatment in the reference.
3. Subtext, `--fs-body-lg`, `--color-text-secondary`, centered, max-width
   ~560px, 2 lines. This replaces the print/design quote with a short,
   software-developer-flavored line (see `content.md` for the exact copy
   options to use here).
4. **"Contact me" button** — styled as an actual pill button (primary
   style, 3.5), not a bare text link as in the original reference. `href`
   points to `/contact`.

### 4.2 Home — About Section (revealed on scroll)

Reference: two-column layout on desktop — text column left, arch-framed
photo right. On mobile, stack to a single column (photo first or text first
— text first is preferable for readability/SEO).

- Left column:
  - "About" heading treatment: the word **"About"** in italic Playfair
    Display with the hand-drawn oval scribble loosely encircling it (3.4,
    accent #1), followed by **"SUJAL VAIDYA"** in upright Playfair Display,
    same line, same size, not italic, optionally letter-spaced/uppercase to
    match the reference's bold caps treatment of the surname.
  - Bio paragraph below, `--fs-body`, `--color-text-primary`, max-width
    ~520px, comfortable line-height. Use the bio text from `content.md`.
- Right column: arch-framed photo (3.3). Use a workspace/coding-related
  image (developer at a desk with a laptop and multiple monitors, or a
  clean flat-lay of a dev setup) as the default placeholder until Sujal
  supplies a personal photo — keep the same warm color grading as the rest
  of the palette if possible (avoid a jarring, oversaturated stock photo).
- This whole section fades/slides in as the user scrolls to it from Intro
  (see `animations.md`) — it should NOT be visible/animated-in on initial
  page load.

### 4.3 Projects Page (`/projects`)

Reference: "Design Focuses" 3-card layout, adapted for **6 project cards**.

- Page heading, top-center: **"Projects"** (replacing "Design Focuses"),
  `--fs-h1`, rust-brown, Playfair Display, with the hand-drawn squiggle
  flourish (3.4, accent #2) trailing off the end of the word, same as the
  reference.
- Below: a responsive grid of 6 project cards.
  - Desktop: **3 columns × 2 rows**.
  - Tablet: 2 columns × 3 rows.
  - Mobile: 1 column, stacked.
  - Cards are noticeably smaller than the 3-card reference (since there are
    twice as many) — arch-framed screenshot on top (3.3, ~16:11 or 4:3
    ratio), project name below in Playfair Display `--fs-h2`, a short
    rust-brown horizontal divider line under the name, then a 1–2 line
    plain-language description in `--color-text-secondary`, `--fs-small`.
  - Entire card is a link to `/projects/:slug`. On hover: image scales
    slightly (`scale(1.03)`) inside its clipped frame, card lifts subtly
    (soft shadow from 2.4).
- The 6 cards, in order: NEXUS, TrustLedger, Industriguard-AI, DocSage,
  FasalRakshak, and This Portfolio (see `content.md` for exact copy/slugs).

### 4.4 Project Detail Page (`/projects/:slug`)

One template, driven by data (see `folder-structure.md` → `data/projects.js`
and `content.md`), rendering:

1. Small nav/back link to `/projects` at top ("← All Projects").
2. Project title, `--fs-h1`, Playfair Display.
3. One-line role/summary tag under the title, `--color-text-secondary`.
4. Large hero screenshot — same arch-frame treatment as the card, but
   bigger (full content-width or large centered image), OR full-bleed
   rectangular image if the arch shape feels too small for a dashboard-style
   screenshot (use judgment per screenshot — dashboards like Industriguard
   read better as a plain rounded-rect image, not an arch).
5. Body content: Overview, Core Features (as a clean list, not the raw
   heading-heavy structure from the source docs — rewritten for a portfolio
   audience per `content.md`), Tech Stack (as small pill/tag chips using
   `--color-bg-alt` background), and Technical Highlights.
6. At the very end: a prominent primary button —
   - **"View Live Demo →"** linking out (`target="_blank"`) if a live link
     exists.
   - If no live demo (Industriguard-AI): show **"View on GitHub →"** instead,
     same button style, linking to the GitHub profile until a project-specific
     repo link is supplied.
   - If link is pending (TrustLedger, Portfolio itself): show a disabled/muted
     button reading **"Live demo coming soon"** rather than omitting it, so
     the layout stays consistent across all 6 detail pages.

### 4.5 Contact Page (`/contact`)

No reference image was supplied for this page — designed to match the rest
of the site (Claude's own design, same tokens from Section 2):

- Centered layout, cream background, generous vertical whitespace, similar
  mood to the Intro section (this page should feel like a natural extension
  of the Intro, not a jarring style shift).
- Heading: **"Let's talk"** or **"Get in touch"** in Playfair Display
  `--fs-h1` (see `content.md` for final copy), short one-line subtext under
  it in `--color-text-secondary`.
- Two things on this page:
  1. **Direct contact list** — four rows/chips, each pairing a small
     monochrome icon (envelope, GitHub mark, LinkedIn mark, Instagram mark)
     with a label and the actual link, opening in a new tab except email
     (`mailto:`). Style each as a pill/chip using `--color-bg-alt`
     background, hover fills with `--color-accent-soft`.
  2. **Optional simple contact form** (Name, Email, Message, Send button) —
     posts to the backend contact endpoint described in `backend.md`. Style
     inputs with `--color-surface` background, `--color-border` outline,
     rounded corners (`12px`), focus state uses `--color-accent` outline.
- On submit success/error, show inline confirmation text (no page reload).

---

## 5. Responsive Rules (apply everywhere)

- Breakpoints: mobile `<640px`, tablet `640–1024px`, desktop `>1024px`.
- Hero text and section headings scale via `clamp()` (2.2) — never fix a
  pixel size that overflows small screens.
- Two-column sections (About, some detail-page layouts) stack to one column
  under `1024px`.
- Nav collapses gracefully — with only 2 links (Projects, Contact) a
  hamburger menu is unnecessary; keep both links visible even on mobile,
  reduce logo size instead if space is tight.
- Touch targets (buttons, chips, cards) stay at least `44px` tall on mobile.

---

## 6. Accessibility Notes

- Maintain WCAG AA contrast: verify `--color-text-secondary` (#6B6259) on
  `--color-bg` (#F3EEE3) passes for body text size; if not, darken slightly
  for body copy use (keep the lighter tone for large/caption text only).
- All images need descriptive `alt` text (project name + one-line purpose).
- Buttons/links need visible focus states (accent-colored outline), not
  just hover states — the site will be operated by keyboard/screen reader
  users too.
- Decorative SVG doodles (3.4) should be marked `aria-hidden="true"`.

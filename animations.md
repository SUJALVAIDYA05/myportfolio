# ANIMATIONS.md — Sujal Vaidya Portfolio

Motion should feel calm and editorial, matching the flat/minimal visual
design — not bouncy or flashy. Prefer opacity + subtle translate/scale over
anything spring-heavy or attention-grabbing. Recommended library:
**Framer Motion** (works the same in plain Vite/React as anywhere else).

Respect `prefers-reduced-motion`: every animation in this doc must have a
reduced-motion fallback that simply shows the end state instantly (no
transform/opacity animation, no scroll-triggered delay).

---

## 1. Timing & Easing Standards

```ts
export const EASE = [0.22, 1, 0.36, 1]; // smooth "ease-out-expo"-ish, use everywhere

export const DURATIONS = {
  fast: 0.2,      // hovers, micro-interactions
  base: 0.45,     // element enter/exit
  slow: 0.8,      // section reveals, hero entrance
};
```

Stick to these three durations sitewide — don't invent new ones per
component, for visual consistency.

---

## 2. Home — Intro Section (on page load)

Staggered entrance, top to bottom, each element fading up slightly:

1. Logo: `opacity 0→1`, `translateY(-8px→0)`, `duration: base`, delay `0`.
2. Headline: same fade-up, delay `0.15s`.
3. Subtext: same fade-up, delay `0.3s`.
4. "Contact me" button: same fade-up, delay `0.45s`.

```ts
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.base, ease: EASE, delay },
  }),
};
```

Run once on initial mount — do not repeat/re-trigger this on scroll-back-up.

---

## 3. Home — About Section (scroll reveal)

This is the key interaction tying Intro → About together on the single
Home route:

- Use an intersection observer (`useInView` from Framer Motion,
  `once: true`, `amount: 0.3`) on the About section container.
- On entering the viewport:
  - Text column: fade in + slide up (`y: 24→0`, `opacity 0→1`,
    `duration: slow`, `ease: EASE`).
  - Arch photo column: fade in + slight scale (`scale: 0.96→1`,
    `opacity 0→1`, `duration: slow`), delayed `0.15s` after the text starts,
    so it reads as a two-beat reveal rather than everything popping at once.
- Do not use parallax/pinning — keep this a straightforward reveal-on-scroll,
  not a scroll-jacked/scrubbed animation (matches the calm, editorial feel).

---

## 4. Hand-Drawn Accents (Squiggle / Oval Scribble)

Both the underline squiggle (Projects heading) and the oval scribble
(About heading) should animate as if being **drawn by a pen** the first
time they scroll into view:

```css
.squiggle-path {
  stroke-dasharray: 400; /* set to the path's actual length */
  stroke-dashoffset: 400;
}
```

```ts
// Animate to stroke-dashoffset: 0 over ~0.9s, ease: EASE, once in view,
// triggered slightly AFTER the heading text itself has faded in (~0.2s delay)
// so it reads as "text appears, then gets underlined/circled."
```

---

## 5. Projects Grid (`/projects`)

- **On page load**: cards fade/slide up in a staggered grid entrance —
  `stagger: 0.06s` between cards, each card using the same `fadeUp` variant
  as Section 2, `duration: base`.
- **On card hover**:
  - Screenshot inside the arch frame: `scale(1.03)`, `duration: fast`,
    `ease: EASE`, `overflow: hidden` on the parent so it doesn't spill past
    the arch edge.
  - Card container: very soft shadow fade-in (`box-shadow` from none to the
    soft elevation token in `design.md` §2.4) + `translateY(-4px)`.
  - Project name text: color shifts to `--color-accent` on hover.
- **On card tap (mobile)**: since there's no hover, give a brief `scale(0.98)`
  active-state press feedback instead, `duration: fast`.

---

## 6. Project Detail Page (`/projects/[slug]`)

- Hero image and title fade in on load, same `fadeUp` pattern, staggered
  (image, then title, then tag line, then body content), all `duration: base`.
- Tech stack chips: staggered fade-in, `stagger: 0.04s` per chip, subtle —
  these are secondary content, keep their entrance quick and quiet.
- **"View Live Demo" / "View on GitHub" / "Coming soon" button** at page
  end: on hover, same button hover treatment as global buttons (`design.md`
  §3.5) — darker fill + `translateY(-2px)`. If it's the disabled
  "coming soon" state, no hover animation (visually communicate disabled,
  e.g. reduced opacity, `cursor: not-allowed`).

---

## 7. Contact Page (`/contact`)

- Heading + subtext: standard `fadeUp` entrance on load.
- Contact chips (email/GitHub/LinkedIn/Instagram): staggered fade-in,
  `stagger: 0.06s`, each chip also gets a hover state — background tint
  shifts to `--color-accent-soft`, icon nudges slightly (`translateX(2px)`)
  as if pointing toward the link.
- Contact form:
  - Input focus: border color transitions to `--color-accent`,
    `duration: fast`.
  - Submit button: on click, show a brief loading state (e.g. button label
    swaps to "Sending…", disabled, maybe a subtle opacity pulse) until the
    `/api/contact` response returns.
  - Success/error message: fade+slide in below the form (`fadeUp`,
    `duration: base`), do not auto-dismiss — let the user read it.

---

## 8. Page Transitions (route changes)

Wrap route content in `PageTransition.jsx` (per `folder-structure.md`),
using Framer Motion's `AnimatePresence` keyed off `useLocation()`:

- On route change: outgoing page fades out (`opacity 1→0`, `duration: fast`),
  incoming page fades + slides up slightly (`opacity 0→1`, `y: 8→0`,
  `duration: base`, `ease: EASE`).
- Keep this subtle and quick — under half a second total — so navigation
  feels responsive, not delayed by decoration.
- React Router does **not** reset scroll position on route change by
  default (unlike Next.js). Add a small `ScrollToTop` component — a
  `useEffect` that calls `window.scrollTo(0, 0)` on `useLocation()` changes,
  mounted once near the root — so every route starts scrolled to top.

---

## 9. What NOT to animate

- No auto-playing looped animations anywhere (no floating/bobbing elements,
  no infinite pulsing) — this site's tone is calm and editorial, not playful.
- No animated background gradients/particles behind the cream sections
  (project screenshots inside cards/detail pages may naturally contain
  their own dark, effect-heavy UI — that's fine and untouched, but the
  portfolio's own cream sections stay static/flat behind the content).
- No parallax scrolling effects.
- No text scramble/typewriter effects on headings.

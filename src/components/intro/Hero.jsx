import { motion, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';

/**
 * Hero — Intro section content for the Home page.
 * design.md §4.1, content.md §2, animations.md §2.
 *
 * Layout: full-viewport centered, cream background.
 *   1. Logo (~56-64px)
 *   2. Headline — "Hello, I am Sujal!" with italic "Hello" / upright rest
 *   3. Subtext — option 1 from content.md §2
 *   4. "Contact me" pill button → /contact
 *
 * Staggered entrance per animations.md §2:
 *   Logo (delay 0) → Headline (0.15) → Subtext (0.3) → Button (0.45)
 *   Each: opacity 0→1, y 12→0, duration 0.45s ("base"), ease [0.22,1,0.36,1]
 *   Runs once on mount — no re-trigger on scroll-back.
 */

const EASE = [0.22, 1, 0.36, 1];
const DURATION_BASE = 0.45;

/** Reusable fade-up variant factory */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE, delay },
  },
});

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // If reduced-motion, show everything instantly
  const motionProps = (delay) =>
    shouldReduceMotion
      ? {}
      : {
          variants: fadeUp(delay),
          initial: 'hidden',
          animate: 'show',
        };

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 sm:px-12">
      {/* 1. Logo */}
      <motion.div {...motionProps(0)}>
        <Logo size={60} />
      </motion.div>

      {/* 2. Headline — mixed italic/upright Playfair Display */}
      <motion.h1
        {...motionProps(0.15)}
        className="mt-10 sm:mt-12"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-hero)",
          lineHeight: 1.15,
          color: "var(--color-text-primary)",
          fontWeight: 400,
        }}
      >
        <em className="not-italic" style={{ fontStyle: 'italic' }}>Hello</em>
        <span>, I am Sujal!</span>
      </motion.h1>

      {/* 3. Subtext — option 1 from content.md §2 */}
      <motion.p
        {...motionProps(0.3)}
        className="mt-5 sm:mt-6 max-w-[560px]"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--fs-body-lg)",
          lineHeight: 1.6,
          color: "var(--color-text-secondary)",
        }}
      >
        I turn &ldquo;it should work&rdquo; into &ldquo;it works.&rdquo; My code
        is built on clean logic and real problem-solving.
      </motion.p>

      {/* 4. "Contact me" CTA button → /contact */}
      <motion.div {...motionProps(0.45)} className="mt-8 sm:mt-10">
        <Button to="/contact" variant="primary" size="md">
          Contact me
        </Button>
      </motion.div>
    </div>
  );
}

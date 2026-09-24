import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import RectImage from '../ui/RectImage.jsx';
import Button from '../ui/Button.jsx';

/**
 * CertificationsSection — Home page teaser section introducing Sujal's certifications.
 * Follows design.md §4.4, content.md §5, and animations.md §3:
 *
 * Layout:
 * - Two-column layout on desktop (>1024px): Text LEFT, Photo RIGHT (matches About arrangement).
 * - Stacks to single column under 1024px: text first, then image, then button.
 * - Photo uses RectImage with aspect-ratio: 3/2 per design.md §4.4.
 * - Plain heading "Certifications" in Playfair Display (--fs-h1).
 * - Summary paragraph from content.md §5.
 * - "View certifications" button linking to /certifications.
 *
 * Animations:
 * - Intersection observer via useInView (once: true, amount: 0.3).
 * - Text column: fades in + slides up (y: 24->0, opacity: 0->1, duration: 0.8s).
 * - Image column: fades in + slight scale (scale: 0.96->1, opacity: 0->1, duration: 0.8s, delay: 0.15s).
 * - Button: fades in with text column (delay: 0.3s).
 * - Respects prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1];
const DURATION_SLOW = 0.8;

export default function CertificationsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION_SLOW,
        ease: EASE,
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION_SLOW,
        ease: EASE,
        delay: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: EASE,
        delay: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <section
      id="certifications-teaser"
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 lg:py-32 overflow-hidden border-t border-[var(--color-border)]/40"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column: Left on desktop, First on mobile (order-1) */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-7 flex flex-col justify-center order-1"
          >
            {/* Heading: "Certifications" in Playfair Display --fs-h1 (plain treatment) */}
            <h2
              className="text-[var(--color-text-primary)] font-normal tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 1.18,
              }}
            >
              Certifications
            </h2>

            {/* Summary Paragraph from content.md §5 */}
            <p className="mt-6 sm:mt-8 max-w-[580px] text-[var(--color-text-primary)] font-body text-[var(--fs-body)] leading-relaxed m-0">
              I have completed professional online training in Full-Stack Web
              Development, Python, and Java, building a foundation across web
              technologies and core programming languages. My certifications
              include a 62-hour full-stack development bootcamp, a Python course
              progressing from beginner to advanced concepts, and a foundational
              Java programming course. These certifications complement my academic
              background and hands-on software development experience.
            </p>

            {/* CTA Button: "View certifications" linking to /certifications */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-8 sm:mt-10"
            >
              <Button to="/certifications" variant="primary" size="md">
                View certifications &rarr;
              </Button>
            </motion.div>
          </motion.div>

          {/* Photo Column: Right on desktop, Second on mobile (order-2) */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-5 flex justify-center lg:justify-end order-2"
          >
            <div className="w-full max-w-[480px]">
              <RectImage
                src="/images/certifications-teaser/certifications-photo.jpg"
                alt="Sujal Vaidya — Professional Certifications in Full-Stack, Python, and Java"
                aspectRatio="3/2"
                className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-[var(--color-border)]/50"
                imageClassName="hover:scale-103"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

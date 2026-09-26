import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import RectImage from '../ui/RectImage.jsx';
import Button from '../ui/Button.jsx';

/**
 * MyProjectsSection — Home page teaser section introducing Sujal's projects.
 * Follows design.md §4.3, content.md §4, and animations.md §3:
 *
 * Layout:
 * - Two-column layout on desktop (>1024px): Photo LEFT, Text RIGHT (mirrors About).
 * - Stacks to single column under 1024px: image first, then text, then button.
 * - Photo uses RectImage with aspect-ratio: 3/2 (not ArchImage, per design.md §4.3).
 * - Plain heading "My Projects" in Playfair Display (--fs-h1).
 * - Multi-paragraph summary text from content.md §4.
 * - "See all projects" button linking to /projects.
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

export default function MyProjectsSection() {
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
      id="my-projects"
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 lg:py-32 overflow-hidden border-t border-[var(--color-border)]/40"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo Column: Left on desktop, First on mobile (order-1) */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-5 flex justify-center lg:justify-start order-1"
          >
            <div className="w-full max-w-[480px]">
              <RectImage
                src="/images/projects-teaser/my-projects-photo.jpg"
                alt="Sujal Vaidya — Project Experience & Full Stack Development"
                aspectRatio="3/2"
                className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-[var(--color-border)]/50"
                imageClassName="hover:scale-103"
              />
            </div>
          </motion.div>

          {/* Text Column: Right on desktop, Second on mobile (order-2) */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-7 flex flex-col justify-center order-2"
          >
            {/* Heading: "My Projects" in Playfair Display --fs-h1 (plain treatment) */}
            <h2
              className="text-[var(--color-text-primary)] font-normal tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 1.18,
              }}
            >
              My Projects
            </h2>

            {/* Condensed Summary Paragraph */}
            <p className="mt-6 sm:mt-8 max-w-[580px] text-[var(--color-text-primary)] font-body text-[var(--fs-body)] leading-relaxed m-0">
              My project work spans full-stack web development, AI-powered
              applications, and intelligent document processing — from a
              role-based reselling marketplace and a milestone-based escrow
              platform with AI-assisted dispute resolution, to a computer-vision
              system for real-time industrial safety monitoring and a RAG-based
              PDF question-answering chatbot. Together these projects reflect
              hands-on experience across databases, authentication, real-time
              systems, and AI integration.
            </p>

            {/* CTA Button: "See all projects" linking to /projects */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-8 sm:mt-10"
            >
              <Button to="/projects" variant="primary" size="md">
                See all projects &rarr;
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import OvalScribble from '../ui/OvalScribble.jsx';
import ArchImage from '../ui/ArchImage.jsx';

/**
 * AboutSection — scroll-revealed section on the Home page.
 * Follows design.md §4.2, content.md §3, and animations.md §3 & §4:
 *
 * Layout:
 * - Two-column layout on desktop (>1024px): text column left, arch-framed photo right.
 * - Stacks to single column under 1024px with text first for optimal readability/SEO.
 * - Max width: 1200px, generous vertical padding (96-140px desktop, 56-72px mobile).
 *
 * Typography & Accents:
 * - Heading: "About" in italic Playfair Display circled by hand-drawn OvalScribble,
 *   followed by "SUJAL VAIDYA" in upright uppercase Playfair Display.
 * - Bio copy and subtle CGPA stat line.
 *
 * Motion & Interaction:
 * - Intersection observer via useInView (once: true, amount: 0.3).
 * - Text column: fades in + slides up (y: 24→0, opacity 0→1, duration: 0.8s, ease: EASE).
 * - Arch photo: fades in + slight scale (scale: 0.96→1, opacity 0→1, duration: 0.8s, delay: 0.15s).
 * - Oval scribble: pen draw-on triggered ~0.2s after text reveal.
 * - Respects prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1];
const DURATION_SLOW = 0.8;

export default function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
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

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Bio Paragraph, Stat line */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-7 flex flex-col justify-center order-1"
          >
            {/* Heading: Italic "About" with Oval scribble + upright "SUJAL VAIDYA" */}
            <h2
              className="text-[var(--color-text-primary)] font-normal tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 1.18,
              }}
            >
              <span className="relative inline-block mr-3 sm:mr-4">
                <em
                  className="not-italic"
                  style={{ fontStyle: 'italic' }}
                >
                  About
                </em>
                {/* Hand-drawn pen-drawn oval scribble around "About" */}
                <span className="absolute -inset-x-3 -inset-y-2 sm:-inset-x-4 sm:-inset-y-3 pointer-events-none">
                  <OvalScribble
                    animate={isInView}
                    delay={0.25}
                    color="var(--color-text-primary)"
                    className="w-full h-full"
                  />
                </span>
              </span>
              <span className="uppercase font-normal tracking-wide">
                SUJAL VAIDYA
              </span>
            </h2>

            {/* Bio Paragraph */}
            <p
              className="mt-6 sm:mt-8 max-w-[540px] text-[var(--color-text-primary)] font-body text-[var(--fs-body)] leading-relaxed"
            >
              I&apos;m Sujal Ashok Vaidya, a Computer Science Engineering
              student specializing in Full Stack Development. I&apos;m
              passionate about building scalable, user-focused software
              solutions and enjoy solving technical problems through practical,
              structured approaches. My technical skill set includes C, Java,
              Python, and JavaScript, along with technologies such as React.js,
              Node.js, and Express.js, and databases including MySQL and
              MongoDB. I&apos;m also experienced with Git, GitHub, and modern
              development tools. Alongside my technical capabilities, I bring
              strong interpersonal communication, critical problem-solving,
              teamwork, and an iterative approach to development. I&apos;m
              continuously expanding my knowledge and looking for opportunities
              to apply my skills, learn from challenging problems, and grow as a
              software developer.
            </p>

            {/* Understated Stat Line (content.md §3) */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)]/70 flex items-center gap-3">
              <span className="font-body text-xs sm:text-sm uppercase tracking-widest text-[var(--color-text-secondary)] font-medium">
                Academic Standing
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
              <span className="font-body text-sm sm:text-base font-semibold text-[var(--color-text-primary)]">
                CGPA: 8.1 <span className="font-normal text-[var(--color-text-secondary)] text-xs sm:text-sm">(till 6th semester)</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Arch-framed Workspace / Dev Photo */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-5 flex justify-center lg:justify-end order-2"
          >
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              <ArchImage
                src="/images/about/about-photo.jpg"
                alt="Sujal Vaidya — Developer Workspace"
                aspectRatio="3/4"
                className="shadow-sm hover:shadow-md transition-shadow duration-300"
                imageClassName="hover:scale-103"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

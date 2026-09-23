import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ProjectDetailHeader from '../components/projects/ProjectDetailHeader.jsx';
import TechStackChips from '../components/projects/TechStackChips.jsx';
import DemoButton from '../components/projects/DemoButton.jsx';
import Button from '../components/ui/Button.jsx';
import projects from '../data/projects.js';

/**
 * ProjectDetail page — dynamic template driven by data/projects.js ("/projects/:slug").
 * Follows design.md §4.4 and animations.md §6:
 * - Uses useParams() to read slug and find project object.
 * - Shows an on-brand Not Found state if invalid slug.
 * - Renders ProjectDetailHeader, Overview, Core Features, Tech Stack chips,
 *   Technical Highlights, and DemoButton (3 states).
 * - Staggered entrance animations with prefers-reduced-motion fallback.
 */

const EASE = [0.22, 1, 0.36, 1];
const DURATION_BASE = 0.45;

const contentFadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_BASE,
      ease: EASE,
      delay,
    },
  },
});

export default function ProjectDetail() {
  const { slug } = useParams();
  const shouldReduceMotion = useReducedMotion();

  // Find project by slug
  const project = projects.find((p) => p.slug === slug);

  // If project not found, render a graceful not-found state
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <Navbar />
        <main className="flex-1 max-w-[800px] w-full mx-auto px-6 sm:px-12 py-20 flex flex-col items-center justify-center text-center">
          <h1
            className="text-[var(--color-text-primary)] font-normal mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h1)',
              lineHeight: 1.15,
            }}
          >
            Project Not Found
          </h1>
          <p className="font-body text-[var(--color-text-secondary)] text-base sm:text-lg mb-8 max-w-md">
            The project you&apos;re looking for doesn&apos;t exist or may have been renamed.
          </p>
          <Button to="/projects" variant="primary" size="md">
            &larr; Back to All Projects
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const motionProps = (delay) =>
    shouldReduceMotion
      ? {}
      : {
          variants: contentFadeUp(delay),
          initial: 'hidden',
          animate: 'visible',
        };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Article */}
      <main className="flex-1 max-w-[960px] w-full mx-auto px-6 sm:px-12 py-10 sm:py-14 lg:py-16">
        {/* Header (Back link, Title, Tagline, Hero Image) */}
        <ProjectDetailHeader project={project} />

        {/* Body Content Sections */}
        <div className="space-y-10 sm:space-y-12">
          {/* 1. Overview */}
          {project.overview && (
            <motion.section {...motionProps(0.24)} aria-labelledby="section-overview">
              <h2
                id="section-overview"
                className="font-normal text-[var(--color-text-primary)] text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Overview
              </h2>
              <p className="font-body text-[var(--fs-body)] text-[var(--color-text-primary)] leading-relaxed max-w-[820px] m-0">
                {project.overview}
              </p>
            </motion.section>
          )}

          <hr className="border-t border-[var(--color-border)]/60 my-8 sm:my-10" />

          {/* 2. Core Features */}
          {project.features && project.features.length > 0 && (
            <motion.section {...motionProps(0.3)} aria-labelledby="section-features">
              <h2
                id="section-features"
                className="font-normal text-[var(--color-text-primary)] text-2xl sm:text-3xl mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Core Features
              </h2>
              <ul className="space-y-3.5 pl-0 list-none m-0 max-w-[820px]">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 font-body text-[var(--fs-body)] text-[var(--color-text-primary)] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          <hr className="border-t border-[var(--color-border)]/60 my-8 sm:my-10" />

          {/* 3. Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <motion.section {...motionProps(0.36)} aria-labelledby="section-tech-stack">
              <h2
                id="section-tech-stack"
                className="font-normal text-[var(--color-text-primary)] text-2xl sm:text-3xl mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Tech Stack
              </h2>
              <TechStackChips techStack={project.techStack} />
            </motion.section>
          )}

          <hr className="border-t border-[var(--color-border)]/60 my-8 sm:my-10" />

          {/* 4. Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <motion.section {...motionProps(0.42)} aria-labelledby="section-highlights">
              <h2
                id="section-highlights"
                className="font-normal text-[var(--color-text-primary)] text-2xl sm:text-3xl mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Technical Highlights
              </h2>
              <ul className="space-y-3.5 pl-0 list-none m-0 max-w-[820px]">
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 font-body text-[var(--fs-body)] text-[var(--color-text-primary)] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* 5. Action Button (Live Demo / GitHub / Coming Soon) */}
          <motion.div
            {...motionProps(0.48)}
            className="pt-6 sm:pt-8 flex items-center justify-start"
          >
            <DemoButton project={project} />
          </motion.div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import RectImage from '../ui/RectImage.jsx';

/**
 * ProjectDetailHeader — project detail page header.
 * Follows design.md §4.4 and animations.md §6:
 * - Back link ("<- All Projects") to /projects
 * - Project title (--fs-h1, Playfair Display)
 * - Tagline / role summary tag (--color-text-secondary)
 * - Large hero screenshot with rounded-rectangle frame (border-radius: 12px via RectImage)
 * - Staggered entrance animations with prefers-reduced-motion fallback
 *
 * @param {Object} props
 * @param {Object} props.project
 */

const EASE = [0.22, 1, 0.36, 1];
const DURATION_BASE = 0.45;

const fadeUp = (delay = 0) => ({
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

export default function ProjectDetailHeader({ project }) {
  const shouldReduceMotion = useReducedMotion();

  if (!project) return null;

  const motionProps = (delay) =>
    shouldReduceMotion
      ? {}
      : {
          variants: fadeUp(delay),
          initial: 'hidden',
          animate: 'visible',
        };

  return (
    <header className="mb-10 sm:mb-14">
      {/* 1. Back link */}
      <motion.div {...motionProps(0)}>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 mb-6 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] min-h-[44px] py-2"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1 font-body">
            &larr;
          </span>
          <span>All Projects</span>
        </Link>
      </motion.div>

      {/* 2. Project Title */}
      <motion.h1
        {...motionProps(0.06)}
        className="font-normal text-[var(--color-text-primary)] tracking-tight"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-h1)',
          lineHeight: 1.15,
        }}
      >
        {project.name}
      </motion.h1>

      {/* 3. Tagline / Summary Tag */}
      <motion.p
        {...motionProps(0.12)}
        className="mt-3 text-[var(--color-text-secondary)] font-body text-base sm:text-lg"
      >
        {project.tagline}
      </motion.p>

      {/* 4. Large Hero Screenshot */}
      <motion.div {...motionProps(0.2)} className="mt-8 sm:mt-10 w-full">
        <RectImage
          src={project.image}
          alt={`${project.name} — ${project.tagline}`}
          aspectRatio="16/9"
          priority
          className="w-full shadow-md border border-[var(--color-border)]/50"
        />
      </motion.div>
    </header>
  );
}

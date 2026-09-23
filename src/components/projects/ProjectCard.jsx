import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ArchImage from '../ui/ArchImage.jsx';

/**
 * ProjectCard — Single project grid card.
 * Follows design.md §4.3 and animations.md §5:
 * - Arch-framed screenshot on top (3.3, ~16:11 ratio).
 * - Project name in Playfair Display fs-h2.
 * - Short rust-brown horizontal divider line under name.
 * - 1-2 line plain-language blurb in fs-small.
 * - Entire card links to /projects/:slug.
 * - Hover: image scale(1.03), translateY(-4px), soft shadow, title color shifts to accent.
 * - Active: brief scale(0.98) on mobile tap.
 *
 * @param {Object} props
 * @param {Object} props.project - Project data object
 */

const EASE = [0.22, 1, 0.36, 1];

export const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE,
    },
  },
};

export default function ProjectCard({ project }) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        variants: cardVariant,
      };

  return (
    <motion.div {...motionProps} className="h-full">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View project details for ${project.name}`}
        className="group flex flex-col h-full p-4 sm:p-5 rounded-2xl bg-transparent transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(38,34,32,0.15)] hover:bg-[var(--color-bg-alt)]/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        {/* Arch-framed screenshot */}
        <div className="w-full overflow-hidden">
          <ArchImage
            src={project.image}
            alt={`${project.name} - ${project.tagline}`}
            aspectRatio="16/11"
            className="w-full shadow-xs"
            imageClassName="group-hover:scale-103 transition-transform duration-300 ease-out"
          />
        </div>

        {/* Project Name */}
        <h3
          className="mt-5 font-normal text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            lineHeight: 1.2,
          }}
        >
          {project.name}
        </h3>

        {/* Rust-brown short divider */}
        <div className="w-10 h-[2px] bg-[var(--color-accent)] my-3 transition-all duration-300 group-hover:w-14" />

        {/* 1-2 line blurb */}
        <p
          className="font-body text-[0.9375rem] text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 m-0"
        >
          {project.blurb || project.summary}
        </p>
      </Link>
    </motion.div>
  );
}

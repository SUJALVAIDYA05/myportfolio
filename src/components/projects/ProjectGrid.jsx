import { motion, useReducedMotion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import projectsData from '../../data/projects.js';

/**
 * ProjectGrid — Responsive grid mapping data/projects.js -> ProjectCard[].
 * Follows design.md §4.3 & §5 and animations.md §5:
 * - Desktop: 3 columns x 2 rows (lg:grid-cols-3)
 * - Tablet: 2 columns x 3 rows (sm:grid-cols-2)
 * - Mobile: 1 column (grid-cols-1)
 * - Staggered grid entrance on page load (stagger: 0.06s, duration: 0.45s)
 * - Respects prefers-reduced-motion
 *
 * @param {Object} props
 * @param {Array} [props.projects=projectsData] - Array of project objects
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export default function ProjectGrid({ projects = projectsData }) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden',
        animate: 'visible',
      };

  return (
    <motion.div
      {...motionProps}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}

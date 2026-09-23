import { motion, useReducedMotion } from 'framer-motion';

/**
 * TechStackChips — small pill/tag chips for tech stack list.
 * Follows design.md §4.4 and animations.md §6:
 * - Uses --color-bg-alt background, subtle border, rounded-full.
 * - Staggered fade-in (stagger: 0.04s per chip, duration: 0.3s).
 * - Respects prefers-reduced-motion.
 *
 * @param {Object} props
 * @param {string[]} props.techStack - Array of tech stack names
 * @param {string} [props.className='']
 */

const chipVariant = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TechStackChips({ techStack = [], className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  if (!techStack || techStack.length === 0) return null;

  return (
    <motion.div
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      }}
      className={`flex flex-wrap gap-2 sm:gap-2.5 ${className}`}
    >
      {techStack.map((tech) => (
        <motion.span
          key={tech}
          variants={shouldReduceMotion ? {} : chipVariant}
          className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-text-primary)] font-body text-xs sm:text-sm font-medium border border-[var(--color-border)]/60 shadow-2xs"
        >
          {tech}
        </motion.span>
      ))}
    </motion.div>
  );
}

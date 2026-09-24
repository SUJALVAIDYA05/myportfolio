import { motion, useReducedMotion } from 'framer-motion';
import CertificationCard from './CertificationCard.jsx';
import certificationsData from '../../data/certifications.js';

/**
 * CertificationGrid — Responsive grid mapping data/certifications.js -> CertificationCard[].
 * Follows design.md §4.7 and animations.md §7:
 * - Desktop: 3 columns (lg:grid-cols-3)
 * - Tablet: 2 columns (sm:grid-cols-2)
 * - Mobile: 1 column (grid-cols-1)
 * - Staggered grid entrance on page load (stagger: 0.06s, duration: 0.45s)
 * - Respects prefers-reduced-motion
 *
 * @param {Object} props
 * @param {Array} [props.certifications=certificationsData] - Array of certification objects
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

export default function CertificationGrid({ certifications = certificationsData }) {
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
      {certifications.map((cert) => (
        <CertificationCard key={cert.id} cert={cert} />
      ))}
    </motion.div>
  );
}

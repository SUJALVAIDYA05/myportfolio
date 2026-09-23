import { motion } from 'framer-motion';

/**
 * Framer Motion route-change wrapper (AnimatePresence).
 * Outgoing page fades out, incoming fades + slides up.
 * See animations.md §8.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

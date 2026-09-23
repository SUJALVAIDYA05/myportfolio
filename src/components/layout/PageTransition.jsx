import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition — route-change wrapper per animations.md §8:
 * - Uses Framer Motion's AnimatePresence mode="wait"
 * - Keys motion.div off useLocation().pathname
 * - Outgoing page: fades out (opacity 1->0, duration: fast 0.2s)
 * - Incoming page: fades in + slides up (opacity 0->1, y: 8->0, duration: base 0.45s, ease: EASE)
 * - Subtle and responsive (under half a second total)
 * - Respects prefers-reduced-motion
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */

const EASE = [0.22, 1, 0.36, 1];
const DURATION_FAST = 0.2;
const DURATION_BASE = 0.45;

export default function PageTransition({ children }) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION_BASE,
        ease: EASE,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION_FAST,
        ease: EASE,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

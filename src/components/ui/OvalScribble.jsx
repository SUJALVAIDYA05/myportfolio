import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hand-drawn oval scribble SVG accent.
 * Follows design.md §3.4 and animations.md §4:
 * - Loose, imperfect oval doodle encircling the italic "About" in headings.
 * - Stroke-only, stroke-width: 2, stroke-linecap: round, aria-hidden="true".
 * - Ready for draw-on animation via stroke-dasharray / stroke-dashoffset.
 *
 * @param {Object} props
 * @param {string} [props.color='var(--color-text-primary)'] - Stroke color
 * @param {number} [props.strokeWidth=2] - Stroke width
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.animate=false] - Whether to trigger draw-on animation
 * @param {number} [props.delay=0.2] - Animation delay in seconds
 */
export default function OvalScribble({
  color = 'var(--color-text-primary)',
  strokeWidth = 2,
  className = '',
  animate = false,
  delay = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();
  const pathLength = 520; // approximate path length of the loop

  // Hand-drawn wobbly oval loop with an organic slight overlap
  const pathData =
    'M 34,22 ' +
    'C 68,11 138,10 182,21 ' +
    'C 214,29 216,48 186,60 ' +
    'C 142,75 58,74 22,61 ' +
    'C -2,50 -1,29 32,18 ' +
    'C 68,6 150,8 190,20';

  return (
    <svg
      viewBox="0 0 215 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`overflow-visible pointer-events-none ${className}`}
    >
      <motion.path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="oval-scribble-path"
        style={{
          strokeDasharray: pathLength,
        }}
        initial={{
          strokeDashoffset: shouldReduceMotion ? 0 : pathLength,
        }}
        animate={{
          strokeDashoffset: shouldReduceMotion || animate ? 0 : pathLength,
        }}
        transition={{
          duration: 0.9,
          delay: delay,
          ease: [0.22, 1, 0.36, 1], // EASE from animations.md §1
        }}
      />
    </svg>
  );
}

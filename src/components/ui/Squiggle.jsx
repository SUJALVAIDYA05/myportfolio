import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hand-drawn squiggle / underline flourish SVG.
 * Follows design.md §3.4 and animations.md §4:
 * - Freehand wobbly bezier curve trailing off the "Projects" heading.
 * - Stroke-only, no fill, stroke-linecap: round.
 * - Configured with stroke-dasharray and stroke-dashoffset for draw-on effect.
 * - Supports Framer Motion triggers or standalone CSS class (.squiggle-path).
 *
 * @param {Object} props
 * @param {string} [props.color='var(--color-accent)'] - Stroke color
 * @param {number} [props.strokeWidth=2.2] - Stroke width
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.animate=false] - Whether to trigger the draw-on animation
 * @param {number} [props.delay=0.2] - Animation delay in seconds
 */
export default function Squiggle({
  color = 'var(--color-accent)',
  strokeWidth = 2.2,
  className = '',
  animate = false,
  delay = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();
  const pathLength = 260; // actual calculated approximate path length

  // Organic, pen-drawn wobbly flourish
  const pathData =
    'M 4,16 C 24,19 45,7 68,14 C 92,20 114,9 138,15 C 160,20 182,10 206,14 C 218,16 226,13 234,15';

  return (
    <svg
      viewBox="0 0 240 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`overflow-visible inline-block ${className}`}
    >
      <motion.path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="squiggle-path"
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
          duration: 0.85,
          delay: delay,
          ease: [0.22, 1, 0.36, 1], // EASE from animations.md §1
        }}
      />
    </svg>
  );
}

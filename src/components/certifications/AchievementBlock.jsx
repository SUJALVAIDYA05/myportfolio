import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Carousel from '../ui/Carousel.jsx';

/**
 * AchievementBlock — Individual competition block with photo carousel.
 * Follows design.md §4.7 and animations.md §7:
 * - One block per competition, stacked vertically.
 * - Competition name in Playfair Display (--fs-h2).
 * - Placement pill badge and context paragraph from content.md §9.
 * - Reusable Carousel cycling competition photos in order with no autoplay.
 * - Scroll-triggered fade-up animation via useInView (once: true).
 * - Respects prefers-reduced-motion.
 *
 * @param {Object} props
 * @param {Object} props.achievement - Achievement data object
 * @param {number} props.index - Block index
 */

const EASE = [0.22, 1, 0.36, 1];

export default function AchievementBlock({ achievement, index = 0 }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  const blockVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: EASE,
      },
    },
  };

  return (
    <motion.article
      ref={containerRef}
      variants={blockVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]/50 shadow-xs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Context Column (Left on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Placement Badge */}
          {achievement.placement && (
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                {achievement.placement}
              </span>
            </div>
          )}

          {/* Competition Name */}
          <h3
            className="text-[var(--color-text-primary)] font-normal tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h2)',
              lineHeight: 1.25,
            }}
          >
            {achievement.competition}
          </h3>

          {/* Divider line */}
          <div className="w-10 h-[2px] bg-[var(--color-accent)] my-4" />

          {/* Context Line / Paragraph */}
          <p className="font-body text-[var(--fs-body)] text-[var(--color-text-secondary)] leading-relaxed m-0">
            {achievement.context}
          </p>
        </div>

        {/* Carousel Column (Right on desktop) */}
        <div className="lg:col-span-7 flex justify-center">
          <Carousel
            images={achievement.images}
            imageAlts={achievement.imageAlts}
            alt={achievement.competition}
            aspectRatio="3/2"
            className="w-full"
          />
        </div>
      </div>
    </motion.article>
  );
}

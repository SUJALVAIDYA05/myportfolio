import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Carousel — Reusable image carousel for achievements.
 * Follows design.md §3.6, animations.md §7, and animations.md §10:
 *
 * - Rectangle Image Frame (3.3) holding the current image, aspect-ratio: 3/2.
 * - Prev/next controls: simple circular buttons with rust-brown chevrons,
 *   touch target >= 44px, positioned at frame edges with accessible aria-labels.
 * - Dot indicators below the frame with smooth color transition.
 * - Slide change cross-fades (opacity swap, duration: fast) — no slide/translate.
 * - Touch swipeable (left/right swipe gesture) on touch devices.
 * - Keyboard support (Left/Right arrows when focused).
 * - Strictly NO AUTOPLAY (animations.md §10).
 *
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 * @param {string} [props.alt=''] - Descriptive base alt text
 * @param {string} [props.aspectRatio='3/2'] - Aspect ratio
 * @param {string} [props.className=''] - Additional container classes
 */
export default function Carousel({
  images = [],
  imageAlts = [],
  alt = 'Competition photo',
  aspectRatio = '3/2',
  className = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [currentSrc, setCurrentSrc] = useState(images[0] || '');

  // Synchronize currentSrc when currentIndex or images change
  useEffect(() => {
    if (images[currentIndex]) {
      setCurrentSrc(images[currentIndex]);
    }
  }, [currentIndex, images]);

  const handleImageError = () => {
    if (!currentSrc) return;
    const extensions = ['.jpeg', '.jpg', '.png'];
    const currentExt = extensions.find((ext) => currentSrc.toLowerCase().endsWith(ext));
    if (currentExt) {
      const nextExt = extensions.find((ext) => ext !== currentExt);
      if (nextExt) {
        setCurrentSrc(currentSrc.slice(0, -currentExt.length) + nextExt);
      }
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  const total = images.length;

  const handlePrev = () => {
    const nextIdx = currentIndex === 0 ? total - 1 : currentIndex - 1;
    setCurrentIndex(nextIdx);
    setCurrentSrc(images[nextIdx]);
  };

  const handleNext = () => {
    const nextIdx = currentIndex === total - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIdx);
    setCurrentSrc(images[nextIdx]);
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
    setCurrentSrc(images[idx]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentAlt =
    (imageAlts && imageAlts[currentIndex]) ||
    `${alt} (photo ${currentIndex + 1} of ${total})`;

  return (
    <div
      className={`w-full flex flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] rounded-[12px] ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Competition photo carousel"
    >
      {/* Frame Container */}
      <div
        className="relative w-full overflow-hidden bg-[var(--color-bg-alt)] border border-[var(--color-border)]/50 shadow-sm"
        style={{
          borderRadius: '12px',
          aspectRatio: aspectRatio,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cross-fading Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`${currentIndex}-${currentSrc}`}
            src={currentSrc}
            alt={currentAlt}
            onError={handleImageError}
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="w-full h-full object-cover block select-none"
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>

        {/* Prev / Next controls over frame (desktop/tablet) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[var(--color-bg-alt)]/90 hover:bg-[var(--color-bg-alt)] text-[var(--color-accent)] shadow-md border border-[var(--color-border)]/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[var(--color-bg-alt)]/90 hover:bg-[var(--color-bg-alt)] text-[var(--color-accent)] shadow-md border border-[var(--color-border)]/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Mobile slide counter indicator badge */}
        {total > 1 && (
          <div className="absolute bottom-3 right-3 sm:hidden px-2.5 py-1 rounded-md bg-black/60 text-white text-xs font-mono">
            {currentIndex + 1} / {total}
          </div>
        )}
      </div>

      {/* Dot Indicators */}
      {total > 1 && (
        <div
          className="flex items-center justify-center gap-2 mt-4"
          role="tablist"
          aria-label="Carousel navigation dots"
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={currentIndex === idx}
              aria-label={`Go to photo ${idx + 1}`}
              onClick={() => handleDotClick(idx)}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] rounded-full`}
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-[var(--color-accent)]'
                    : 'w-2 h-2 bg-[var(--color-border)] hover:bg-[var(--color-text-secondary)]'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

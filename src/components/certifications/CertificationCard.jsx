import { motion, useReducedMotion } from 'framer-motion';
import RectImage from '../ui/RectImage.jsx';

/**
 * CertificationCard — Single certification card.
 * Follows design.md §4.7 and animations.md §7:
 * - Real certificate image in Rectangle Image Frame with object-fit: contain (never cropped),
 *   aspect-ratio: 4/3, --color-bg-alt letterboxing.
 * - Certificate/course name in Playfair Display (--fs-h2).
 * - Short rust-brown horizontal divider line.
 * - Issuing organization in bold (--fs-small).
 * - Date + duration in --color-text-secondary (--fs-small).
 * - Subtle hover scale (1.02) and soft shadow lift.
 *
 * @param {Object} props
 * @param {Object} props.cert - Certificate data object
 */

const EASE = [0.22, 1, 0.36, 1];

export const certCardVariant = {
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

export default function CertificationCard({ cert }) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        variants: certCardVariant,
      };

  return (
    <motion.div {...motionProps} className="h-full">
      <div className="group flex flex-col h-full p-4 sm:p-5 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(38,34,32,0.12)] hover:border-[var(--color-border)]/80">
        {/* Certificate Image Frame (aspect-ratio: 4/3, fit: contain, uncropped) */}
        <a
          href={cert.image}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View full certificate: ${cert.name}`}
          className="block w-full overflow-hidden rounded-[12px] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        >
          <RectImage
            src={cert.image}
            alt={`${cert.name} issued by ${cert.issuer}`}
            aspectRatio="4/3"
            fit="contain"
            className="w-full bg-[var(--color-bg-alt)] border border-[var(--color-border)]/30"
            imageClassName="group-hover:scale-[1.02] transition-transform duration-300 ease-out p-1"
          />
        </a>

        {/* Certificate / Course Name */}
        <h3
          className="mt-5 font-normal text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200 line-clamp-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            lineHeight: 1.25,
          }}
        >
          {cert.name}
        </h3>

        {/* Short rust-brown horizontal divider */}
        <div className="w-10 h-[2px] bg-[var(--color-accent)] my-3 transition-all duration-300 group-hover:w-14" />

        {/* Issuing Organization */}
        <p className="font-body text-[0.9375rem] font-semibold text-[var(--color-text-primary)] m-0">
          {cert.issuer}
        </p>

        {/* Date + Duration */}
        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.875rem] text-[var(--color-text-secondary)] font-body">
          <span>{cert.date}</span>
          <span aria-hidden="true">•</span>
          <span>{cert.duration}</span>
        </div>

        {/* Optional Certificate ID badge */}
        {cert.certificateId && (
          <div className="mt-4 pt-3 border-t border-[var(--color-border)]/30 text-[0.8125rem] text-[var(--color-text-secondary)] font-mono truncate">
            ID: {cert.certificateId}
          </div>
        )}
      </div>
    </motion.div>
  );
}

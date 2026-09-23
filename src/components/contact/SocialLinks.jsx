import { motion, useReducedMotion } from 'framer-motion';

/**
 * SocialLinks — direct contact list chips.
 * Follows design.md §4.5, content.md §6, and animations.md §7:
 * - Pairs small monochrome icon with label and link
 * - Staggered fade-in on load (stagger: 0.06s)
 * - Pill shape using --color-bg-alt, hover fills with --color-accent-soft
 * - Icon nudges slightly (translateX(2px)) on hover
 * - All open in a new tab except mailto
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */

const links = [
  {
    name: 'Email',
    value: 'sujalv641@gmail.com',
    href: 'mailto:sujalv641@gmail.com',
    external: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    value: 'SUJALVAIDYA05',
    href: 'https://github.com/SUJALVAIDYA05',
    external: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    value: 'Sujal Vaidya',
    href: 'https://www.linkedin.com/in/sujal-vaidya-/',
    external: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    value: '@sujalvaidya_',
    href: 'https://www.instagram.com/sujalvaidya_/?hl=en',
    external: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const chipVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SocialLinks({ className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  const motionContainerProps = shouldReduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden',
        animate: 'visible',
      };

  const motionItemProps = shouldReduceMotion ? {} : { variants: chipVariant };

  return (
    <motion.div
      {...motionContainerProps}
      className={`flex flex-col gap-3.5 sm:gap-4 ${className}`}
    >
      {links.map((link) => (
        <motion.a
          key={link.name}
          {...motionItemProps}
          href={link.href}
          aria-label={`${link.name}: ${link.value}`}
          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[var(--color-bg-alt)] hover:bg-[var(--color-accent-soft)] transition-all duration-200 border border-[var(--color-border)]/60 text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] min-h-[48px] shadow-2xs"
        >
          {/* Left: Icon and Name */}
          <div className="flex items-center gap-3.5">
            <span className="text-[var(--color-text-primary)] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">
              {link.icon}
            </span>
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-dark)] transition-colors">
              {link.name}
            </span>
          </div>

          {/* Right: Value with trailing arrow */}
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-dark)] transition-colors font-medium">
              {link.value}
            </span>
            <span
              className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-dark)] transition-transform duration-200 group-hover:translate-x-0.5 text-xs font-body"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}

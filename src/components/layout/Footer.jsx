/**
 * Shared footer component — shown on all non-Home pages and at the end of Home.
 * Follows design.md §3.2, content.md §1 & §6:
 * - Small, centered, muted layout.
 * - Text: "© 2026 Sujal Vaidya".
 * - Four social icons: Email, GitHub, LinkedIn, Instagram.
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */
export default function Footer({ className = '' }) {
  const currentYear = 2026;

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:sujalv641@gmail.com',
      ariaLabel: 'Send email to Sujal Vaidya',
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
      href: 'https://github.com/SUJALVAIDYA05',
      ariaLabel: 'View GitHub profile',
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
      href: 'https://www.linkedin.com/in/sujal-vaidya-/',
      ariaLabel: 'View LinkedIn profile',
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
      href: 'https://www.instagram.com/sujalvaidya_/?hl=en',
      ariaLabel: 'View Instagram profile',
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

  return (
    <footer
      className={`w-full py-10 sm:py-14 border-t border-[var(--color-border)]/60 text-center ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright notice */}
        <p className="font-body text-[0.9375rem] text-[var(--color-text-secondary)] m-0">
          &copy; {currentYear} Sujal Vaidya
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4 sm:gap-5" aria-label="Social media links">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-label={item.ariaLabel}
              {...(item.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="inline-flex items-center justify-center p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-alt)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

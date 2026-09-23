import { NavLink } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';

/**
 * Persistent navigation bar — shown on /projects, /projects/:slug, /contact.
 * Follows design.md §3.2 & §5:
 * - Slim persistent nav bar: Logo (left, links to /) + text links "Projects" / "Contact" (right).
 * - Sans-serif, fs-small (0.9375rem), generous letter-spacing.
 * - Active route gets an accent-colored underline.
 * - Touch targets >= 44px, graceful mobile layout without hamburger menu.
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */
export default function Navbar({ className = '' }) {
  const navLinkClass = ({ isActive }) =>
    `relative inline-flex items-center min-h-[44px] px-3 py-2 font-body text-[0.9375rem] font-medium tracking-wider uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
      isActive
        ? 'text-[var(--color-accent)] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-[var(--color-accent)]'
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[var(--color-bg)]/95 backdrop-blur-xs border-b border-[var(--color-border)]/60 transition-colors ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Monogram Logo linked to Home */}
        <Logo size={42} asLink to="/" />

        {/* Right: Navigation Links */}
        <nav aria-label="Main Navigation" className="flex items-center gap-4 sm:gap-8">
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

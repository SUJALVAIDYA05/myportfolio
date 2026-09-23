import { Link } from 'react-router-dom';

/**
 * Logo — SV Monogram Badge
 * Single source of truth per design.md §3.1.
 * Inline SVG with rust-brown fill, outer ring, and Playfair Display italic "SV" monogram.
 *
 * @param {Object} props
 * @param {number} [props.size=56] - Width and height in pixels
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.asLink=false] - Whether to wrap in a Link to "/"
 * @param {string} [props.to='/'] - Destination path if asLink is true
 */
export default function Logo({
  size = 56,
  className = '',
  asLink = false,
  to = '/',
}) {
  const svgElement = (
    <svg
      viewBox="0 0 72 72"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SV — Sujal Vaidya logo"
      className={`shrink-0 transition-transform duration-200 ${className}`}
    >
      <circle
        cx="36"
        cy="36"
        r="34"
        fill="var(--color-accent)"
        stroke="var(--color-accent-dark)"
        strokeWidth="1.5"
      />
      <circle
        cx="36"
        cy="36"
        r="29"
        fill="none"
        stroke="#F3EEE3"
        strokeWidth="1"
      />
      <text
        x="36"
        y="45"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontSize="26"
        fill="#F3EEE3"
      >
        SV
      </text>
    </svg>
  );

  if (asLink) {
    return (
      <Link
        to={to}
        aria-label="Go to homepage"
        className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
      >
        {svgElement}
      </Link>
    );
  }

  return svgElement;
}

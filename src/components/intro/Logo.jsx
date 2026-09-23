/**
 * Inline SVG "SV" monogram badge — see design.md §3.1.
 */
export default function Logo({ size = 56 }) {
  return (
    <svg
      viewBox="0 0 72 72"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SV — Sujal Vaidya"
      role="img"
    >
      <circle cx="36" cy="36" r="34" fill="var(--color-accent)" stroke="var(--color-accent-dark)" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="29" fill="none" stroke="#F3EEE3" strokeWidth="1" />
      <text
        x="36"
        y="45"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontStyle="italic"
        fontSize="26"
        fill="#F3EEE3"
      >
        SV
      </text>
    </svg>
  );
}

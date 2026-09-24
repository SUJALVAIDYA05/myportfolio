/**
 * ArchImage — Arch-topped image frame (About section photo only).
 * Follows design.md §3.3 & folder-structure.md:
 * - Container with flat bottom/sides and semicircular top edge (`border-radius: 999px 999px 0 0`).
 * - Background `--color-bg-alt` shows behind the image if loading or aspect varies.
 * - Image inside set to `object-fit: cover` with overflow hidden.
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL/path
 * @param {string} props.alt - Descriptive alt text for accessibility
 * @param {string} [props.className=''] - Additional container classes
 * @param {string} [props.imageClassName=''] - Additional classes for the <img> tag
 * @param {string} [props.aspectRatio='3/4'] - CSS aspect ratio (e.g. '3/4')
 * @param {boolean} [props.priority=false] - If true, eager loads with high priority
 * @param {React.ReactNode} [props.children] - Optional overlays or badges
 */
export default function ArchImage({
  src,
  alt = '',
  className = '',
  imageClassName = '',
  aspectRatio = '3/4',
  priority = false,
  children,
  ...props
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--color-bg-alt)] shadow-xs ${className}`}
      style={{
        borderRadius: '999px 999px 0 0',
        aspectRatio: aspectRatio,
      }}
      {...props}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' } : {})}
          className={`w-full h-full object-cover block transition-transform duration-500 ease-out ${imageClassName}`}
        />
      )}
      {children}
    </div>
  );
}

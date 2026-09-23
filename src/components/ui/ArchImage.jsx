/**
 * ArchImage (ImageFrame) — Reusable rounded-rectangle image frame.
 * Follows design.md §3.3 & §2.4:
 * - Container with rounded-rectangle shape (`border-radius: 16px` on all four corners).
 * - Background `--color-bg-alt` shows behind the image if loading or aspect varies.
 * - Image inside set to `object-fit: cover` with overflow hidden.
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL/path
 * @param {string} props.alt - Descriptive alt text for accessibility
 * @param {string} [props.className=''] - Additional container classes
 * @param {string} [props.imageClassName=''] - Additional classes for the <img> tag
 * @param {string} [props.aspectRatio='3/4'] - CSS aspect ratio (e.g. '3/4', '4/3', '16/11')
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
        borderRadius: '16px',
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

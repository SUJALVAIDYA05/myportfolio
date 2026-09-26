import { useState, useEffect } from 'react';

/**
 * RectImage — Reusable rounded-rectangle image frame (design.md §3.3).
 * Used for:
 * - Project grid screenshots (/projects, aspect-ratio: 16/10)
 * - Project detail hero (/projects/:slug)
 * - Home teasers: My Projects & Certifications (aspect-ratio: 3/2)
 * - Certificate cards (/certifications, aspect-ratio: 4/3, fit: contain)
 * - Achievement carousel frames (/certifications, aspect-ratio: 3/2)
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL/path
 * @param {string} props.alt - Descriptive alt text for accessibility
 * @param {string} [props.className=''] - Additional container classes
 * @param {string} [props.imageClassName=''] - Additional classes for the <img> tag
 * @param {string} [props.aspectRatio='3/2'] - CSS aspect ratio (e.g. '3/2', '16/10', '4/3')
 * @param {'cover' | 'contain'} [props.fit='cover'] - CSS object-fit ('cover' for photos/screenshots, 'contain' for certs)
 * @param {boolean} [props.priority=false] - If true, eager loads with high priority
 * @param {React.ReactNode} [props.children] - Optional overlays or controls
 */
export default function RectImage({
  src,
  alt = '',
  className = '',
  imageClassName = '',
  aspectRatio = '3/2',
  fit = 'cover',
  priority = false,
  children,
  style,
  ...props
}) {
  const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover';
  const [imgSrc, setImgSrc] = useState(src);
  const [triedExtensions, setTriedExtensions] = useState(new Set());

  useEffect(() => {
    setImgSrc(src);
    setTriedExtensions(new Set([src]));
  }, [src]);

  const handleError = () => {
    if (!imgSrc) return;
    const extensions = ['.jpeg', '.jpg', '.png'];
    const currentExt = extensions.find((ext) => imgSrc.toLowerCase().endsWith(ext));
    
    if (currentExt) {
      const nextExt = extensions.find((ext) => {
        const candidate = imgSrc.slice(0, -currentExt.length) + ext;
        return !triedExtensions.has(candidate);
      });

      if (nextExt) {
        const nextSrc = imgSrc.slice(0, -currentExt.length) + nextExt;
        setTriedExtensions((prev) => new Set([...prev, nextSrc]));
        setImgSrc(nextSrc);
      }
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--color-bg-alt)] shadow-xs rounded-[12px] ${className}`}
      style={{
        aspectRatio: aspectRatio,
        ...style,
        borderRadius: '12px',
      }}
      {...props}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' } : {})}
          className={`w-full h-full ${objectFitClass} block transition-transform duration-500 ease-out ${imageClassName}`}
        />
      )}
      {children}
    </div>
  );
}

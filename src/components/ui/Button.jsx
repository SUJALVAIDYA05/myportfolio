import { Link } from 'react-router-dom';

/**
 * Button component supporting primary, secondary, and ghost variants.
 * Follows design.md §3.5:
 * - Primary: rust-brown background, cream text, pill shape (rounded-full),
 *   padding 14px 32px, fs-small, font-semibold. Hover: darker accent + translateY(-2px).
 * - Secondary: subtle cream background/transparent, thin border, text-primary.
 * - Ghost: text link style, accent color, subtle hover effect.
 *
 * Can render as a <button>, React Router <Link> (if `to` is passed),
 * or standard <a> (if `href` is passed).
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.to] - If provided, renders as React Router Link
 * @param {string} [props.href] - If provided, renders as an anchor tag
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-semibold text-center select-none transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] min-h-[44px]';

  const sizeStyles = {
    sm: 'text-xs px-5 py-2 rounded-full tracking-wide',
    md: 'text-[0.9375rem] px-8 py-[14px] rounded-full leading-normal tracking-wide',
    lg: 'text-base px-10 py-4 rounded-full leading-normal tracking-wide',
  }[size] || 'text-[0.9375rem] px-8 py-[14px] rounded-full leading-normal';

  const variantStyles = {
    primary:
      'bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-dark)] hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md cursor-pointer',
    secondary:
      'bg-[var(--color-bg-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer',
    ghost:
      'bg-transparent text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] hover:underline underline-offset-4 cursor-pointer !px-4 !py-2 min-h-0',
  }[variant] || '';

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none shadow-none transform-none'
    : '';

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${disabledStyles} ${className}`.trim();

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    return (
      <a
        href={href}
        className={combinedClasses}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}

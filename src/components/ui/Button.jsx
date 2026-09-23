/**
 * Shared button component — primary (filled), secondary (outline), ghost.
 * See design.md §3.5.
 */
export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button {...props}>
      {children}
    </button>
  );
}

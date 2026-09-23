import Button from '../ui/Button.jsx';

/**
 * DemoButton — handles all 3 project action button states per design.md §4.4:
 * 1. Live link exists -> "View Live Demo ->" linking out (target="_blank")
 * 2. No live demo, but GitHub link exists -> "View on GitHub ->" linking out
 * 3. Link pending (both null) -> disabled/muted button "Live demo coming soon"
 *
 * Follows animations.md §6:
 * - Hover on active states: darker fill + translateY(-2px)
 * - Disabled state: muted, no hover animation, cursor-not-allowed
 *
 * @param {Object} props
 * @param {Object} props.project - Project object
 * @param {string} [props.className='']
 */
export default function DemoButton({ project, className = '' }) {
  if (!project) return null;

  const { liveUrl, githubUrl } = project;

  if (liveUrl) {
    return (
      <Button
        href={liveUrl}
        variant="primary"
        size="md"
        className={`shadow-md ${className}`}
      >
        <span>View Live Demo</span>
        <span className="ml-2 font-body">&rarr;</span>
      </Button>
    );
  }

  if (githubUrl) {
    return (
      <Button
        href={githubUrl}
        variant="primary"
        size="md"
        className={`shadow-md ${className}`}
      >
        <span>View on GitHub</span>
        <span className="ml-2 font-body">&rarr;</span>
      </Button>
    );
  }

  return (
    <Button
      disabled
      variant="primary"
      size="md"
      className={className}
    >
      Live demo coming soon
    </Button>
  );
}

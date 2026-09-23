import ArchImage from '../ui/ArchImage.jsx';

/**
 * ProjectDetailHeader — title + tagline + hero image.
 * Follows design.md §4.4:
 * - Title (--fs-h1, Playfair Display)
 * - Tagline / role summary in --color-text-secondary
 * - Large hero screenshot using rounded-rectangle frame (border-radius: 16px via ArchImage)
 *
 * @param {Object} props
 * @param {Object} props.project
 */
export default function ProjectDetailHeader({ project }) {
  if (!project) return null;

  return (
    <header className="mb-10 sm:mb-14">
      {/* Title & Tagline */}
      <h1
        className="font-normal text-[var(--color-text-primary)]"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-h1)',
          lineHeight: 1.15,
        }}
      >
        {project.name}
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)] font-body text-base sm:text-lg">
        {project.tagline}
      </p>

      {/* Hero Screenshot Frame (Rounded rectangle border-radius: 16px via ArchImage) */}
      <div className="mt-8 sm:mt-10 w-full overflow-hidden shadow-sm">
        <ArchImage
          src={project.image}
          alt={`${project.name} screenshot preview`}
          aspectRatio="16/9"
          priority
          className="w-full"
        />
      </div>
    </header>
  );
}

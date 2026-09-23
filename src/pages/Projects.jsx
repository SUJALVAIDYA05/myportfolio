import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ProjectGrid from '../components/projects/ProjectGrid.jsx';
import Squiggle from '../components/ui/Squiggle.jsx';

/**
 * Projects page — 6-card responsive grid ("/projects").
 * Follows design.md §4.3, content.md §4, and animations.md §5:
 *
 * Layout:
 * - Persistent Navbar at top with active link underline.
 * - Centered page heading "Projects" in rust-brown Playfair Display (--fs-h1),
 *   with hand-drawn squiggle flourish trailing off the end of the word.
 * - Responsive 3x2 grid of 6 project cards driven by src/data/projects.js.
 * - Muted shared Footer at bottom.
 */
export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 sm:px-12 py-12 sm:py-16 lg:py-20">
        {/* Page Heading with Trailing Squiggle Accent */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1
            className="text-[var(--color-accent)] font-normal inline-flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h1)',
              lineHeight: 1.15,
            }}
          >
            <span>Projects</span>
            <span className="inline-block self-end pb-1 sm:pb-2">
              <Squiggle
                animate={true}
                delay={0.25}
                color="var(--color-accent)"
                className="w-20 sm:w-28 lg:w-36 h-auto"
              />
            </span>
          </h1>
        </div>

        {/* 6-Card Responsive Grid */}
        <ProjectGrid />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

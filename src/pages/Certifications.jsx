import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import CertificationGrid from '../components/certifications/CertificationGrid.jsx';
import AchievementList from '../components/certifications/AchievementList.jsx';
import Squiggle from '../components/ui/Squiggle.jsx';

/**
 * Certifications page ("/certifications").
 * Follows design.md §4.7, content.md §8 & §9, and animations.md §7:
 *
 * Section A — Certifications:
 * - Centered heading "Certifications" in rust-brown Playfair Display (--fs-h1)
 *   with trailing hand-drawn squiggle flourish (Squiggle.jsx).
 * - Responsive grid of 3 certification cards reading from src/data/certifications.js.
 * - Staggered entrance animation on load.
 *
 * Section B — Achievements:
 * - Centered or section heading "Achievements" in Playfair Display (--fs-h1).
 * - Vertically stacked competition blocks from src/data/achievements.js.
 * - Independent scroll-reveal animation per block.
 * - Interactive carousel with cross-fade and strictly no autoplay.
 */
export default function Certifications() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 sm:px-12 py-12 sm:py-16 lg:py-20">
        {/* Section A: Certifications */}
        <section id="certifications-grid" aria-labelledby="certifications-heading">
          {/* Page Heading with Trailing Squiggle Accent */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1
              id="certifications-heading"
              className="text-[var(--color-accent)] font-normal inline-flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 1.15,
              }}
            >
              <span>Certifications</span>
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

          {/* 3-Card Responsive Grid */}
          <CertificationGrid />
        </section>

        {/* Section Divider */}
        <hr className="my-16 sm:my-24 lg:my-28 border-0 border-t border-[var(--color-border)]/50" />

        {/* Section B: Achievements */}
        <section id="achievements-section" aria-labelledby="achievements-heading">
          {/* Section Heading — plain treatment per design.md §4.7 */}
          <div className="text-center mb-12 sm:mb-16">
            <h2
              id="achievements-heading"
              className="text-[var(--color-text-primary)] font-normal tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 1.18,
              }}
            >
              Achievements
            </h2>
          </div>

          {/* Stacked Competition Blocks */}
          <AchievementList />
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

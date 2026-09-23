import PageTransition from '../components/layout/PageTransition.jsx';
import Hero from '../components/intro/Hero.jsx';
import Footer from '../components/layout/Footer.jsx';

/**
 * Home page — Intro + About on a single scrollable route ("/").
 * See design.md §4.1 and §4.2.
 *
 * Intro: full-viewport centered (min-height: 100svh), no navbar — just centered
 * logo at the very top of Intro per design.md §3.2. Chrome is minimal.
 *
 * About: (to be added in a later phase) scroll-revealed section below Intro.
 */
export default function Home() {
  return (
    <PageTransition>
      <main>
        {/* Intro section — full viewport, vertically centered */}
        <section
          id="intro"
          className="relative flex items-center justify-center"
          style={{ minHeight: '100svh' }}
        >
          <Hero />
        </section>

        {/* About section — scroll-revealed, below Intro */}
        <section id="about">
          {/* Phase 3: About section — scroll-revealed, two-column layout */}
        </section>

        {/* Footer at the very end of Home per design.md §3.2 */}
        <Footer />
      </main>
    </PageTransition>
  );
}

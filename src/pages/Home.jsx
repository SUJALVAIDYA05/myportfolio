import Hero from '../components/intro/Hero.jsx';
import AboutSection from '../components/about/AboutSection.jsx';
import Footer from '../components/layout/Footer.jsx';

/**
 * Home page — Intro + About on a single scrollable route ("/").
 * Follows design.md §1, §4.1, and §4.2:
 *
 * 1. Intro: full-viewport centered (min-height: 100svh), minimal chrome
 *    (just centered logo at top of Intro, no traditional navbar).
 * 2. About: scroll-triggered reveal section below Intro (text + photo).
 * 3. Footer: muted footer at the very end of Home.
 */
export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      {/* Intro section — full viewport, vertically centered */}
      <section
        id="intro"
        className="relative flex items-center justify-center"
        style={{ minHeight: '100svh' }}
      >
        <Hero />
      </section>

      {/* About section — scroll-revealed, two-column layout */}
      <AboutSection />

      {/* Footer at the end of Home per design.md §3.2 */}
      <Footer className="mt-auto" />
    </main>
  );
}

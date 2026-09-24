import Hero from '../components/intro/Hero.jsx';
import AboutSection from '../components/about/AboutSection.jsx';
import MyProjectsSection from '../components/projects-teaser/MyProjectsSection.jsx';
import CertificationsSection from '../components/certifications-teaser/CertificationsSection.jsx';
import Footer from '../components/layout/Footer.jsx';

/**
 * Home page — one long scrollable route ("/").
 * Follows design.md §1, §4.1, §4.2, §4.3, and §4.4:
 *
 * 1. Intro: full-viewport centered (min-height: 100svh), minimal chrome
 *    (just centered logo at top of Intro, no traditional navbar).
 * 2. About: scroll-triggered reveal section below Intro (text left, arch photo right).
 * 3. My Projects: scroll-triggered teaser (photo left via RectImage, text right, button -> /projects).
 * 4. Certifications: scroll-triggered teaser (text left, photo right via RectImage, button -> /certifications).
 * 5. Footer: muted footer at the very end of Home per design.md §3.2.
 */
export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      {/* 1. Intro section — full viewport, vertically centered */}
      <section
        id="intro"
        className="relative flex items-center justify-center"
        style={{ minHeight: '100svh' }}
      >
        <Hero />
      </section>

      {/* 2. About section — scroll-revealed, two-column layout */}
      <AboutSection />

      {/* 3. My Projects teaser section — scroll-revealed (photo left / text right) */}
      <MyProjectsSection />

      {/* 4. Certifications teaser section — scroll-revealed (text left / photo right) */}
      <CertificationsSection />

      {/* Footer at the end of Home per design.md §3.2 */}
      <Footer className="mt-auto" />
    </main>
  );
}

import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import SocialLinks from '../components/contact/SocialLinks.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';

/**
 * Contact page ("/contact") — direct contact list + form.
 * Follows design.md §4.5, content.md §6, and animations.md §7:
 *
 * Layout:
 * - Centered layout, generous vertical whitespace, cream background
 * - Heading: "Let's talk" (--fs-h1, Playfair Display)
 * - Subtext: "Have a project in mind, a question, or just want to say hi? Reach out..."
 * - Two parts:
 *   1. Direct contact list (SocialLinks chips with email, GitHub, LinkedIn, Instagram)
 *   2. Simple contact form (ContactForm with name, email, message, and backend submission)
 * - Standard fadeUp entrance animations on load
 */

const EASE = [0.22, 1, 0.36, 1];
const DURATION_BASE = 0.45;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_BASE,
      ease: EASE,
      delay,
    },
  },
});

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (delay) =>
    shouldReduceMotion
      ? {}
      : {
          variants: fadeUp(delay),
          initial: 'hidden',
          animate: 'visible',
        };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 sm:px-12 py-12 sm:py-16 lg:py-20">
        {/* Header: "Let's talk" + Subtext */}
        <div className="text-center max-w-[680px] mx-auto mb-14 sm:mb-16 lg:mb-20">
          <motion.h1
            {...motionProps(0)}
            className="text-[var(--color-text-primary)] font-normal tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h1)',
              lineHeight: 1.15,
            }}
          >
            Let&apos;s talk
          </motion.h1>
          <motion.p
            {...motionProps(0.12)}
            className="mt-4 sm:mt-5 text-[var(--color-text-secondary)] font-body text-base sm:text-lg leading-relaxed m-0"
          >
            Have a project in mind, a question, or just want to say hi? Reach out
            &mdash; I usually reply within a day or two.
          </motion.p>
        </div>

        {/* Grid Layout: Social Links (Left) + Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-[1040px] mx-auto">
          {/* Left Column: Direct Links / Socials */}
          <motion.section
            {...motionProps(0.2)}
            aria-labelledby="direct-contact-heading"
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div>
              <h2
                id="direct-contact-heading"
                className="font-normal text-[var(--color-text-primary)] text-xl sm:text-2xl mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Direct Contact
              </h2>
              <p className="font-body text-sm text-[var(--color-text-secondary)] m-0 leading-relaxed">
                Feel free to connect directly via email or any of my social profiles.
              </p>
            </div>

            <SocialLinks />
          </motion.section>

          {/* Right Column: Contact Form */}
          <motion.section
            {...motionProps(0.28)}
            aria-labelledby="send-message-heading"
            className="lg:col-span-7 bg-[var(--color-bg-alt)]/40 p-6 sm:p-8 lg:p-10 rounded-2xl border border-[var(--color-border)]/60 shadow-2xs"
          >
            <h2
              id="send-message-heading"
              className="font-normal text-[var(--color-text-primary)] text-xl sm:text-2xl mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Send a Message
            </h2>
            <p className="font-body text-sm text-[var(--color-text-secondary)] mb-6 sm:mb-8 leading-relaxed">
              Leave a quick note below and it will land straight in my inbox.
            </p>

            <ContactForm />
          </motion.section>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

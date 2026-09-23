import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button.jsx';

/**
 * ContactForm — name, email, message contact form.
 * Follows design.md §4.5, content.md §6, backend.md §5, and animations.md §7:
 * - Posts to VITE_API_URL/api/contact
 * - Hidden honeypot field ("company")
 * - Rounded 12px inputs with --color-surface background, --color-border outline,
 *   and --color-accent focus transition
 * - Loading state with "Sending..." and subtle opacity pulse
 * - Inline success/error feedback with fadeUp entrance, without auto-dismiss
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */

const EASE = [0.22, 1, 0.36, 1];

export default function ContactForm({ className = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          company: formData.company, // honeypot value
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', company: '' });
      } else {
        setStatus('error');
        setErrorMessage(
          data.error ||
            'Something went wrong sending your message — please email me directly instead.'
        );
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(
        'Something went wrong sending your message — please email me directly instead.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-5 sm:gap-6 ${className}`}
    >
      {/* Honeypot field (hidden from humans, visible to bots) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
          left: '-9999px',
        }}
      >
        <label htmlFor="form-company">Company</label>
        <input
          type="text"
          id="form-company"
          name="company"
          tabIndex="-1"
          autoComplete="off"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      {/* Name Input */}
      <div>
        <label
          htmlFor="form-name"
          className="block font-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-2"
        >
          Your Name <span className="text-[var(--color-accent)]">*</span>
        </label>
        <input
          type="text"
          id="form-name"
          name="name"
          required
          autoComplete="name"
          placeholder="e.g. Maya Sharma"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 sm:px-5 py-3.5 rounded-[12px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-body text-[var(--fs-body)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all duration-200 disabled:opacity-60"
        />
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="form-email"
          className="block font-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-2"
        >
          Your Email <span className="text-[var(--color-accent)]">*</span>
        </label>
        <input
          type="email"
          id="form-email"
          name="email"
          required
          autoComplete="email"
          placeholder="e.g. maya@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 sm:px-5 py-3.5 rounded-[12px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-body text-[var(--fs-body)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all duration-200 disabled:opacity-60"
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="form-message"
          className="block font-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-2"
        >
          Message <span className="text-[var(--color-accent)]">*</span>
        </label>
        <textarea
          id="form-message"
          name="message"
          required
          rows="5"
          placeholder="Tell me about your project, idea, or just say hello..."
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 sm:px-5 py-3.5 rounded-[12px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-body text-[var(--fs-body)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all duration-200 resize-y min-h-[120px] disabled:opacity-60"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto shadow-sm"
        >
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[var(--color-text-inverse)] border-t-transparent rounded-full animate-spin shrink-0" />
              <span>Sending&hellip;</span>
            </span>
          ) : (
            <span>Send Message &rarr;</span>
          )}
        </Button>
      </div>

      {/* Inline Feedback Messages (Fade + slide up per animations.md §7) */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="p-4 sm:p-5 rounded-[12px] bg-[var(--color-bg-alt)] border border-[var(--color-accent)]/30 text-[var(--color-text-primary)] flex items-start gap-3 mt-2"
            role="status"
          >
            <span className="text-[var(--color-accent)] text-lg shrink-0 mt-0.5">
              &#10003;
            </span>
            <div className="font-body text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-[var(--color-accent-dark)] m-0">
                Message received!
              </p>
              <p className="mt-1 m-0 text-[var(--color-text-primary)]">
                Thanks for reaching out &mdash; I&apos;ll get back to you soon!
              </p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error-message"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="p-4 sm:p-5 rounded-[12px] bg-[var(--color-bg-alt)] border border-red-300 text-[var(--color-text-primary)] flex items-start gap-3 mt-2"
            role="alert"
          >
            <span className="text-red-600 text-lg shrink-0 mt-0.5">
              &#9888;
            </span>
            <div className="font-body text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-red-700 m-0">Notice</p>
              <p className="mt-1 m-0 text-[var(--color-text-primary)]">
                {errorMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

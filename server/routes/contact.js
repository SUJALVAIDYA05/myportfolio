import express from 'express';
import { sendContactEmail } from '../lib/email.js';

const router = express.Router();

/**
 * POST /api/contact
 * Handles contact form submissions with honeypot bot defense and field validation.
 * See backend.md §3.
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, message, company } = req.body || {};

    // 1. Honeypot check:
    // If the hidden 'company' field is filled, it was filled by an automated bot.
    // Silently succeed with 200 without sending email so bots don't learn.
    if (company) {
      console.log('[BOT BLOCKED] Honeypot triggered by submission.');
      return res.json({ success: true });
    }

    // 2. Field validation:
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'All fields (name, email, message) are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // 3. Send email:
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Contact form error (full details):', err?.stack || err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Something went wrong processing your message. Please try again later.',
    });
  }
});

export default router;

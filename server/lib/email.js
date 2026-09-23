import { Resend } from 'resend';
import nodemailer from 'nodemailer';

/**
 * Send contact email helper.
 * Supports Resend (recommended) or Nodemailer (fallback) per backend.md §4.
 * In development without credentials, simulates sending and logs to console.
 *
 * @param {Object} params
 * @param {string} params.name - Sender name
 * @param {string} params.email - Sender email
 * @param {string} params.message - Message body
 */
export async function sendContactEmail({ name, email, message }) {
  const recipient = process.env.CONTACT_EMAIL_TO || 'sujalv641@gmail.com';

  // Option A: Resend (Recommended)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipient,
      reply_to: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Resend error sending email');
    }
    return result;
  }

  // Option B: Nodemailer + Gmail App Password (Fallback)
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    return await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  }

  // Development Fallback: No credentials provided
  console.log('----------------------------------------------------');
  console.log('[DEV NOTICE] No email provider credentials found.');
  console.log('[DEV NOTICE] Simulating successful email dispatch:');
  console.log(`To: ${recipient}`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log('----------------------------------------------------');

  return { success: true, simulated: true };
}

import nodemailer from "nodemailer";

let transporter;
function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("GMAIL_USER or GMAIL_APP_PASSWORD environment variable is missing.");
  }
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  return transporter;
}

export default async function handler(req, res) {
  // Set CORS headers for preflight and cross-origin access
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  // Parse body whether it arrives as an object or raw JSON string
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { name, email, message, company } = body || {};

  // Honeypot hit: pretend success to deceive spam bots
  if (company) {
    return res.json({ success: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Please provide a valid email address." });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("GMAIL_USER or GMAIL_APP_PASSWORD is not set in hosting environment variables");
    return res.status(500).json({
      success: false,
      error: "Server configuration error: Gmail credentials not configured in hosting dashboard.",
    });
  }

  try {
    const info = await getTransporter().sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO || process.env.GMAIL_USER,
      replyTo: email.trim(),
      subject: `New portfolio message from ${name.trim()}`,
      text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
    });

    console.log("Email dispatched successfully:", info.messageId);
    return res.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(502).json({
      success: false,
      error: error.message || "Email service failed. Please try again.",
    });
  }
}

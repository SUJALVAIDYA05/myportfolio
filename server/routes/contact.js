import express from "express";
import { sendContactEmail } from "../lib/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message, company } = req.body || {};

  if (company) return res.json({ success: true }); // honeypot hit: pretend success

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Please provide a valid email." });
  }

  try {
    await sendContactEmail({ name: name.trim(), email: email.trim(), message: message.trim() });
    return res.json({ success: true });
  } catch (err) {
    console.error("Contact email failed:", err); // <- the real reason shows in the server terminal
    return res.status(502).json({ success: false, error: "Email service failed. Please try again." });
  }
});

export default router;

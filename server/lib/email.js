import nodemailer from "nodemailer";

let transporter;
function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("GMAIL_USER or GMAIL_APP_PASSWORD is not set");
  }
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,          // sujalv641@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD,  // 16-char App Password, NOT the login password
    },
  });
  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  await getTransporter().sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}

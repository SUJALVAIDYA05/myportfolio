import "dotenv/config"; // MUST be first
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
  console.log("Email provider key loaded:", Boolean(process.env.RESEND_API_KEY || process.env.GMAIL_APP_PASSWORD));
});

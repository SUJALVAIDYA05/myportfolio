import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// CORS configuration to allow requests from Vite dev server
app.use(
  cors({
    origin: [CLIENT_ORIGIN, 'http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

// Routes
app.use('/api/contact', contactRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
  console.log(`Accepting requests from: ${CLIENT_ORIGIN}`);
});

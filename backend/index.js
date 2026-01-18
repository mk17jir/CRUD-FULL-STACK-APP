import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import Auth from './Authentication.js';
import cors from 'cors';

dotenv.config();
const app = express();

/* =========================
   CORS
========================= */
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", cors()); // handle preflight requests

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

// Simple logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/* =========================
   ROUTES
========================= */
app.use('/api', userRoutes);
app.use('/api', todoRoutes);

// Protected test route
app.get('/', Auth, (req, res) => {
  res.send('Welcome to the API');
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* =========================
   DATABASE & SERVER
========================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log('✅ MongoDB connected successfully');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

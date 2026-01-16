// index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import Auth from './Authentication.js';
import cors from 'cors';

// Enable CORS for all routes




dotenv.config();
const app = express();
import cors from "cors";

// Allow only your frontend to access backend
app.use(cors({
  origin: "https://crud-full-stack-app-todo-6htdmfi80-mk17jirs-projects.vercel.app",
  credentials: true
}));


app.use(express.json());

// Simple logger
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});



// API routes
app.use('/api', userRoutes);
app.use('/api', todoRoutes);

app.get('/', Auth, (req, res) => {
  res.send('Welcome to the API');
});

const PORT = process.env.PORT; 
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('✅ MongoDB connected successfully');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });


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

const allowedOrigins = [
  "http://localhost:5173",
  "https://crud-full-stack-app-zxcw.vercel.app", 
  "https://crud-full-stack-app-zxcw-git-main-mk17jirs-projects.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
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


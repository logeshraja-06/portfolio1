const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// CORS middleware setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// Trust proxy for secure deployment behind proxies (Render, Vercel, Heroku, etc.)
app.set('trust proxy', 1);

// Spam Protection: Rate Limiter (Max 5 contact requests per 15 minutes per IP)
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting specifically to contact API route
app.use('/api/contact', apiRateLimiter, contactRoutes);

// Health Check route for deployment monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'MERN backend server is active.' });
});

// Main error handler middleware
app.use((err, req, res, next) => {
  console.error('Express Server Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong on the server.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

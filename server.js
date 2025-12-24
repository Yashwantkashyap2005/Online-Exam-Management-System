const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// 🔹 FRONTEND (STATIC FILES)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

// ✅ FIX: env variable name correct
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// API Routes
app.use('/auth', require('./routes/auth'));
app.use('/exams', require('./routes/exams'));
app.use('/submit', require('./routes/submissions'));

// 🔹 FRONTEND ROUTE (VERY IMPORTANT FOR SINGLE DEPLOYMENT)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

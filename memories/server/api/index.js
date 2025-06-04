import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(express.json());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories API.');
});

// MongoDB connection caching for serverless
let isConnected = false;

async function connectToDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  isConnected = true;
  console.log('MongoDB connected');
}

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Export handler for Vercel serverless functions
export const handler = serverless(app);

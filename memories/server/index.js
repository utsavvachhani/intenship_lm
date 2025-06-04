import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello to Memories API.');
});

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Mongoose connection (only runs once per container cold start)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

export const handler = serverless(app);

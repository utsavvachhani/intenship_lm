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

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Serverless Express on Vercel!');
});

// MongoDB connection logic
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      isConnected = true;
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
}

// Custom handler to wrap with DB init
const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

export const handlerExport = serverless(handler);
export default handlerExport;

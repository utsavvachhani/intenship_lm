import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

// Connect to MongoDB (optional, depends on your setup)
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected || '))
.catch((err) => console.error('MongoDB connection error:', err));

export const handler = serverless(app);

// index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Sample Route
app.get("/", (req, res) => {
  res.json({ message: "Serverless API is working on Vercel!" });
});

// Add more routes below
// app.post("/api/something", (req, res) => { ... });

// Export the serverless handler
export const handler = serverless(app);

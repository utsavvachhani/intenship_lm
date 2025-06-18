import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import adminRoutes from './routes/adminRoutes.js';
import staffRoutes from './routes/staffRoutes.js'
import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));



app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/staff',staffRoutes);
app.use('/categories',categoriesRoutes);


app.get('/', (req, res) => {
    res.send('Hello to Memories API.');
});

// Connect to MongoDB **only once**, outside the handler
let isConnected = false;

async function connectToDB() {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

// Vercel expects a default handler export
export default async function handler(req, res) {
    await connectToDB();
    app(req, res); // Use Express to handle the request
}

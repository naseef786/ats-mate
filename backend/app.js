import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import resumeRouter from './routes/resume.js';

connectDB();
const app = express();
app.use(cors());
app.use(json());

app.use('/api/auth', authRouter);
app.use('/api/resume', resumeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

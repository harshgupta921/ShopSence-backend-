import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import http from 'http';
import { errorMiddleware } from './middleware/error.js';
// Create Express app
const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,
}));

// Middleware setup
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(path.resolve('public')));
app.use(cookieParser());

const httpServer = http.createServer(app);

// Router import and setup
import userRouter from './routers/user.routes.js';
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);
export { httpServer };
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/db.js';
import MessagesRoutes from './routes/message.routes.js';
import UserRoutes from './routes/user.route.js';
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://chatty-rb.vercel.app'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

/* app.use(express.static(path.join(__dirname, '/frontend/out')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'out', 'index.html'));
});
 */
app.use('/auth', authRoutes);
app.use('/message', MessagesRoutes);
app.use('/users', UserRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log('Server is running!', PORT);
});

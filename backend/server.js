import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/db.js';
import MessagesRoutes from './routes/message.routes.js';
import UserRoutes from './routes/user.route.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/message', MessagesRoutes);
app.use('/api/users', UserRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log('Server is running!', PORT);
});

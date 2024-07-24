import express from 'express';
import {
  sendMessage,
  getMessages,
} from '../controllers/message.controllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

const MessagesRoutes = express.Router();

MessagesRoutes.post('/send/:id', protectRoute, sendMessage);
MessagesRoutes.get('/:id', protectRoute, getMessages);

export default MessagesRoutes;

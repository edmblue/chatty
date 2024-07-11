import express from 'express';
import { getUsersForSidebar } from '../controllers/user.controllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

const UserRoutes = express.Router();

UserRoutes.get('/', protectRoute, getUsersForSidebar);

export default UserRoutes;

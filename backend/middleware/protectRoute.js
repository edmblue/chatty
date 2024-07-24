import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    const user = await User.findById(decoded.userId).select('-password'); //its going to return every field in the controller but the password;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // crea el param que va a ser enviado al controllers

    next();
  } catch (error) {
    console.log('Error at protect route middleware', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

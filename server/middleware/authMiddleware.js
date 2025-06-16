import jwt from 'jsonwebtoken';
import Account from '../models/Account.js';
import dotenv from 'dotenv';
dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Account.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }
};

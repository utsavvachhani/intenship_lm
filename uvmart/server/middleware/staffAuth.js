// middleware/auth.js
import jwt from 'jsonwebtoken';
import Staff from '../models/staff/staff.js';

export const authStaff = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const staff = await Staff.findById(decoded.id);
    if (!staff) return res.status(404).json({ message: 'User not found' });

    req.staff = staff; // attach for downstream handlers
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// middleware/auth.js
import jwt from 'jsonwebtoken';
import Admin from '../models/admin/admin.js'; // adjust path as needed

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Look up the user in the Admin collection
    const admin = await Admin.findById(decodedData.id);

    if (!admin) {
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    // Attach admin info to request
    req.user = {
      id: admin._id,
      email: admin.email,
      role: 'admin',
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;

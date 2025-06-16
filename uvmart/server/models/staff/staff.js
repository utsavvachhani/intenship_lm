// models/Staff.js
import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, 
    enum: [
      'Vendor',
      'Supplier',
      'Delivery Agent',
      'Shipping Partner',
      'Warehouse Manager',
      'Support Staff',
      'Quality Control'
    ],
    required: true
  },
  isVerified: { type: Boolean, default: false },
  isVerifiedByAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
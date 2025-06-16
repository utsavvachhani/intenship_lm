import mongoose from 'mongoose';

const staffVerification = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  otp: String,
  otpExpires: Date,
  profilePic: { type: String },
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
  messageReq : {type : String},
  isVerified: { type: Boolean, default: false },
  isVerifiedByAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const StaffVerification  =  mongoose.model('staffVerification', staffVerification);
export default StaffVerification ;
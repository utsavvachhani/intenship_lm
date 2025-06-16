import mongoose from 'mongoose';

const userVerificationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false }
});

export default mongoose.model('UserVerification', userVerificationSchema);
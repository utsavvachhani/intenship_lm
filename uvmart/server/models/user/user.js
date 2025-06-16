import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, required: false },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }
});

export default mongoose.model('User', userSchema);
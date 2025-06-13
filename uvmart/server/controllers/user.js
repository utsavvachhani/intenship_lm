import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOTP } from '../utils/sendOtp.js';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const signUp = async (req, res) => {
  console.log("New User Signup!!");
  
  try {
    const { email, fullName, password,mobile, confirmPassword } = req.body;
    if (!fullName || !password || password !== confirmPassword) {
      return res.status(400).json({ message: 'Invalid data or passwords do not match' });
    }

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });

    await sendOTP(email, otp);
    await user.save();

    res.status(200).json({ email, message: 'OTP sent. Please verify your email.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifySignup = async (req, res) => {
  console.log("Verification called");
  
  try {
    const { email, otp } = req.body;

    const userDeatils = await User.findOne({ email, otp, otpExpires: { $gt: new Date() } });
    if (!userDeatils) return res.status(400).json({ message: 'Invalid or expired OTP' });

    userDeatils.isVerified = true;
    userDeatils.otp = null;
    userDeatils.otpExpires = null;
    await userDeatils.save();

    const token = jwt.sign({ id: userDeatils._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const user = { fullName : userDeatils.fullName}
    res.status(200).json({user, message: 'User verified successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDeatils = await User.findOne({ email });
    if (!userDeatils || !userDeatils.isVerified) return res.status(401).json({ message: 'Invalid credentials or unverified user' });

    const match = await bcrypt.compare(password, userDeatils.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: userDeatils._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const user = { fullName : userDeatils.fullName }
    res.status(200).json({user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

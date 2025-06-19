import Admin from '../models/admin/admin.js';
import AdminVerification from '../models/admin/adminVarification.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { sendOTP } from '../utils/sendMessage.js';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
dotenv.config();

export const signUp = async (req, res) => {
  console.log("Admin Signup");
  
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      confirmPassword,
      secretKey
    } = req.body;

    // Basic validation
    if (!fullName || !email || !mobile || !password || !confirmPassword || !secretKey) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if(secretKey!==process.env.SECRET_kEY){
      return res.status(400).json({ message: 'Secret Key is Wrong !! Please Provides Right.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    const existingVerification = await AdminVerification.findOne({ email });
    if (existingVerification) {
      await AdminVerification.deleteOne({ email }); // cleanup stale entry
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = generateOTP();

    const tempAdmin = new AdminVerification({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      secretKey,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 mins
    });

    await sendOTP(email, otp); // Implement email sender
    await tempAdmin.save();

    res.status(200).json({
      success: true,
      email,
      message: 'OTP sent. Please verify your email.'
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Signup failed. Try again later.' });
  }
};

export const verifySignup = async (req, res) => {
  console.log("Verification ADMIN called");
  
  try {
    const { email, otp } = req.body;

    const userDetails = await AdminVerification.findOne({ email, otp, otpExpires: { $gt: new Date() } });
    if (!userDetails) return res.status(400).json({ message: 'Invalid or expired OTP' });

    userDetails.isVerified = true;
    userDetails.otp = null;
    userDetails.otpExpires = null;
    await userDetails.save();

    const newUser = new Admin({
      fullName: userDetails.fullName,
      email: userDetails.email,
      mobile: userDetails.mobile,
      password: userDetails.password,
      isVerified: true,
    });
    
    await newUser.save();
    const token = jwt.sign({ id: newUser._id,role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await AdminVerification.deleteOne({ _id: userDetails._id });

    const user = { fullName : newUser.fullName, _id: newUser._id, email: newUser.email, mobile: newUser.mobile}
    res.status(200).json({user, message: 'User verified successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err)
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDetails = await Admin.findOne({ email });
    if (!userDetails || !userDetails.isVerified) return res.status(401).json({ message: 'Invalid credentials or unverified user' });

    const match = await bcrypt.compare(password, userDetails.password);
    if (!match) return res.status(401).json({ message: 'Password Not Matched !!' });

    const token = jwt.sign({ id: userDetails._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const user = { 
      fullName : userDetails.fullName, 
      _id: userDetails._id, 
      email: userDetails.email, 
      mobile: userDetails.mobile
    }
    res.status(200).json({user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


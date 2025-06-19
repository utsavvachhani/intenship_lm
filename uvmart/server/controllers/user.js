import User from '../models/user/User.js';
import userVerificationSchema from '../models/user/userVarification.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOTP } from '../utils/sendMessage.js';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const signUp = async (req, res) => {
  console.log("New User Signup!!");
  
  try {
    const { email, fullName, password,mobile, confirmPassword } = req.body;
    if (!email || !mobile || !fullName || !password || password !== confirmPassword) {
      return res.status(400).json({ message: 'Invalid data or passwords do not match' });
    }

     const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists in main database' });
    }


    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userVerificationSchema({
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

export const forget =  async (req,res) => {
  console.log("Forget password triggered");

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Step 1: Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    // Step 2: Generate OTP
    const otp = generateOTP();

    // Step 3: Clean up any previous verification entries
    await userVerificationSchema.deleteMany({ email });

    // Step 4: Move user data to verification DB
    const otpRecord = new userVerificationSchema({
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      password: user.password, // already hashed
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
      isVerified: false, // user must verify again
    });

    await otpRecord.save();

    // Step 5: Delete from main DB
    user.isVerified = false;
    await user.save();

    // Step 6: Send OTP
    await sendOTP(email, otp);

    // Step 7: Respond
    return res.status(200).json({ email, message: 'OTP sent to your email for password reset.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

export const verifySignup = async (req, res) => {
  console.log("Verification called");
  
  try {
    const { email, otp } = req.body;

    const userDetails = await userVerificationSchema.findOne({ email, otp, otpExpires: { $gt: new Date() } });
    if (!userDetails) return res.status(400).json({ message: 'Invalid or expired OTP' });

    userDetails.isVerified = true;
    userDetails.otp = null;
    userDetails.otpExpires = null;
    await userDetails.save();

    const newUser = new User({
      fullName: userDetails.fullName,
      email: userDetails.email,
      mobile: userDetails.mobile,
      password: userDetails.password, 
      isVerified: true
    });
    
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await userVerificationSchema.deleteOne({ _id: userDetails._id });

    const user = { fullName : newUser.fullName, _id: newUser._id, email: newUser.email, mobile: newUser.mobile}
    res.status(200).json({user, message: 'User verified successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err)
  }
};

export const verifyingForeget = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find OTP record and ensure OTP is not expired
    const verificationRecord = await userVerificationSchema.findOne({
      email,
      otp,
      otpExpires: { $gt: new Date() },
    });

    if (!verificationRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // OTP verified - update main User to isVerified: true
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found in main database' });
    }

    userDetails.isVerified = true;
    await userDetails.save();

    
    // Delete verification record
    await userVerificationSchema.deleteOne({ _id: verificationRecord._id });
    const token = jwt.sign({ id: userDetails._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const user = { fullName : userDetails.fullName, _id: userDetails._id, email: userDetails.email, mobile: userDetails.mobile}
    res.status(200).json({user, message: 'OTP verified successfully. You can now reset your password.',token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDetails = await User.findOne({ email });
    if (!userDetails || !userDetails.isVerified) return res.status(401).json({ message: 'Invalid credentials or unverified user' });

    const match = await bcrypt.compare(password, userDetails.password);
    if (!match) return res.status(401).json({ message: 'Password is Not Matched !' });

    const token = jwt.sign({ id: userDetails._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const user = { fullName : userDetails.fullName, _id: userDetails._id, email: userDetails.email, mobile: userDetails.mobile}
    res.status(200).json({user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  console.log("Updated Profiles !!");
  try {
    const { updatePayload } = req.body;
    const  _id  = req.params.id;
  
    const userDetails = await User.findOne({_id});
    if(!userDetails) return res.status(401).json({message: 'Not Valid ID'});

    if (updatePayload.password || updatePayload.confirmPassword) {
      if (updatePayload.password !== updatePayload.confirmPassword) {
        return res.status(400).json({ message: "Password doesn't match Confirm Password." });
      }
      const hashedPassword = await bcrypt.hash(updatePayload.password, 10);
      userDetails.password = hashedPassword;
    }

    if(updatePayload.fullName) userDetails.fullName = updatePayload.fullName;
    if(updatePayload.mobile) userDetails.mobile = updatePayload.mobile;
    await userDetails.save();

    const token = jwt.sign({ id: userDetails._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const user = { fullName : userDetails.fullName, _id: userDetails._id, email: userDetails.email, mobile: userDetails.mobile}
    res.status(200).json({user, token });    
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
    
  }
}

export const googleSignIn = async (req, res) => {
  console.log("googleSignIn");
  
  try {
    const { fullName, email, googleId, token } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create user if not exists
      user = new User({
        fullName,
        email,
        password: googleId, // optional - or leave null
        isVerified: true,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      user: {
        fullName: user.fullName,
        email: user.email,
        _id: user._id,
      },
      token: jwtToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Google sign-in failed' });
  }
};

import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const signin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message:  " User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"})
        // console.log(error);
        
    }
}

export const signup = async(req, res) => {
    const { email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(404).json({ message:  "User Alrady exist."});
        if(password !== confirmPassword) return res.status(404).json({ message:  "Passwords Don't Match."});

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, firstName: firstName, lastName: lastName  });
        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "1h"});

        return res.status(200).json({ result: result, token});
        // res.send('SignUp');
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Something went wrong"})
    }
}

export const upadteUserProfile = async (req, res) => {
  const { id: _id } = req.params;
  const {formData}  = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No user with that id.');
  }

  try {

    if(formData.password) {
        const hashedPassword = await bcrypt.hash(formData.password, 12);
        formData.password = hashedPassword;
    }

    const result = await User.findByIdAndUpdate(
      _id,
      { ...formData, _id },
      { new: true }
    );

    const updatedUserProfile = {result} ;
    // console.log('Updated Profile!!', updatedUserProfile);
    res.json(updatedUserProfile);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user profile.' });
  }
};
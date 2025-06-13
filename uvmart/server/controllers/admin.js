import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js';

export const signin = async(req, res) => {
  console.log("signin request received for admin");
    const { email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });

        if(!existingAdmin) return res.status(404).json({ message:  " Admin doesn't exist."});
        if(existingAdmin.role === "false") return res.status(404).json({ message:  "Wait for the Approveled"});

        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials."})

        const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({ result: existingAdmin, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"})
        // console.log(error);
        
    }
}

export const signup = async(req, res) => {
  console.log("signup request received for admin");
  
    const { email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if(existingAdmin) return res.status(404).json({ message:  "Admin Alrady exist."});
        if(password !== confirmPassword) return res.status(404).json({ message:  "Passwords Don't Match."});

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Admin.create({ email, password: hashedPassword, firstName: firstName, lastName: lastName, role: false  });
        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "1h"});

        return res.status(200).json({ result: result, token});
        // res.send('SignUp');
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Something went wrong"})
    }
}

export const upadteAdminProfile = async (req, res) => {
  console.log("upadteAdminProfile request received");
  
  const { id: _id } = req.params;
  const {formData}  = req.body;
  // console.log(formData); 
  
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No Admin with that id.');
  }

  try {

    if(formData.password) {
        const hashedPassword = await bcrypt.hash(formData.password, 12);
        formData.password = hashedPassword;
    }

    const result = await Admin.findByIdAndUpdate(
      _id,
      { ...formData, _id },
      { new: true }
    );

    const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "1h"});
    res.status(200).json({ result: result, token})
  } catch (error) {
    console.error('Error updating Admin:', error);
    res.status(500).json({ message: 'Failed to update Admin profile.' });
  }
};

export const adminUpdatesRole = async (req, res) => {
  console.log("updateAdminProfile request received");

  const { id: _id } = req.params;
  const { role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No Admin with that id.');
  }

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      _id,
      { role },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }
    
    res.status(200).json({ message: 'Admin role updated successfully.', admin: updatedAdmin });
  } catch (error) {
    console.error('Error updating Admin role:', error);
    res.status(500).json({ message: 'Failed to update Admin role.' });
  }
};

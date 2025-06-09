import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Card,
  Typography,
  Button,
  TextField,
  Box
} from '@mui/material';
import Input from '../Auth/Input.jsx';
import { useDispatch } from "react-redux";
import { updateUserProfile } from '../../actions/auth.jsx';
import { useProfileStyles } from '../../styles.js';

function UserProfile() {
  const classes = useProfileStyles();
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem('profile'));
  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  

  const isGoogleUser = !!user?.result?.sub;

  const [formData, setFormData] = useState({
    firstName: storedUser?.result?.firstName || '',
    lastName: storedUser?.result?.lastName || '',
    email: storedUser?.result?.email || '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Password is Not Match !!', {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
    });
      return;
    }

    const updatedUser = {
      ...user,
      result: {
        ...user.result,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      }
    };

    const success = dispatch(updateUserProfile(user?.result?._id,{
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password || undefined, 
    }));
    localStorage.setItem('profile', JSON.stringify(updatedUser));
    setUser(updatedUser);
    if(success) {
      toast.success('Profile Updated successfully!', {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
      });
    } else {
      toast.error('Profile Update Failed!!', {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
      });
    }
    setIsEditing(false);
  };

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} variant="h5">User Profile</Typography>

      <Box sx={{ mt: 2 }}>
        {isGoogleUser ? (
          <>
            <Typography>Email: {user?.result?.email}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              You are signed in with Google. Profile editing is disabled.
            </Typography>
          </>
        ) : !isEditing ? (
          <>
            <Typography><strong>First Name: </strong>{user?.result?.firstName}</Typography>
            <Typography><strong>Last Name: </strong>{user?.result?.lastName}</Typography>
            <Typography><strong>Email: </strong> {user?.result?.email}</Typography>
            <Button className={classes.buttonSubmit} onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <Input 
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
            />
            <Input 
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type="password"
            />
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button className={classes.buttonSubmit}  onClick={handleSave}>Save</Button>
              <Button className={classes.buttonSubmit}  onClick={() => setIsEditing(false)}>Cancel</Button>
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
}

export default UserProfile;
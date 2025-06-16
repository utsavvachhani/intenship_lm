import React, { useState } from 'react';
import { useNavigate } from'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Input from '../Auth/Input'; 
import { forget } from '../../actions/auth.jsx';
import { useStyles } from '../../styles.js';
import { toast } from 'react-toastify';

const initialState = { email: '' };

function ForgetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(forget(formData));

    if (res?.success) {
        toast.success('📧 OTP sent to your email.', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
        });
        // Optional: redirect to OTP verification page
        setTimeout(() => navigate('/forgotverifying'), 500);
    } else {
        toast.error(res?.message || 'Failed to send OTP', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
        });
    }

    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" className='m-20 p-10' sx={{ borderRadius: '20px' }}>
      <Paper elevation={3}>
        <div className='flex p-5 justify-center items-center gap-2'>
          <Avatar sx={{ backgroundColor: "black" }}>
            <LocationOnIcon sx={{ color: '#ffffff' }} />
          </Avatar>
          <Typography variant="h5" fontFamily="revert-layer">Forgot Password</Typography>
        </div>

        <form className="m-5 mt-0" onSubmit={handleSubmit}>
          <Grid>
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Button className={classes.siginbutton} type="submit" fullWidth variant="contained">
              {loading ? 'Verifying...' : 'Send OTP'}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default ForgetPassword;

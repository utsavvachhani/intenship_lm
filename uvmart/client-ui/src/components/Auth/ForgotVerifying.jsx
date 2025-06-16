import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyingforeget } from '../../actions/auth'; // adjust path
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { toast } from 'react-toastify';
import { Avatar, Button,Grid, Paper,  Typography, Container } from '@mui/material';
import Input from './Input';
import { useStyles } from '../../styles.js';

function ForgotVerifying() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    // handle input changes
    setOtp(e.target.value);
  };
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      return toast.error('Missing OTP or email!');
    }

    setLoading(true);
    try {
      const res = await dispatch(verifyingforeget({email, otp}));
      if (res?.success) {
        toast.success('✅ Verified successfully!',{
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
        navigate('/home');
      } else {
        toast.error('OTP verification failed',{
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      }
    } catch (error) {
      toast.error('Server error during verification',{
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      console.log(error);
      
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" className='m-20 p-10' sx={{borderRadius: '20px'}}>
      <Paper className={``} elevation={3}>
        <div className='flex p-5 justify-center items-center gap-2 '>

          <Avatar sx={{backgroundColor : "black"}}>
            <LocationOnIcon sx={{color : '#ffffff'}} />
          </Avatar>
          <Typography variant="h5" fontFamily="revert-layer" >Email Verification</Typography>
        </div>
        
        <form className="m-5 mt-0" onSubmit={handleSubmit}>
          <Grid>
        <Input
          name="otp"
          label="Enter OTP"
          // type="password"
          placeholder="Enter OTP"
          // value={otp}
          handleChange={handleChange}
          type={showPassword ? 'text' : 'password'} 
           handleShowPassword={handleShowPassword}
          required
          />

        <br />
          <Button className={classes.siginbutton} type="submit" fullWidth variant="contained">
            {loading ? 'Verifying ...' : 'Verify OTP'}
          </Button>
          </Grid>
        </form>
      </Paper>
    </Container>

  );
}

export default ForgotVerifying;

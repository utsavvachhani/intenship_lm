import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom' ;
import CircularProgress from '@mui/material/CircularProgress';
import Icon from './Icon.jsx';
import Input from './Input.jsx';
import { signin, signup } from '../../actions/auth.jsx'
import { toast } from 'react-toastify';
import {useAuthStyles} from '../../Styles/styles.js';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function Auth() {
  const classes = useAuthStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = useState(initialState)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // handle form submit logic
    // console.log(formData);
    setLoading(true);
    let res;
    if(isSignup){
      res = await dispatch(signup(formData));
      if (res?.success) {
      toast.success('🎉 Registration successful!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setTimeout(() => navigate('/posts'), 500);
    } else {
      toast.error(res?.message || 'Signup failed', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    } else {
      res = await dispatch(signin(formData));
      if (res?.success) {
      toast.success('🦄 Signed in successfully!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setTimeout(() => navigate('/posts'), 500);
    } else {
      toast.error(res?.message || 'Signin failed', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    }
    setLoading(false);
  };
  
  const handleChange = (e) => {
    // handle input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const googleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const result = jwtDecode(token); // name, email, picture, etc.

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      // Redirect or further actions
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later.");
  };

  return (
    <>
    {/* <ToastContainer position="top-right" autoClose={5000} /> */}
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid>
            {isSignup && (
              <>
                <Input  name="firstName" label="First Name" handleChange={handleChange} autoFocus  />
                <Input name="lastName" label="Last Name" handleChange={handleChange}  />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input 
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input 
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button className={classes.logout} type="submit" fullWidth variant="contained" >
          {loading ? <CircularProgress size={24} color="inherit" /> : (isSignup ? 'Sign Up' : 'Sign In')}
          </Button>

          <GoogleLogin 
          render={(renderProps) =>(
              <Button 
              className={classes.googleButton} 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} 
              startIcon={<Icon/>} 
              variant="contained"
              >
                Google Sign In
              </Button>
            )}
          onSuccess={googleSuccess} 
          onError={googleFailure} 
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} fullWidth style={{marginTop: '15px'}} >
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid> 
          </Grid>
        </form>
      </Paper>
    </Container>
    </>
  );
}

export default Auth;

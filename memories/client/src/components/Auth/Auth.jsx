import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom' ;
import Icon from './Icon.jsx';
import Input from './Input.jsx';
import useStyles from './styles.js';
import { signin, signup } from '../../actions/auth.jsx'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submit logic
    // console.log(formData);

    if(isSignup){
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
    
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
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
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

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin 
          render={(renderProps) =>(
              <Button 
              className={classes.googleButton} 
              color="primary" 
              fullWidth 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                Google Sign In
              </Button>
            )}
          onSuccess={googleSuccess} 
          onError={googleFailure} 
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} fullWidth>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;

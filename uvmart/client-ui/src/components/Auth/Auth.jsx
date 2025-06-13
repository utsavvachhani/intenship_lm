import React,{ useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from'react-redux';
import { useNavigate } from'react-router-dom';
import { signin, signup } from '../../actions/auth.jsx'
import { toast } from 'react-toastify';
import { useStyles } from '../../styles.js';

const initialState = { fullName: '', email: '',mobile : '', password: '', confirmPassword: '' }

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [ formData, setFormData ] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async(e) => {
     e.preventDefault();
    // handle form submit logic
    // console.log(formData);

    let res;
    if(isSignup){
      res = await dispatch(signup(formData));
      if (res?.success) {
      toast.success('🎉 OTP sent. Please verify your email.!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setTimeout(() => navigate('/verifying'), 500);
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
      setTimeout(() => navigate('/home'), 500);
    } else {
      toast.error(res?.message || 'Signin failed', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    }
  };
  
  const handleChange = (e) => {
    // handle input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => setShowPassword((prev) => !prev);
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
  
  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs" className='m-20 p-10' sx={{borderRadius: '20px'}}>
      <Paper className={``} elevation={3}>
        <div className='flex p-5 justify-center items-center gap-2 '>
          <Avatar sx={{backgroundColor : "black"}}>
            <LocationOnIcon sx={{color : '#ffffff'}} />
          </Avatar>
          <Typography variant="h5" fontFamily="revert-layer" >{isSignup ? 'Sign Up' : 'Sign In'} </Typography>
        </div>

        <form className="m-5 mt-0" onSubmit={handleSubmit} > 
          <Grid>
            {isSignup && (
              <>
                <Input name="fullName" label="Full Name" handleChange={handleChange} autoFocus />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            {isSignup && (
              <>
                <Input name="mobile" label="Mobile Number" handleChange={handleChange} autoFocus type="mobile" />
              </>
            )}
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'}  handleShowPassword={handleShowPassword} />
            {isSignup && (
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
            )}
          </Grid>

          <Button className={classes.siginbutton} type="submit" fullWidth variant="contained">
            {isSignup? 'Verified Your Self' : 'Sign In'}
          </Button>

          <GoogleLogin 
            render={(renderProps) => (
              <Button 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />}
                variant="contained"
              >
                <strong>Google Sign In</strong>
              </Button>
            )}
            onSuccess={googleSuccess} 
            onError={googleFailure} 
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} fullWidth style={{margin: '12px 0' }} className="hover-bold-button">
                {isSignup? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid> 
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

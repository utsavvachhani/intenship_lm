import React,{ useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Input from './Input';
import { useDispatch } from'react-redux';
import { useNavigate } from'react-router-dom';
import { signin, signup} from '../../actions/auth.jsx'
import { toast } from 'react-toastify';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useStyles } from '../../styles.js';

const initialState = { fullName: '', email: '', password: '', confirmPassword: '', secretKey: '', mobile: '' }

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [ formData, setFormData ] = useState(initialState);
  const [isMobileValid, setIsMobileValid] = useState(true); // track mobile validity
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChangeMobile = (newValue) => {
    setFormData({ ...formData, mobile: newValue });
    setIsMobileValid(matchIsValidTel(newValue));
  };
  
  const handleSubmit = async(e) => {
     e.preventDefault();
    // handle form submit logic
    // console.log(formData);
    setLoading(true);

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
                <MuiTelInput 
                  name="mobile" 
                  value={formData.mobile} 
                  onChange={handleChangeMobile} 
                  fullWidth 
                  defaultCountry="IN"
                />
                {!isMobileValid && (
                  <span style={{ color: 'red', fontSize: '0.875rem' }}>
                    Please enter a valid mobile number.
                  </span>
                )}             
              </>
            )}
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'}  handleShowPassword={handleShowPassword} />
            {isSignup && (
              <>
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
              <Input name="secretKey" label=" Enter Secret Key" handleChange={handleChange} type="password" />
              </>
            )}
          </Grid>

          <Button className={classes.siginbutton} type="submit" fullWidth variant="contained">
            {isSignup? (loading ? 'Verifying ...' : 'Verified Your Self') : (loading ? 'Signin ... ' : 'Signin')}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} fullWidth style={{margin: '0 0 12px 0' }} className="hover-bold-button">
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

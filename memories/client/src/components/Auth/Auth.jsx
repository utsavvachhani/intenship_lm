import React,{useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@mui/material';
import useStyles from './styles.js';
import LocalAirportOutlined from '@mui/icons-material/LockOutLine'  
import Input from './Input.jsx';
import Icon from './Icon.jsx';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux';

function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {} ;
  const handleChange = () => {};
  const handleShowPassword = () => setShowPassword((prevShowPassoword) => !prevShowPassoword);
  const switchMode = () => { 
    setIsSignup((prevSetIsSignup)=> !prevSetIsSignup); 
    handleShowPassword(false);
  };
  
  const googleSucess = async (res) => {
    // console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: [ result, token ] })
    } catch (error) {
      console.log(error);
      
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was unsuccessful, Try Again Later.");
    
  };

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3} >
          <Avatar className={classes.avatar}>
            <LocalAirportOutlined />
          </Avatar>
          <Typography variant='h5'>{isSignup ? `Sign Up` : `Sign In`}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name="firstName" label="First Name"  handleChange={handleChange} autoFocus half />
                    <Input name="firstName" label="First Name"  handleChange={handleChange} half />
                  </>
                )
              }

              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              { 
                isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> 
              }
            </Grid>

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {
                isSignup ? "Sign Up" : "Sign In"
              }
            </Button>
            <GoogleOAuthProvider clientId="1055452697976-kir7ok7d3s0ui66v9h3la71i11tsu5s7.apps.googleusercontent.com">

            <GoogleLogin  
              render={(renderProps) => {
                <Button 
                className={classes.googleButton} 
                color="primary" fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon /> }
                variant="contained" 
                >
                  Google Sign In
                </Button>
              }}
              onSuccess={googleSucess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            </GoogleOAuthProvider>

            <Grid container justifyContent="flex-end" > 
              <Grid item> 
                <Button fullWidth onClick={ switchMode } >
                  {
                    isSignup ? "Alrady have an account? Sign In" : "Don't have an account> Sign Up"
                  }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </Container>  
  )
}

export default Auth
import React,{ useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, FormControl, InputLabel , MenuItem, Select, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from'react-redux';
import { useNavigate } from'react-router-dom';
import { signin, signup } from '../../actions/auth.jsx'
import { toast } from 'react-toastify';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useStyles } from '../../styles.js';

const initialState = { fullName: '', email: '',mobile : '', password: '', confirmPassword: '', profilePic : '' , role: '',messageReq : ""}
const roles = [
  'Vendor',
  'Supplier',
  'Delivery Agent',
  'Shipping Partner',
  'Warehouse Manager',
  'Support Staff',
  'Quality Control'
];

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [ formData, setFormData ] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(true); // track mobile validity
  const [loading, setLoading] = useState(false);

  const forgotPassword = () => {
    navigate('/forgetpassword');
  }
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
  const handleChangeSelected = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeMobile = (newValue) => {
    setFormData({ ...formData, mobile: newValue });
    setIsMobileValid(matchIsValidTel(newValue));
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
                {/* // selected box  */}
                <FormControl fullWidth variant="outlined" margin="normal" required>
                  <InputLabel 
                    id="role-select-label" 
                    sx={{ color: 'black', '&.Mui-focused': { color: 'black' } }}
                  >
                    Select Role
                  </InputLabel>

                  <Select
                    name="role"
                    fullWidth
                    value={formData.role}
                    onChange={handleChangeSelected}
                  >
                    {roles.map((role) => (
                      <MenuItem
                        key={role}
                        value={role}
                        sx={{ color: 'black' }}
                        className={classes.menuItem}
                      >
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Input name="messageReq" label="Enter Your Message" handleChange={handleChange} type="text" />
                
                 <div style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
                  <input
                    id="profilePicInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, profilePic: reader.result });
                      };
                      if (file) reader.readAsDataURL(file);
                    }}
                  />

                  <label
                    htmlFor="profilePicInput" 
                    style={{
                      display: 'inline-block', width: '220px',
                      height: '30px', border: '2px dashed #ccc',
                      borderRadius: '8px', cursor: 'pointer',
                      textAlign: 'center', backgroundColor: '#f9f9f9',
                      fontWeight: 'bold', color: '#555',
                      transition: '0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.borderColor = '#333')}
                    onMouseOut={(e) => (e.currentTarget.style.borderColor = '#ccc')}
                  >
                    Chose Profile Picture
                  </label>

                  {formData.profilePic && (
                    <div style={{ marginTop: '1rem' }}>
                      <img
                        src={formData.profilePic}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
                
              </>
            )}
          </Grid>

          <Button className={classes.siginbutton} type="submit" fullWidth variant="contained">
            {isSignup? (loading ? 'Verifying ...' : 'Verified Your Self') : (loading ? 'Signin ... ' : 'Signin')}
          </Button>
          {
            !isSignup && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={forgotPassword} fullWidth style={{margin: '12px 0 0 0' }} className="hover-bold-button">
                    {'forgot password ?' }
                  </Button>
                </Grid>
              </Grid>
            )
          }
          
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

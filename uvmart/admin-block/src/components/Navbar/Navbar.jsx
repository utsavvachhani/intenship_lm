import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch } from'react-redux'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LOGOUT } from '../../constants/actionTypes'
import { Button,Avatar, Box, Menu, MenuItem } from '@mui/material'
import logo from '../../Images/uvMart-logo.svg'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useStyles } from '../../styles.js'

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));  
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    toast.success('LogOut successfully!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
    handleMenuClose();
    setTimeout(() => navigate('/auth'), 500);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <>
    <div className={`color-baground  rounded-b-4xl flex items-center justify-between pl-4`} > 
      <Link to="/" className='color-navbar flex-shrink-0 md:rounded-b-4xl md:rounded-t-none rounded-4xl mb-3  '>
        <div className="flex flex-col md:flex-row items-center gap-2 p-3 md:gap-6">
          <img src={logo} className={`h-15 w-15 `}/>
          <div className="flex flex-col md:flex-row md:gap-20 items-center text-center">
            <Typography
              sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
              className="font-logo font-color-primary"
            >
              uvMart
            </Typography>
            <Typography
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' } }}
              className="font-color-secondary"
            >
              Admin
            </Typography>
          </div>

        </div>
      </Link>
      <div className='flex flex-end mr-22'>
      {
        !user ? (
          <Button variant="contained" className={classes.ButtonUI} onClick={() => navigate('/auth')} >
            <LoginIcon /> Signin
          </Button>
        ) : (
          <div className={''}>
            <Button onClick={handleMenuOpen} className={classes.ButtonUI} >
              <Avatar className={classes.avatar} alt={user.user.fullName}>
                {user.user.fullName?.charAt(0) || 'U'}
              </Avatar>
              <Box sx={{ mx: 2 }}>
                <Typography variant="subtitle2" className={''}>
                    {user.user.fullName || user.user.name || 'User'}
                </Typography>
                </Box>
                  <ArrowDownwardIcon  />
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    className: classes.manuNavbar,
                  }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                  <MenuItem onClick={logout} sx={{ gap: 2, pl: 2, transition: 'border-left 0.2s ease', ":hover": { borderLeft: "6px solid black", },  }} >  <LogoutIcon/> Logout </MenuItem>
                </Menu>
              </div>
            )
        }
        </div>
      </div>      
    </>
  )
} 

export default Navbar;
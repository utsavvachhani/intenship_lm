import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button,Box, Menu, MenuItem } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../../Images/uvMart-logo.svg';
import { useNavbarStyles } from '../../styles.js';
import { LOGOUT } from '../../constants/actionTypes.js';
// import {AccountCircleIcon, LogoutIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
  const dispatch = useDispatch();
  const classes = useNavbarStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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

  const goToProfile = () => {
    navigate(`/user/profile/${user.result._id}`);
    handleMenuClose();
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
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        <Link to='/'>
          <div className={classes.leftSide}>
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
        </Link>

        {user ? (
          <div className={classes.profile}>
            <Button onClick={handleMenuOpen} className={classes.iconButton} >
              <Avatar className={classes.avatar} alt={user.result.firstName}>
                {user.result.firstName?.charAt(0) || 'U'}
                {user.result.lastName?.charAt(0) || ' '}
              </Avatar>
              <Box sx={{ mx: 2 }}>
                <Typography variant="subtitle2" className={classes.username}>
                  {user.result.firstName} {user.result.lastName}
                </Typography>
              </Box>
              <ArrowDropDownIcon  />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                className: classes.menu,
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem className={classes.menuItem}  onClick={goToProfile} > Profile <AccountCircleIcon /> </MenuItem>
              <MenuItem onClick={logout}  className={classes.menuItem} > Logout <LogoutIcon/> </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" className={classes.logout} 
            startIcon={<LoginIcon />}
          >
            {/* <LoginIcon sx={{ fontSize: '20px', transition: 'none' }}  /> */}
            Signin 
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

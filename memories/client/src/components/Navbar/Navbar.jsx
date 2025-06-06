import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import memoriesText from '../../Images/memories-text.svg';
import memoriesLogo from '../../Images/memories-logo.png';
import { jwtDecode } from 'jwt-decode'; 
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes.js';
import { toast } from 'react-toastify';
import { useNavbarStyles } from '../../Styles/styles.js';

function  Navbar() {
    const dispatch = useDispatch();
    const classes = useNavbarStyles();  
    const navigate = useNavigate();
    const location = useLocation()
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem(`profile`)));
    // console.log(user);
    const logout = () => {
      dispatch({ type: LOGOUT });
      setUser(null);
      toast.success(' LogOut successfully!', {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
      });
      setTimeout(() => navigate(`/auth`) , 500);

    }

  useEffect(() => {
  const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);


  return (
    <div>
        <AppBar className={classes.appBar} position="static" color="thired"  >
          <Toolbar className={classes.toolbar} >
          <Link to='/'>
          <div className={classes.leftSide}>
            <img className={classes.logo} src={memoriesLogo}  alt="logo" />
            <img className={classes.textImage} src={memoriesText} alt="memories" height="60" />
          </div>
          </Link>
            { user ? (
                    <div className={classes.profile}>
                        <Link to= {`/user/profile/${user.result._id}`}  style={{ textDecoration: 'none' }}  >
                        <Avatar className={classes.avatar} alt={user.result.firstName} src={user.imageUrl}>{user.result.firstName ? user.result.firstName.charAt(0)  : 'U' }{user.result.lastName ? user.result.lastName.charAt(0)  : 'V' }</Avatar>
                        </Link>
                        <Typography className={classes.userName} variant="overline" >{user.result.firstName}  {user.result.lastName}</Typography>
                        <Button className={classes.logout} variant="contained" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' className={classes.logout} >Signin</Button>
                )
            } 
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar;
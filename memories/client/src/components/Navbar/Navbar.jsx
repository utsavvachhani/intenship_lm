import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useLocation } from 'react-router-dom'
import useStyles from './styles.js';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import memories from '../../Images/memories.svg';
import { jwtDecode } from 'jwt-decode'; 
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes.js';

function Navbar() {
    const dispatch = useDispatch();
    const classes = useStyles();  
    const navigate = useNavigate();
    const location = useLocation()
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem(`profile`)));
    console.log(user);
    const logout = () => {
      dispatch({ type: LOGOUT });
      navigate(`/`);
      setUser(null);
    }

    
useEffect(() => {
  const token = user?.token;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  }

  setUser(JSON.parse(localStorage.getItem('profile')));
}, [location]);

  return (
    <div>
        <AppBar 
        className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer} >
            <Typography className={classes.heading} component={Link} to='/' variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
          </div>
          <Toolbar className={classes.toolbar}>
            { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name ? user.result.name.charAt(0) : 'U'}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained'>Signin</Button>
                )
            } 
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar;
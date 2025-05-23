import React from 'react'
import {Link} from 'react-router-dom'
import useStyles from './styles.js';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import memories from '../../Images/memories.svg';

function Navbar() {
    const classes = useStyles();
    const user = null;
  return (
    <div>
        <AppBar 
        className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer} >
            <Typography className={classes.heading} component={Link} to='/' variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
          </div>
          <Toolbar className={classes.toolbar}>
            {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' >Logout</Button>
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
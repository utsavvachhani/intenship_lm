import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch } from'react-redux'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import FlightIcon from '@mui/icons-material/Flight';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LOGOUT } from '../../constants/actionTypes'
import { Button,Avatar, Box, Menu, MenuItem } from '@mui/material'
import logo from '../../Images/uvMart-logo.svg'
import SearchBar from './SearchBar.jsx';
import SuggestionBar from './SuggestionBar.jsx'
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

  const goToProfile = () => {
    navigate(`/user/profile/${user.user._id}`);
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
    <>
    <div className={`color-baground  rounded-b-4xl flex items-center pl-4`} > 
      <Link to="/" className='color-navbar flex-shrink-0 md:rounded-b-4xl md:rounded-t-none rounded-4xl  '>
        <div className={`flex items-center gap-2 rounded-b-3xl mb-3 mr-3 p-3`}>
          <img src={logo} className={`h-25 w-25 `}/>
          <div className={` w-max hidden sm:block `} >
            <Typography sx={{fontSize : '3rem '}} className='font-logo font-color-primary '> uvMart </Typography>
            <Typography sx={{fontSize : '1rem'}} className={`flex justify-center font-color-secondary `} > Express </Typography>
          </div>
        </div>
      </Link>
      <div className={`h-full w-full overflow-hidden`}>
        <div className="flex flex-col lg:flex-row lg:items-center py-2 px-4 h-full w-full justify-center gap-4 md:gap-0">
        {/* <div className={`flex sm:items-center py-2 px-4 h-full w-full justify-center`}> */}
          <div className={``}>
            <SearchBar />
          </div>
          <div className={`flex h-full w-full justify-around items-center px-2 py-4 `}>
            <div className="flex justify-center items-center mr-4">
              {/* Return & Orders */}
              <div 
                className={` flex justify-center gap-0.5 items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ease-out hover:bg-gray-100 active:bg-gray-200 relative group `}
                onClick={() => navigate('/returns')}
              >
                <FlightIcon className="coloe-symbol group-hover:text-blue-600" />
                <Typography className="hidden md:block coloe-symbol group-hover:text-blue-600 font-medium">
                  Return & Orders
                </Typography>
                
                {/* Ripple effect */}
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute inset-0 bg-blue-500 opacity-0 group-active:opacity-10 group-active:animate-ripple"></span>
                </span>
                
                {/* Tooltip for mobile */}
                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2
                  bg-gray-800 text-white text-xs py-1 px-2 rounded
                  opacity-0 group-hover:opacity-100 transition-opacity
                  md:hidden">
                  Returns & Orders
                </span>
              </div>

              {/* Shopping Bag */}
              <div className={` flex justify-center gap-0.5 items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ease-out hover:bg-gray-100 active:bg-gray-200 relative group `}
                onClick={() => navigate('/shoppinbag')}
              >
                <ShoppingCartOutlinedIcon className="coloe-symbol group-hover:text-blue-600" />
                <Typography className="hidden md:block coloe-symbol group-hover:text-blue-600 font-medium">
                  Shopping Bag
                </Typography>
                
                {/* Cart badge */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-once">
                  3
                </span>
                
                {/* Ripple effect */}
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute inset-0 bg-blue-500 opacity-0 group-active:opacity-10 group-active:animate-ripple"></span>
                </span>
                
                {/* Tooltip for mobile */}
                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
                  Shopping Bag
                </span>
              </div>
            </div>

            <div className={``}>

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
                          {
                            user.user.name ? user.user.name : ` ${user.user.fullName}  `
                          }
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
                      <MenuItem onClick={goToProfile} sx={{ gap: 2, pl: 2, transition: 'border-left 0.2s ease', ":hover": { borderLeft: "6px solid black", },  }} >  <AccountCircleIcon />  Profile  </MenuItem>
                      <MenuItem onClick={logout} sx={{ gap: 2, pl: 2, transition: 'border-left 0.2s ease', ":hover": { borderLeft: "6px solid black", },  }} >  <LogoutIcon/> Logout </MenuItem>
                    </Menu>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto hidden sm:block">
          <SuggestionBar />
        </div>        
      </div>
    </div>
    <div className="w-full overflow-x-auto sm:hidden block">
          <SuggestionBar />
    </div> 
    </>
  )
} 

export default Navbar;
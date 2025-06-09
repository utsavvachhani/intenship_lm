import { makeStyles } from '@mui/styles';

// Shared button styles
const sharedButton = (theme) => ({
  backgroundColor: `${theme.palette.custom.button.background} !important`,
  border: `2px solid ${theme.palette.custom.button.border} !important`,
  color: `${theme.palette.custom.button.text} !important`,
  '&:hover': {
    backgroundColor: `${theme.palette.custom.button.hover} !important`,
    color: `${theme.palette.custom.button.hoverText} !important`,
    fontWeight: 'bold !important',
  },
  '&.Mui-disabled': {
    backgroundColor: `${theme.palette.custom.button.disableBaground} !important`,
    color: `${theme.palette.custom.button.disabledText} !important`,
    border: `2px solid ${theme.palette.custom.button.disabledBorder} !important`,
    cursor: 'not-allowed',
  },
});

// Navbar Styles
export const useNavbarStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: `${theme.palette.background.paper} !important`,
    boxShadow: 'none',
    borderRadius: 15,
    padding: '10px 10px 10px 0px',
    margin: '5px 0',
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    height: '50px',
  },
  logo: {
    height: '80px',
    width: '80px',
  },
  textImage: {
    height: '70px',
    objectFit: 'contain',
    [theme.breakpoints.down(1045)]: {
      display: 'none',
    },
  },
  
  profile: {
    display: 'flex',
    justifyContent: 'end',
    // alignItems: 'center',
    width: '100%',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      justifyContent: 'center'
    },
  },

  avatar: {
    width: '40px',
    height: '40px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: `${theme.palette.custom.colors.avatar} important`,
    backgroundColor: `${theme.palette.custom.colors.avatarBackground} !important`,
    textDecoration: 'none',
    borderRadius: '50%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  username: {
    margin: '0 10px', // Add left and right margin
    fontWeight: 600,
    color: theme.palette.text.title,
    [theme.breakpoints.down(1200)]: {
      display: 'none',
    },
  },

  iconButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.custom.button.hover,
      boxShadow: `0 0 5px ${theme.palette.custom.button.hoverText}`,
    },
  },

  menu: {
    backgroundColor: theme.palette.background.paper,
    border: `3px solid black`,
    borderRadius: '20px',
    marginTop: theme.spacing(1),
    minWidth: '200px',
    padding: theme.spacing(1, 0),
    boxShadow: theme.shadows[3],
    zIndex: 1302,
  },

  menuItem: {
    '&&' : {
      padding: theme.spacing(1.5, 2),
      fontSize: '14px',
      color: theme.palette.text.primary,
      gap: '10px',
      '&:hover': {
        backgroundColor: theme.palette.custom.button.hover,
        color: theme.palette.custom.button.hoverText,
        borderLeft: `5px solid ${theme.palette.custom.button.hoverText} !important`,
        fontWeight: 'bold!important',
      },
    },
  },

  logout: {
    ...sharedButton(theme),
    border: `5px solid ${theme.palette.custom.button.border} !important`,
    borderRadius: '15px !important',
    height: '50px',
    width: '150px',
    gap: '10px',
  },
}));

// Auth Styles
export const useAuthStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'black',
    width: '100%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      boxShadow: 'none',
    },
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
    padding: 0,
  },
  logout: {
    ...sharedButton(theme),
    border: `3px solid ${theme.palette.custom.button.border} !important`,
    margin: '10px 0 !important',
  },
  input: {
    boxSizing: 'border-box',
    paddingRight: 0,
    margin: '5px !important',
  },
  googleButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

// Profile Styles
export const useProfileStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  buttonSubmit: {
    ...sharedButton(theme),
    borderRadius: '8px !important',
    height: '35px',
    width: '220px',
    marginBottom: '5px !important',
  },
}));

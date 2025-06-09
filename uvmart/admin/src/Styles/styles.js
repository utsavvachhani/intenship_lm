import { makeStyles } from '@mui/styles';
export const useNavbarStyles = makeStyles((theme) => ({
    appBar: {
    boxShadow: 'none',
    borderRadius: 15,
    padding: '10px 10px 10px 0px',
    margin: '10px 0',
    backgroundColor: theme.palette.background.paper,
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      // flexWrap: 'wrap',
      flexDirection: 'column',
      // justifyContent: 'flex-start',
    }
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    height: '80px',
  },

  logo: {
    height: '100px',
    width: '100px',
    // objectFit: 'contain',
  },

  textImage: {
    height: '70px',
    objectFit: 'contain',
    [theme.breakpoints.down(1045)]: {
      display: 'none',
    }
  },

  profile: {
    display: 'flex',
    justifyContent: 'center',
    // justifyContent: 'space-around ',
    alignItems: 'center',
    width: '100%',
    gap: '70px',
    marginLeft: '200px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',  
    }
  },

  avatar: {
    color: theme.palette.colors.avatar,
    backgroundColor: theme.palette.colors.avatarBackground,
    textDecoration: 'none',
  },

  userName: {
    fontWeight: 1000,
    color: theme.palette.text.title,
    [theme.breakpoints.down(1200)]: {
      display: 'none',
    }
  },

  logout: {
    backgroundColor: `${theme.palette.button.background} !important`,
    border: `5px solid ${theme.palette.button.border} !important`,
    borderRadius: '15px !important',
    height: '50px',
    width: '150px',
    color: `${theme.palette.button.text} !important`,
    '&:hover': {
      backgroundColor: `${theme.palette.button.hover} !important`,
      color: `${theme.palette.button.hoverText} !important`,
      fontWeight: 'bold !important' , 
    },
  },
}));

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
      boxShadow : 'none',
    }
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
    // width: '100%',
    marginTop: theme.spacing(3),
    padding: 0
  },
  logout: {
    backgroundColor: `${theme.palette.button.background} !important`,
    border: `3PX solid ${theme.palette.button.border} !important`,
    margin: '10px 0 !important',
    color: `${theme.palette.button.text} !important`,
    '&:hover': {
      backgroundColor: `${theme.palette.button.hover} !important`,
      color: `${theme.palette.button.hoverText} !important`,
      fontWeight: 'bold !important',
    },
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


export const useProfileStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.card.backgroundColor,
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
    marginBottom: '5px !important',
    backgroundColor: `${theme.palette.button.background} !important`,
    border: `2px solid ${theme.palette.button.border} !important`,
    borderRadius: '8px !important',
    height: '35px',
    width: '220px',
    color: `${theme.palette.button.text} !important`,
    '&:hover': {
      backgroundColor: `${theme.palette.button.hover} !important`,
      color: `${theme.palette.button.hoverText} !important`,
      fontWeight: 'bold !important',
    },
    '&.Mui-disabled': {
      backgroundColor: `${theme.palette.button.disableBaground} !important`,
      color: `${theme.palette.button.disabledText} !important`,
      border: `2px solid ${theme.palette.button.disabledBorder} !important`,
      cursor: 'not-allowed',
    },
  },
}));

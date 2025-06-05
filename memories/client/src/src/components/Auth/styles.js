import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
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

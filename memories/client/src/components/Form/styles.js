import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%', // ensures inputs take full width on all screens
    },
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '100%', 
    margin: '10px 0',
  },
  
  buttonSubmit: {
    marginBottom: '5px !important',
    backgroundColor: `${theme.palette.button.background} !important`,
    border: `2px solid ${theme.palette.button.border} !important`,
    borderRadius: '8px !important',
    height: '35px',
    width: '150px',
    color: `${theme.palette.button.text} !important`,
    '&:hover': {
      backgroundColor: `${theme.palette.button.hover} !important`,
      color: `${theme.palette.button.hoverText} !important`,
      fontWeight: 'bold !important' , 
    },

    '&.Mui-disabled': {
    backgroundColor: `${theme.palette.button.disableBaground} !important`, 
    color: `${theme.palette.button.disabledText} !important`, 
    border: `2px solid ${theme.palette.button.disabledBorder} !important`,
    cursor: 'not-allowed',
    },
  },
}));

export default useStyles;

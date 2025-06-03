import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  postsGrid: {
    width: '68%',
    [theme.breakpoints.down('sm')]: {
      width: '100%', // full width on small screens
    },
  },
  formGrid: {
    width: '30%',
    position: 'sticky',
    top: theme.spacing(2),
    alignSelf: 'flex-start',
    height: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      width: '100%',      
      position: 'static', 
      alignSelf: 'flex-start'
    },
  },
  appBarSearch: {
    borderRadius: 4,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pagination: {
    marginTop: 4,
    padding: '16px',
  },

   buttonSubmit: {
    marginBottom: 10,
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
  }
}));

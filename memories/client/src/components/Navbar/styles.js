import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
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
  },

  profile: {
    display: 'flex',
    justifyContent: 'space-around ',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
    marginLeft: '200px',
  },

  avatar: {
    color: theme.palette.colors.avatar,
    backgroundColor: theme.palette.colors.avatarBackground,
  },

  userName: {
    fontWeight: 1000,
    color: theme.palette.text.title,
  },

  logout: {
    backgroundColor: `${theme.palette.button.background} !important`,
    border: `2px solid ${theme.palette.button.border} !important`,
    borderRadius: '10px !important',
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

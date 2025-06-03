  import { makeStyles } from '@mui/styles';

  export default makeStyles((theme) => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',     // Align content to the top
      borderRadius: 15,
      position: 'relative',
      width: 260,
      minHeight: 400,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgb(255, 255, 255)',
      margin: 'auto',
      backgroundColor: `${theme.card.backgroundColor}  !important`,
    },
    media: {
      height: 250,
      width: '100%',
      objectFit: 'cover',
      // backgroundColor: '#f0f0f0',
      display: 'block',
    },
    overlay: {
      position: 'absolute',
      top: 10,
      left: 10,
      color: 'white',
      padding: '6px 10px',
      borderRadius: 5,
    },
    overlay2: {
      position: 'absolute',
      top: 10,
      right: 10,
      color: 'white',
      padding: '6px 10px',
      borderRadius: 5,
      // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '10px 16px 0 16px',
      flexWrap: 'wrap',
    },
    tag: {
      color: `${theme.card.text} !important`,
    },
    title: {
      margin: '10px 16px 0 16px',
      fontWeight: 600,
      fontSize: '1.5rem',
      fontFamily: 'Arial, sans-serif',
      color: `${theme.card.text} !important`,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    message: {
      margin: '10px 16px',
      fontSize: '0.95rem',
      color: `${theme.card.text} !important`,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      minHeight: '3.6em',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
      flexDirection: 'column',
    },
    likeButton:{
      color: `${theme.card.like} !important`,

      '&.Mui-disabled': {
        color: `${theme.palette.button.disabledText} !important`, 
        cursor: 'not-allowed',
      },  
    },

    deleteButton: { 
      color: `${theme.card.delete} !important`,
    }
  }));
    


  
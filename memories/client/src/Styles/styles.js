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

export const useHomeStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down('md')]: {
      width: '50%', 
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%', 
    },
  },
  formGrid: {
    width: '30%',
    position: 'sticky',
    top: theme.spacing(2),
    alignSelf: 'flex-start',
    height: 'fit-content',
    paddingTop: "10px",
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',      
      position: 'static', 
      alignSelf: 'flex-start'
    }

  },
  appBarSearch: {
    borderRadius: 4,
    padding: theme.spacing(2),
    margin : "10px 0 10px 0 "    
  },
  pagination: {
    // margin: "10px 0 ",
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

export const useFormStyles = makeStyles((theme) => ({
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

export const usePostDetailsStyles = makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '500px',
    minHeight: '300px',
    height: 'auto',
    margin: '0 0 30px 0', 
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  section: {
    flex: 1,
    padding: '10px 20px',
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      padding: '10px 0',
    },
  },
  title: {
    margin: '10px 0 !important',
    fontWeight: '550 !important',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif ',
    color: `${theme.card.text} !important`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'start',
  },
  tags: {
    fontFamily: '"Georgia", "Times New Roman", serif  !important', // Italic-like font
    fontStyle: 'italic',
    fontWeight: `50px !important` ,
    color: theme.card.text ,
  },
  message: {
    margin: '0 16px 10px 16px',
    fontSize: '1rem !important',
    color: `${theme.card.text} !important`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    minHeight: '3.6em',
    textAlign: 'start',
  },
  creator: {
    fontFamily: '"Segoe UI", sans-serif',
    fontWeight: 500,
  },
  date: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '0.9rem',
    color: theme.card.text,
  },
  recommendedMedia : {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: 'none',
    minHeight: '300px',
    height: 'auto',
    margin: '0 0 30px 0', 
    [theme.breakpoints.down(1020)]: {
      maxHeight: 'none',
      maxWidth: 'none',
    }
  },
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    flexDirection: 'row',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      maxHeight: '100%',
      maxWidth: '100%',
    },
  },
  recommendedCard: {
    maxWidth: '250px',
    cursor: 'pointer',
    padding: '12px',
    boxShadow: theme.shadows[3],
    borderRadius: '10px',
    transition: '0.3s',
    alignItems: 'center',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    [theme.breakpoints.down(1020)]: {
      maxWidth: '100%',
      padding: '12px',
    },
  },
  recommendedPhoto : {
    maxWidth: "220px",
    minWidth: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    maxHeight: "150px",
    minHeight: "150px",
    [theme.breakpoints.down(1020)]: {
      maxWidth: "100%",
      maxHeight: "600px",
      minHeight: "200px",
      minWidth: "100%",
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '20px',
    [theme.breakpoints.down(1020)]: {
      flexDirection: 'column',
    },
  },
  commentsInnerContainer: {
    flex: 1,
    maxHeight: '300px',
    overflowY: 'auto',
    paddingRight: '10px',
    borderRight: '1px solid #ddd',
    [theme.breakpoints.down('md')]: {
      borderRight: 'none',
      borderBottom: '1px solid #ddd',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
  },
  commentInputContainer: {
    maxWidth: '600px',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: `${theme.palette.button.background} !important`,
    border: `2px solid ${theme.palette.button.border} !important`,
    borderRadius: '10px !important',
    height: '35px',
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

export const usePostsStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(2), 
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));

export const usePostStyles = makeStyles((theme) => ({
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
      [theme.breakpoints.down('md')]: {
        // width: '100%',
        margin: '0',
        // minHeight: 200,
        // width: '100%',
        // maxWidth: '',
      }
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start !important',
      marginTop: 'auto',
      flexDirection: 'column',
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
    fontFamily: '"Georgia", "Times New Roman", serif', // Italic-like font
    fontStyle: 'italic',
    fontWeight: 500,
    color: theme.card.text,
  },

  title: {
    margin: '10px 16px !important',
    fontWeight: '700 !important',
    fontSize: '1.4rem !important',
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif !important',
    color: `${theme.card.text} !important`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    textAlign: 'start',
  },

  message: {
    margin: '0 16px 10px 16px',
    fontSize: '1.2rem !important',
    fontWeight: '400 !important',
    fontFamily: '"Roboto", "Arial", sans-serif !important',
    color: `${theme.card.text} !important`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    minHeight: '3.6em',
    textAlign: 'start',
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
    },

    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 16px',
    },
}));

export const usePaginationStyles = makeStyles(() => ({
  ul : {
        justifyContent: 'space-between',
        padding: 0,
        margin: "20px 0"
    }
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


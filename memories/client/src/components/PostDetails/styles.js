import {makeStyles} from '@mui/styles'

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '500px',
    minHeight: '300px',
    height: 'auto',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    [theme.breakpoints.down('md')]: {
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
    fontSize: '2rem',
    fontWeight: 700,
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
    marginBottom: '15px',
  },
  tags: {
    fontSize: '1rem',
    fontStyle: 'italic',
    fontFamily: '"Georgia", "Times New Roman", serif',
    color: theme.card.text,
  },
  message: {
    fontSize: '1.1rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Arial", sans-serif',
    color: theme.card.text,
    lineHeight: 1.6,
    margin: '15px 0',
    whiteSpace: 'pre-line',
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
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
      flexDirection: 'row',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
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
    [theme.breakpoints.down('md')]: {
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

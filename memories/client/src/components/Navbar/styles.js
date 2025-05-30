import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    padding: '10px 30px',
  },
  toolbarMain: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    marginLeft: '10px',
    fontWeight: 600,
  },
  image: {
    marginRight: '10px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userName: {
    fontWeight: 500,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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

export default useStyles;

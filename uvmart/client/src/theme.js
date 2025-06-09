// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'

    background: {
        default: '#BEBEBF',
        paper: '#ffffff',
    },

    primary: {
      main: '#000000',
    },

    secondary: {
      main: '#606574',
    },

    divider : {
      main: '#E0E0E0',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#9EA99D',
      title: '#000000',
    },


    custom: {
      colors: {
        avatar: '#124243',
        avatarBackground: '#133131',
      },
      button: {
        background: '#1e1d1e',
        text: '#ffffff',
        border: '#1e1d1e',
        hover: '#a5b6e1',
        hoverText: '#000000',
        disableBaground: '#999999',
        disabledText: '#666666',
        disabledBorder: '#999999',
      },
    },
  },

  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Arial', sans-serif`,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;

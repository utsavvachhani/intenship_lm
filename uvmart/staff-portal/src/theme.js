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
      secondary: '#ffffff',
      disabled: '#9EA99D',
      title: '#000000',
    },


    custom: {
      colors: {
        avatar: '#000000',
        avatarBackground: '#f9f9f9',
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
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    navbar: 'Poppins',
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
    hoverText : {
      fontfamily: 'Georgia, serif',
      fontSize: '1.1rem',
    }
  },
});

export default theme;

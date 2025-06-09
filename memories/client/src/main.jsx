// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'
import reducers from './reducers/index.js';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {StylesProvider} from '@mui/styles'
// import './index.js';

const theme = createTheme({
  palette: {
    
    background: {
      default: '#1e1d1e', 
      paper: '#f0f0f0',   
    },

    primary: {
      main: '#2f3036',       
    },

    secondary: {
      main: '#606574',       
    },

    thired : {
      main: '#31353B',       
      contrastText: '#000000' 
    },

    text: {
      primary: '#000000',  
      secondary: '#000000', 
      disabled: '#9EA99D',  
      title: '#FFFFFF',
    },
    
    colors: {
      avatar: '#ffffff',
      avatarBackground: '#00000',
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
    }
  },
  
  card : {
    backgroundColor: '#f0f0f0',
    text: '#1e1d1e',
    like: 'rgb(0, 0, 0, 1)',
    delete: " rgb(255, 0, 0, 1)",
  }
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));
createRoot(document.getElementById('root')).render(
  <>
    <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <StylesThemeProvider theme={theme}>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="1055452697976-ekkbf8ngviau1uljbto4g9no704u0caq.apps.googleusercontent.com">
            <CssBaseline />
            <App /> 
          </GoogleOAuthProvider>
        </Provider>
      </StylesThemeProvider>
    </MuiThemeProvider>
    </StylesProvider>
  </>
);

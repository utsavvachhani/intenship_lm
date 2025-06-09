// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'
import reducers from './reducers';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import {StylesProvider} from '@mui/styles'
import theme from './theme';

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

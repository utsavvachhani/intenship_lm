import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar.jsx';
import Fotter from './components/Fotter/Fotter.jsx';
import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx';
import Verifyed from './components/Auth/Verifyed.jsx'
import ForgetPassword from './components/Auth/ForgetPassword.jsx'
import ForgotVerifying from './components/Auth/ForgotVerifying.jsx'

import { ToastContainer } from 'react-toastify';
  function App() {
    const user = JSON.parse(localStorage.getItem('profile'));
    
    return (
      <BrowserRouter>
        <Container maxWidth='xl'>
          <ToastContainer />
          <Navbar />
            <Routes>
              <Route path='/' element={<Navigate to="/home" replace />} />
              <Route path='/home' element={<Home />} />
              <Route
                path='/auth'
                element={!user ? <Auth /> : <Navigate to="/home" replace />}
              />
              <Route 
                path='/verifying'
                element={!user ? < Verifyed/> : <Navigate to="/home" replace /> }
              />
              <Route 
                path='/forgetpassword'
                element={!user ? < ForgetPassword/> : <Navigate to="/home" replace /> }
              />
              <Route 
                path='/forgotverifying'
                element={!user ? < ForgotVerifying/> : <Navigate to="/home" replace /> }
              />
            </Routes>
          <Fotter />
        </Container>
      </BrowserRouter>
    );
  }

  export default App;

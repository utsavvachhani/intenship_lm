import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar.jsx';
import Fotter from './components/Fotter/Fotter.jsx';
import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import Verifyed from './components/Auth/Verifyed.jsx'
import ForgetPassword from './components/Auth/ForgetPassword.jsx'
import ForgotVerifying from './components/Auth/ForgotVerifying.jsx'
import AdddedCategories from './components/categories/AdddedCategories.jsx'
import { ToastContainer } from 'react-toastify';


export const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return user ? children : <Navigate to="/auth" replace />;
};

export const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return !user ? children : <Navigate to="/home" replace />;
};

export const VerifyedRoutes = ({ children }) => {
   const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/home" replace />;
}


function App() {
    return (
      <BrowserRouter>
        <Container maxWidth='xl'>
          <ToastContainer />
          <Navbar />
            <Routes>
              <Route path='/' element={<Navigate to="/home" replace />} />
              <Route path='/home' element={<Home />} />
              <Route path='/user/profile/:creatorId' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path='/auth' element={<PublicRoute><Auth/></PublicRoute>} />
              <Route path='/verifying' element={<VerifyedRoutes><Verifyed/></VerifyedRoutes>} />
              <Route path='/forgetpassword' element={<PublicRoute><ForgetPassword/></PublicRoute>} />
              <Route path='/forgotverifying' element={<VerifyedRoutes><ForgotVerifying/></VerifyedRoutes>} />
              <Route path='/added-categories' element={<PrivateRoute><AdddedCategories/></PrivateRoute>} />
            </Routes>
          <Fotter />
        </Container>
      </BrowserRouter>
    );
  }

  export default App;

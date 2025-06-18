import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar.jsx';
import Fotter from './components/Fotter/Fotter.jsx';
import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx';
import Verifyed from './components/Auth/Verifyed.jsx'
import StaffVerify from './components/Verify/StaffVerify.jsx'
import CategoriesVerify from './components/Verify/CategoriesVerify.jsx'
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
              <Route path='/auth' element={<PublicRoute><Auth /></PublicRoute>} />
              <Route path='/verifying' element={<VerifyedRoutes><Verifyed /></VerifyedRoutes>} />
              <Route path='/staff-verification' element={<PrivateRoute><StaffVerify /></PrivateRoute>} />
              <Route path='/categoriy-verification' element={<PrivateRoute><CategoriesVerify /></PrivateRoute>} />
            </Routes>
          <Fotter />
        </Container>
      </BrowserRouter>
    );
  }

  export default App;

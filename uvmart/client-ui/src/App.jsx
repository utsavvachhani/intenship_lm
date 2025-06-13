import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar.jsx';
import Fotter from './components/Fotter/Fotter.jsx';
import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import ProductDeatils from './components/ProductDeatils/ProductDeatils.jsx';
import Verifyed from './components/Auth/Verifyed.jsx'
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
              <Route path='/products/:search' element={<ProductDeatils />} />
              <Route path='/user/profile/:creatorId' element={<UserProfile />} />
              <Route
                path='/auth'
                element={!user ? <Auth /> : <Navigate to="/home" replace />}
              />
              <Route 
                path='/verifying'
                element={<Verifyed/>}
                // element={!user ? < Verifyed/> : <Navigate to="/home" replace /> }
              />
            </Routes>
          <Fotter />
        </Container>
      </BrowserRouter>
    );
  }

  export default App;

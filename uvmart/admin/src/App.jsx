  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import { Container } from '@mui/material';
  import Navbar from './components/Navbar/Navbar.jsx';
  import Home from './components/Home/Home.jsx';
  import Auth from './components/Auth/Auth.jsx';
  import UserProfile from './components/UserProfile/UserProfile.jsx';
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
            {/* <Route path='/p/search' element={<Home />} /> */}
            {/* <Route path='/posts/:id' element={<PostDetails />} /> */}
            <Route path='/user/profile/:creatorId' element={<UserProfile />} />
            <Route
              path='/auth'
              element={!user ? <Auth /> : <Navigate to="/home" replace />}
            />
            </Routes>
        </Container>
      </BrowserRouter>
    );
  }

  export default App;

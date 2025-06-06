  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import Navbar from './components/Navbar/Navbar.jsx';
  import { Container } from '@mui/material';
  import Home from './components/Home/Home.jsx';
  import Auth from './components/Auth/Auth.jsx';
  import PostDetails from './components/PostDetails/PostDetails.jsx';
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
            <Route path='/' element={<Navigate to="/posts" replace />} />
            <Route path='/posts' element={<Home />} />
            <Route path='/posts/search' element={<Home />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/user/profile/:creatorId' element={<UserProfile />} />
            <Route
              path='/auth'
              element={!user ? <Auth /> : <Navigate to="/posts" replace />}
            />
            </Routes>
        </Container>
      </BrowserRouter>
    );
  }

  export default App;

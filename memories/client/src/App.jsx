import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import { Container } from '@mui/material';
import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx'

function App() {
  
  return (
   <>
   <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />  
        <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/auth' element={<Auth/>} />
        </Routes>
        {/* <Home/> */}
      </Container>
   </BrowserRouter>
   </>
  )
}

export default App;

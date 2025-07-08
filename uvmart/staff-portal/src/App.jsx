import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar.jsx";
import Fotter from "./components/Fotter/Fotter.jsx";
import Home from "./components/Home/Home.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Verifyed from "./components/Auth/Verifyed.jsx";
import ForgetPassword from "./components/Auth/ForgetPassword.jsx";
import ForgotVerifying from "./components/Auth/ForgotVerifying.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import AdddedCategories from "./components/categories/AdddedCategories.jsx";
import MyCategories from "./components/categories/MyCategories.jsx";
import AddedProducts from "./components/products/AddedProducts.jsx";
import MyProducts from "./components/products/MyProducts.jsx";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./actions/auth.jsx";
import { jwtDecode } from 'jwt-decode';

const getToken = () => localStorage.getItem("token");
const allowedRoles = ["Vendor", "Supplier", "Warehouse Manager"];
const getRoleFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);    
    return decoded.role || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export const PrivateRoute = ({ children }) => {
  const user = getToken();
  return user ? children : <Navigate to="/auth" replace />;
};

export const PublicRoute = ({ children }) => {
  const user = getToken();
  return !user ? children : <Navigate to="/home" replace />;
};

export const VerifyedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/home" replace />;
};

export const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const userRole = getRoleFromToken();

  if (!token || !userRole) {
    return <Navigate to="/auth" replace />;
  }

  return allowedRoles.includes(userRole) ? (
    children
  ) : (
    <Navigate to="/home" replace />
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path="/verifying"
            element={
              <VerifyedRoutes>
                <Verifyed />
              </VerifyedRoutes>
            }
          />
          <Route
            path="/forgetpassword"
            element={
              <PublicRoute>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/forgotverifying"
            element={
              <VerifyedRoutes>
                <ForgotVerifying />
              </VerifyedRoutes>
            }
          />
          <Route
            path="/user/profile/:creatorId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/added-categories"
            element={
              <RoleBasedRoute allowedRoles={allowedRoles}>
                <AdddedCategories />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/my-categories"
            element={
              <RoleBasedRoute allowedRoles={allowedRoles}>
                <MyCategories />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/added-products"
            element={
              <RoleBasedRoute allowedRoles={allowedRoles}>
                <AddedProducts />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/my-products"
            element={
              <RoleBasedRoute allowedRoles={allowedRoles}>
                <MyProducts />
              </RoleBasedRoute>
            }
          />
        </Routes>
        <Fotter />
      </Container>
    </BrowserRouter>
  );
}

export default App;

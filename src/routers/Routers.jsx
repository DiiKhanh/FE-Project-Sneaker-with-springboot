import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Purchased from "../pages/Purchased";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../components/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "../pages/AddProduct";
import TestProduct from "../pages/TestProduct";
import UserMenu from "../components/User/UserMenu";
import PurchasedUser from "../pages/PurchasedUser";
import ProfileUser from "../components/UI/ProfileUser";
import Contact from "../components/Contact/Contact";
import UserChangePassword from "../components/User/UserChangePassword";
import UserNotify from "../components/User/UserNotify";
import Dashboard from "../admin/Dashboard";
import UserDashboard from "../admin/user/UserDashboard";
import Loading from "../components/UI/Loading";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="contact" element={<Contact />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />

      {/* <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route path="purchased" element={<Purchased />} /> */}
      {/* <Route
        path="add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/add-product" element={<AddProduct />} />
        <Route path="dashboard/orders" element={<AddProduct />} />
        <Route path="dashboard/users" element={<UserDashboard />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      {/* test crud product */}
      {/* <Route path="test-product" element={<TestProduct />} />
      {/*  */}

      <Route path="/user-menu" element={<ProtectedRoute />}>
        <Route path="/user-menu" element={<UserMenu />}>
          <Route path="profile" element={<ProfileUser />} />
          <Route path="password" element={<UserChangePassword />} />
          <Route path="purchased" element={<PurchasedUser />} />
          <Route path="notify" element={<UserNotify />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;

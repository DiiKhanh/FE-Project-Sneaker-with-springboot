import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../components/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import UserMenu from "../components/User/UserMenu";
import PurchasedUser from "../pages/PurchasedUser";
import ProfileUser from "../components/UI/ProfileUser";
import Contact from "../components/Contact/Contact";
import UserChangePassword from "../components/User/UserChangePassword";
import UserNotify from "../components/User/UserNotify";
import Dashboard from "../admin/Dashboard";
import UserDashboard from "../admin/user/UserDashboard";
import ManagerProduct from "../admin/product/ManagerProduct";
import AuthRoute from "./AuthRoute";
import ManagerInvoice from "../admin/invoice/ManagerInvoice";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="contact" element={<Contact />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />

      <Route path="/checkout" element={<ProtectedRoute />}>
        <Route path="" element={<Checkout />} />
      </Route>

      <Route
        path="dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />

      <Route
        path="dashboard/add-product"
        element={
          <AuthRoute>
            <ManagerProduct />
          </AuthRoute>
        }
      />
      <Route
        path="dashboard/orders"
        element={
          <AuthRoute>
            <ManagerInvoice />
          </AuthRoute>
        }
      />
      <Route
        path="dashboard/users"
        element={
          <AuthRoute>
            <UserDashboard />
          </AuthRoute>
        }
      />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

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

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return currentUser?.username ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

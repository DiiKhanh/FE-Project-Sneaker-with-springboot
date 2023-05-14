import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // wait be return data usser login
  // const currentUser = 1;
  const { currentUser } = useSelector((state) => state.auth);

  return currentUser?.username ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

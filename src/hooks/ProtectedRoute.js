import { useAuthValue } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requireAuth, component: Component }) => {
  const { user } = useAuthValue();

  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;

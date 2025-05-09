import { Navigate } from "react-router-dom";
import { useVerifyToken } from "../hooks/useVerifyToken";

const ProtectedRoute = ({ children }) => {
  const { isValid, email } = useVerifyToken();

  if (isValid === null) {
    return <div className="loading">Loading...</div>;
  }
  console.log(email);

  // isAdmin ? <Navigate to="/admin" /> : <Navigate to="/employee" />;
  return isValid ? children : <Navigate to="/" />;
};

export { ProtectedRoute };

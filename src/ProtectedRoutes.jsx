import { Navigate } from "react-router-dom";
import { useAuth } from "./components/store/AuthProvider";
//import { useLocation } from "react-router-dom";


const ProtectedRoutes = ({ children,  }) => {
  const {   isAuthenticated, token, isLoading } = useAuth();
  //const location = useLocation();
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  // Once loading is done, make decision
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  

  return children;
};
export default ProtectedRoutes;
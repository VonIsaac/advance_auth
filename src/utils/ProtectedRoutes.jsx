import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ requiredRole, }) => {
    const token = Cookies.get("token");
    const role = Cookies.get("role"); // Get the role from the cookie

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/" replace />;
    }

    
    if (role !== requiredRole) { // check if the role is not equal to the required role
        return <Navigate to="/" replace />;   // redirect to the login page
    }

    return  <Outlet context={ } /> // return the children
};

export default ProtectedRoutes;

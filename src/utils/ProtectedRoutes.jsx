import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/store/AuthProvider";

const ProtectedRoutes = ({ roles, children}) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/page" replace />; // Redirect unauthorized users to home
    }

    return children; // Allows access to the route
};

export default ProtectedRoutes;


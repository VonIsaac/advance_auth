import { Navigate } from "react-router-dom";
import { useAuth } from "../components/store/AuthProvider";
 
const ProtectedRoutes = ({ children, requiredRole }) => {
    const { user, isLoading, token } = useAuth(); // Get user data and token from AuthProvider

    // If still loading, show a loading state
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>;
    }

    // If no user or token is logged in, redirect to login
    if (!user || !token) {
        console.log("No user or token found, redirecting to login");
        return <Navigate to="/" replace />;
    }

    // Check if user has the required role
    if (requiredRole && user.role !== requiredRole) {
        console.log(`User role ${user.role} doesn't match required role ${requiredRole}`);
        // redirect to appropriate page based on role
        if (user.role === 'user') {
            return <Navigate to="/page" replace />;
        } else if (user.role === 'admin') {
            return <Navigate to="/admin" replace />;
        }
    }

    // If user has the correct role, render the protected content
    return children;
};

export default ProtectedRoutes;
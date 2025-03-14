import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/store/AuthProvider";

const ProtectedRoutes = ({ requiredRole, children }) => {
    const {user} =  useContext(AuthContext)

    if(!user){
        return <Navigate to='/' />
    }


    if(user.role && !requiredRole ){
        return  <Navigate to='/' />
    }

    return children 

    // Check if user has the required role
    /*if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    };

    return user?  <Outlet />: <Navigate to='/' />*/
};

export default ProtectedRoutes;

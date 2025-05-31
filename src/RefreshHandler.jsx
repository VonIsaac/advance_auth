import { useAuth } from "./components/store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const RefreshHandler = () => {
    //const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
  
    useEffect(() => {
      if (isAuthenticated ) {
        navigate('/page', { replace: true });
      }
    }, [ isAuthenticated, navigate]);
  
    return null;
  };
  

export default RefreshHandler;


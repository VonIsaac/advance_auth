import { createContext, useState, useContext, useEffect } from "react";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null); // for handling Cookie
    const [user, setUserDecoded] = useState(null); // for handling user data
     const isAuthenticated = !!token;
    const [isLoading, setIsLoading] = useState(false); // for handling loading state

    useEffect(() => {
        const storedToken = Cookies.get("token") || localStorage.getItem("token");
      
        if (storedToken) {
          setToken(storedToken);
          try {
            const decoded = jwtDecode(storedToken);
            console.log("Decoded Token on load:", decoded);
            //setToken(decoded)
            setUserDecoded(decoded);
          } catch (error) {
            console.error("Error decoding token:", error);
            Cookies.remove("token");
            localStorage.removeItem("token");
            setToken(null);
            setUserDecoded(null);
          }
        }
      
        setIsLoading(false); 
      }, []);

    if(isLoading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

  
    
    return(
        <AuthContext.Provider value={{ userDetails: user, token,  isAuthenticated, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => { 
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider; 
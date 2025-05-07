import { createContext, useState, useContext, useEffect } from "react";
import {  useMutation } from "@tanstack/react-query";
import { postLogIn, queryClient, postSignup, } from "../../utils/http";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null); // for handling Cookie
    const [user, setUser] = useState(null); // for handling user data
    const [isLoading, setIsLoading] = useState(false); // for handling loading state

    useEffect(() => {
        const loadUserToken = () => {
            // stored the token in variable
            const storedToken = Cookies.get("token");
            // perform condition check
            if(storedToken){
                // check if the token is true perform try catch
                try {
                    setIsLoading(true); // set loading to true
                    const userData = jwtDecode(storedToken); // decode the token to get user info
                    console.log("Decoded Token:", userData);
                    setUser(userData); // set the user data
                    setToken(storedToken); // set the token in state

                    //redirect user based on role
                    if(window.location.pathname === '/'){
                        if(userData.role === 'user'){
                            window.location.href = '/page'; // redirect to user page
                        }else if(userData.role === 'admin'){
                            window.location.href = '/admin'; // redirect to admin page   
                        }
                    }
                } catch (error) {
                    console.error("Token decode error:", error);
                    Cookies.remove("token"); // remove the token if error occurs
                    Cookies.remove("role"); // remove the role if error occurs 
                    setToken(null); // set the token to null
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false); 
                const currentPathName = window.location.pathname; // get the current path name
                if(currentPathName !== '/'){ // then check if the current path name is not equal to '/'
                    window.location.href = '/'; // redirect to login page if token is not present
                }
            }
        }; 
        loadUserToken(); // call the function to load user token
    }, []);

    // Mutation for sign-up
    const signUpMutation = useMutation({
        mutationFn: postSignup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signup"] });
        },
    });

    //Login Mutation
    const logInMutation = useMutation({
        mutationFn: postLogIn,
        onSuccess: async (data) => {
            console.log("Login response:", data);
            
            if (!data.token) {
                console.error("No token received");
                return;
            }

            // Set token in state and cookie
            setToken(data.token);
            Cookies.set("token", data.token, {
                expires: 1 / 24, // Expires in 1 hour
                sameSite: "Strict"
            });
            
            try {
                // Decode JWT token
                const decoded = jwtDecode(data.token);
                console.log("Decoded Token:", decoded);
                
                // Set user data
                setUser({
                    id: decoded.id,
                    role: decoded.role,
                    username: data.user?.username
                });
                
                // Wait for state updates to complete
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Redirect user based on role
                if(decoded.role === 'user'){
                    window.location.href = '/page';
                } else if(decoded.role === 'admin'){  
                    window.location.href = '/admin';
                }
                
                // Invalidate user query to trigger a refetch
                queryClient.invalidateQueries({ queryKey: ["user"] });
            } catch (error) {
                console.error("Token decode error:", error);
                alert("Error processing login. Please try again.");
            }
        },
        onError: (error) => {
            alert(`Failed to login: ${error.message}`);
            console.error(error);
        }
    });

    return(
        <AuthContext.Provider value={{ user, isLoading, token, signUpMutation, logInMutation}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => { // Custom hook to use the AuthContext
    return useContext(AuthContext);
}

export default AuthProvider; 
import { createContext,useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postLogIn,queryClient, postSignup, fetchUser } from "../../utils/http";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(Cookies.get("token")) // for handling Cookie

    // fetch user data if token exist 
    const {data: user } = useQuery({
        queryKey: ["fetch-user"],
        queryFn: () => fetchUser(token),
        enabled: !!token,// Fetch only if token exists
    })

    // Mutation for sign-up
    const signUpMutation = useMutation({
        mutationFn: postSignup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signup"] });
        },
    });

    //Loggin Mutation (Moved from Login component)
    const logInMutation = useMutation({
        mutationFn: postLogIn,
        onSuccess: (data) => {
            console.log("Token:", data);
            const token = data;
            const userDetails = jwtDecode(token); // Decode JWT token

            // Store token and role in cookies
            Cookies.set("token", token, { expires: 1 / 24, secure: true, sameSite: "Strict" });
            Cookies.set("role", userDetails.role, { expires: 1 / 24, secure: true, sameSite: "Strict" });

            // Set token state
            setToken(token);

            // Redirect based on role
            if (userDetails.role === "user") {
                window.location.href = "/page";
            } else if (userDetails.role === "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
        },
        onError: (error) => {
            alert("Invalid Credentials");
            console.error(error);
        }
    });

    return(
        <AuthContext.Provider value={{user, signUpMutation, logInMutation}}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };
export default AuthProvider;
import { createContext,useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postLogIn,queryClient, postSignup, fetchUser } from "../../utils/http";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(Cookies.get("token")) // for handling Cookie

    // fetch user data if token exist 
    const { data: user, } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetchUser(token), // Fetch user data using the token
        enabled: !!token, // Only run the query if token exists
        onError: () => {
         Cookies.remove('token')
         queryClient.setQueryData(['user'], null);
        }
 
     });
    // Mutation for sign-up
    const signUpMutation = useMutation({
        mutationFn: postSignup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signup"] });
        },
    });

    //Loggin Mutation (Moved from Login component)
   //Loggin Mutation (Moved from Login component)
   const logInMutation = useMutation({
    mutationFn: postLogIn,
    onSuccess: async (data) => {
       
        console.log("Token:", data);
        const token = data;
        const userRoles = jwtDecode(token); // Decode JWT token   
        if(userRoles.role === 'user'){
            window.location.href = '/page'
        }else{
            window.location.href = '/admin'
        }
        
        setToken(token);
        
        await queryClient.invalidateQueries({ queryKey: ["user"] }); // Ensure user fetches again
        
        // Store token and role in cookies
        //Cookies.set("token", token, );
        //Cookies.set("role", userDetails.role);

        // Set token state 
          // Redirect user based on role
          //  window.location.href = userDetails.role === "user" ? "/page" : "/admin";
    },
    onError: (error) => {
        alert("Invalid Credentials");
        console.error(error);
    }
});



    return(
        <AuthContext.Provider value={{user, token,  signUpMutation, logInMutation}}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };
export default AuthProvider;
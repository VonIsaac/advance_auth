
import { QueryClient } from "@tanstack/react-query";
import API from "./API";
import Cookies from "js-cookie";

export const queryClient = new QueryClient(); // create a new instance of the QueryClient


// for signUp Api
const postSignup = async (data) => {
    console.log("Sending data:", data);
    try{
        const response = await API.post('/signup', data);
        console.log(response);
     
            alert("Account Created");
            return response.data;
       
    }catch(err){
        console.log({
            message: "AN ERROR!!!",
            err: err
        });

        return err;
    }
}


const postLogIn = async (credentials) => {
    try{
        const response = await API.post("/login", credentials);
    
        const {token} = response.data;
        console.log(token)
        Cookies.set("token", token, { 
            expires: 1 / 24, // Expires in 1 hour, secure for HTTPS, and sameSite set to Strict
            secure: true, 
            sameSite: "Strict" 
        });

        console.log(Cookies.get("token")); // Log token to verify it's stored
        return token
        
    }catch(err){ 
        console.log(err);
        return { success: false, message: err.response?.data?.message || "Login failed" };
    }
}

export { postSignup, postLogIn };

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


// handle to logout credentials and cookie
const postLogout = async () => {
    try{
        const response = await API.post('/logout')
        console.log(response)
        Cookies.remove('token'); // Remove from client-side (if stored)

    }catch(err){
        console.log(err )
    }
}


// handle to to recieve an email and to stored a resetToken
const postResetPassword =  async (email) => {
    try{
        const response = await API.post('/reset-password', {email})
        console.log(response.email.message)
        return response.data
    }catch(err) {
        console.log('ERROR', err)
    }
}

const getPassword = async (token) => {
    try{
        const response = await API.get(`/get-password/${token}`)
        console.log(response)
        return response.data
    }catch(err){
        console.log('ERROR', err)
    }
}

const newPassword = async ({ password, token }) => { // Accept an object
    try {
        const response = await API.post('/new-password', { password, token });
        console.log(response);
        return response.data;
    } catch (err) {
        console.log('ERROR', err);
        throw err;
    }
};

export { 
    postSignup, 
    postLogIn, 
    postLogout, 
    postResetPassword ,
    getPassword,
     newPassword
};
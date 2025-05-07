
import { QueryClient } from "@tanstack/react-query";
import API from "./API";
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode'
export const queryClient = new QueryClient(); // create a new instance of the QueryClient


// for signUp Api
const postSignup = async (data) => {
    console.log("Sending data:", data);
    try{
        const response = await API.post('/signup', data);
        console.log(response);
     
            //alert("Account Created");
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
    try {
        const response = await API.post("/login", credentials);
        console.log("Login response:", response.data);
        
        const token = response.data.token; // Make sure this matches your API response structure
        
        if (!token) {
            throw new Error("No token received from server!");
        }
        
        // Store token in cookie
        Cookies.set("token", token, {
            expires: 1 / 24, // Expires in 1 hour
            sameSite: "Strict"
        });
        
        // Decode token to get user info
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        
        // Set role cookie
        Cookies.set('role', decoded.role, {
            expires: 1 / 24,
            secure: true,
            sameSite: 'Strict'
        });
        
        // Return object with token property
        return { token };
        
    } catch (err) {
        console.error("Login error:", err);
        
        if (err.response && err.response.data) {
            throw new Error(err.response.data.message || 'Login failed');
        }
        
        throw err;
    }
}

// handle to logout credentials and cookie
const postLogout = async () => {
    try{
        const response = await API.post('/logout')
        console.log(response)
        Cookies.remove('token'); // Remove from client-side (if stored)
        Cookies.remove('role'); // Remove role cookie

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
        if (err.response && err.response.data) {
            //alert("Invalid Credentials");
            throw new Error(err.response.data.message || ' Change Password failed');
        }

        throw err;
    }
};

// gettting the data to both user and admin
 const getAdminAndUser = async () => {
    try {
      const response = await API.get('/me');
      console.log("User data:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw err;
    }
  };
  


// getting the user data and admin data
 const fetchUser = async () => {
    try {
      const response = await API.get('/user-dashboard');
      console.log("User dashboard data:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching user dashboard:", err);
      throw err;
    }
  };

const fetchAdmin = async () => {
    try{
        const response = await API.get('/admin-dashboard');
        console.log(response.data);
        return response.data; // Return the admin data

    }catch(err){
        console.log(err)
    }
}

export { 
    postSignup, 
    postLogIn, 
    postLogout, 
    postResetPassword ,
    getPassword,
    newPassword,
    fetchAdmin,
    fetchUser,
    getAdminAndUser
};
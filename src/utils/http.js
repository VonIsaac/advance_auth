
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
    try{
        const response = await API.post("/login", credentials);
        if(response.ok){
            console.log(response)
        }
        const {token} = response.data;
        if (!token) throw new Error("No token received from server!");
        console.log(token)
        Cookies.set("token", token, { 
            expires: 1 / 24, // Expires in 1 hour, secure for HTTPS, and sameSite set to Strict
            sameSite: "Strict" 
        });


        const decoded = jwtDecode(token); // use jwt-decode to decode the token
        console.log("Decoded Token:", decoded);

        // set the role 
        Cookies.set('role', decoded.role,{
            expires: 1 / 24,
            secure: true,
            sameSite: 'Strict'
        })

        Cookies.set('role', decoded.role, { expires: 1 / 24, sameSite: 'Strict' });
        return token
        
    }catch(err){ 
        console.log(err);
        //return { success: false, message: err.response?.data?.message || "Login failed" };
        //check if credentials is invalid
        if (err.response && err.response.data) {
            //alert("Invalid Credentials");
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


// for fetch the admin and user

const fetchAdmin = async () => {
    try{
        const response = await API.get('/admin')
        console.log(response.data)
    }catch(err){
        console.log(err)
    }
}

/*const fetchUser = async () => {
    try {
         const token = Cookies.get('token') // get the token 
        const response = await API.get('/user', {
            headers: {
                Authorization: `Bearer ${token}` // Attach token to request
            }
        });
        console.log(response.data);
    } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
            //alert("Invalid Credentials");
            throw new Error(err.response.data.message || ' Change Password failed');
        }

        throw err;
    }
};*/

const fetchUser = async (token) => {
    try{
        const response = await API.get('/fetch-user', {
            headers: { Authorization: `Bearer ${token}` },
        } ) 
        if (!response.ok) throw new Error('Failed to fetch user');
            const data = await response.data
            return data 
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

};
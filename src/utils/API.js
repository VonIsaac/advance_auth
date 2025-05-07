import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // Allows cookies to be sent
});

// Request interceptor
API.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        console.log("Token being sent:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error("Network error - Is the server running?");
        }
        return Promise.reject(error);
    }
);

export default API;

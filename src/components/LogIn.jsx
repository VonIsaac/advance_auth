import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postLogIn, queryClient } from "../utils/http"; // Adjust the import path as necessary
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

// Create a custom theme with new colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1', // Indigo color
    },
    secondary: {
      main: '#8B5CF6', // Purple color
    },
    background: {
      default: '#F3F4F6',
    },
  },
});

const LogIn = () => {
    //const { logInMutation } = useAuth();
    const [isCredentials, setIsCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    //const {token} = useAuth();
    const location = useLocation();

    const { mutate, isLoading,  } = useMutation({
        mutationFn: postLogIn,
        onSuccess: (data) => {
            const token = data.token;
            //  to persist the token in cookies and localStorage]
         
            // Store token in both cookie and localStorage for redundancy
            Cookies.set("token", token, { expires: 7 });
            localStorage.setItem("token", token);
            //localStorage.setItem("keepLoggedIn", JSON.stringify(true))
            const decoded = jwtDecode(token);
            console.log("Decoded Token:", decoded);
    
             // Prevent visiting "/" (login page) if the user is authenticated

            if(location.pathname === '/login'){
                if (decoded.role === 'admin') {
                    navigate('/admin', { replace: true });
                } else {
                    navigate('/page', { replace: true });
                }
            }
            queryClient.invalidateQueries(['get-user']); // Invalidate user data query
          
        },
        onError: (error) => {
            console.error("Login failed:", error);
            // You might want to show an error message to the user here
        }
    });

  

    const handleChange = (e) => {
        setIsCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        mutate(isCredentials);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col justify-center items-center h-screen border-2">
                <form onSubmit={handleLogin} className="rounded-2xl border-none h-[355px] w-[350px] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                    <h1 className="text-center text-3xl my-8 font-bold tracking-wide text-white">Log In</h1>
                    <div className="flex flex-col justify-center items-center m-2.5">
                        <div className="m-3">
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={isCredentials.email}
                                onChange={handleChange}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        '&.Mui-focused fieldset': { borderColor: '#F0ABFC' },
                                        fieldset: { borderColor: '#F0ABFC' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-input': { color: 'white' }
                                }}
                            />
                        </div>
                        <div className="m-3">
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                name="password"
                                value={isCredentials.password}
                                onChange={handleChange}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        '&.Mui-focused fieldset': { borderColor: '#F0ABFC' },
                                        fieldset: { borderColor: '#F0ABFC' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-input': { color: 'white' }
                                }}
                            />
                        </div>
                        <div className="m-3">
                            <Button 
                                variant="contained" 
                                disableElevation 
                                type="submit"
                                sx={{ 
                                    backgroundColor: '#F0ABFC', // Light purple/pink
                                    color: '#4C1D95', // Deep purple for text
                                    '&:hover': {
                                        backgroundColor: '#E879F9',
                                    },
                                }}
                            >
                                {isLoading ? "Logging in..." : "Log In"}
                            </Button>
                        </div>
                        <p className="tracking-wide text-base/6 text-white">
                            Enter your details to <Link to="/signup" className="text-indigo-200 font-semibold hover:text-white">sign up</Link> or <Link to="/reset-email" className="text-indigo-200 font-semibold hover:text-white">recover</Link>
                        </p>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
};

export default LogIn;
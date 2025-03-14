
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import { useState,  useContext } from "react";
//import { jwtDecode } from "jwt-decode";
import ResponsiveDialog from "./UI/Dialog";

import { AuthContext } from "./store/AuthProvider";
const LogIn = () => {
    const { logInMutation } = useContext(AuthContext); // Use logInMutation from AuthContext
    const [isCredentials, setIsCredentials] = useState({ email: "", password: "" });
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setIsCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        logInMutation.mutate(isCredentials); // Call the mutation
        setOpen(true); // Open success dialog
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen border-2">
            <ResponsiveDialog  onClose={handleCloseDialog} />
            <form onSubmit={handleLogin} className="border-2 rounded-2xl border-none h-[355px] w-[350px] bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-center text-3xl my-8 font-bold tracking-wide">Log In</h1>
                <div className="flex flex-col justify-center items-center m-2.5">
                    <div className="m-3">
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={isCredentials.email}
                            onChange={handleChange}
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
                        />
                    </div>
                    <div className="m-3">
                        <Button variant="contained" disableElevation type="submit">
                            {logInMutation.isPending ? "Logging in..." : "Log in"}
                        </Button>
                    </div>
                    <p className="tracking-wide text-base/6">
                        Enter your details to <Link to="/signup" className="text-blue-700 font-semibold">sign up</Link> or <Link to="/reset-email" className="text-blue-700 font-semibold">recover</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LogIn;

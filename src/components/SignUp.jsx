import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { postSignup, queryClient } from "../utils/http";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";
const SignUp = () => {

   const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    // handle snackbar 
    const [openBar, setOpenBar] = useState(false)
    // handle the snacbar text
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const formDatas = {
        email: formData.email || "",  // Ensure it’s never undefined
        password: formData.password || "",
        confirmPassword: formData.confirmPassword || ""
   };
    
    const {mutate, isPending} = useMutation({
        mutationFn: postSignup,
        onSuccess: (data) => {
            console.log(data)
            navigate('../') // navigate to log in if succesfuly
            alert("Acount Created")
            queryClient.invalidateQueries({queryKey: ["signup"]});
            setFormData({ email: "", password: "", confirmPassword: "" }); // clear the form data after a successful sign up  
        },
        onError: (error) => {
            alert("NOT CREATED!!!")
            console.error(error);
        }
    })


    const handleChange = (e) => {
        setFormData({
            // spread the existing data and use object key 
            ...formData, 
            [e.target.name]: e.target.value  
        }); // 
    };

    
    // create a function to handle the form data
    const handleSignUp = (e) => {
        e.preventDefault();
        //check if email is a valid gmail address and password are match
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(formData.email)) {
            setSnackbarMessage("Please enter a valid gmail address (e.g @gmail.com)")
            setOpenBar(true)
            return;
        }else if(formData.password !== formData.confirmPassword){
            setSnackbarMessage("Password did not match")
            setOpenBar(true) 
            return
        }
        // get the form data
        mutate(formDatas);

    }
    
    const handleCloseBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }

          setOpenBar(false)
    }

    const action = ( // this is the action for the snackbar
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="error"
            onClick={handleCloseBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    

    return (
        <div  className="flex flex-col justify-center items-center h-screen border-2">
            <Snackbar
                open={openBar}
                autoHideDuration={6000}
                onClose={handleCloseBar}
                message= {snackbarMessage}
                action={action}
                color="error"
            />
        <form onSubmit={handleSignUp} action="" className="border-2 rounded-2xl border-none h-[400px] w-[350px] bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-center text-3xl my-8 font-bold tracking-wide">Sign Up</h1>
            <div className="flex flex-col justify-center items-center m-2.5">
               <div className="m-3">
                   <TextField 
                        id="outlined-basic" 
                        label="Email" variant="outlined"
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        required
                    />
               </div>

               <div  className="m-3">
                   <TextField 
                    id="outlined-password-input" 
                    label="Password" type="password" 
                    autoComplete="current-password"  
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                   />
               </div>

               <div  className="m-3">
                   <TextField 
                    id="outlined-password-input"  
                    label="Confirm Password" 
                    type="password" 
                    autoComplete="current-password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                   />
               </div>
               <div  className="m-3 tracking-wide">
                    <Button variant="contained" type="submit" disableElevation> 
                        {isPending ? "Signing in....": "Sign in"}
                    </Button>
               </div>
            </div>
            
       </form>
      </div>
    );
}

export default SignUp;
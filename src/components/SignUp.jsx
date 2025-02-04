import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { postSignup, queryClient } from "../utils/http";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
//use the useState hook to create a state variable for the form data

const SignUp = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const formDatas = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
    }
    
    const {mutate, isPending} = useMutation({
    
        mutationFn: postSignup,
        onSuccess: () => {
            alert("Acount Created")
            queryClient.invalidateQueries("signup");
            setFormData({ email: "", password: "", confirmPassword: "" }); // clear the form data after a successful sign up
        },
        onError: (error) => {
            alert("NOT CREATED!!!")
            console.log(error);
        }
    })


    const handleChange = (e) => {
        setFormData({ formDatas, [e.target.name]: e.target.value }); // 
    };

    
    // create a function to handle the form data
    const handleSignUp = (e) => {
        e.preventDefault();
        // get the form data
        mutate(formDatas);
    }
    

    return (
        <div  className="flex flex-col justify-center items-center h-screen border-2">
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
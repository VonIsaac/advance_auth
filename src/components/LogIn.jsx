
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { postLogIn, queryClient } from "../utils/http";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LogIn = () => {

    const navigate = useNavigate()

    const [isCredentials, setIsCredentials] = useState({
        email: "",
        password: ""
    })
    // handling snacbar
    const [openBar, setOpenBar] = useState(false)
    

    const formData = {
        email: isCredentials.email,
        password: isCredentials.password
    }

    const {mutate, isPending} = useMutation({
        mutationFn: postLogIn,
        onSuccess: (data) => {
            /*if(isCredentials.password || isCredentials.email){
                alert("WRONG CREDENTIALS")
            }*/
            //check if wee enter valid credentials
            if(data){
                navigate('/page')
                console.log("Token:", data);
                queryClient.invalidateQueries({queryKey: ["login"]});
                setOpenBar(true)
                
            }
        },
        onError: (error) => {
            alert("DID NOT LOG IN") 
            console.log(error);
           
        }
    })

    // handle the subimit
    const handleLogin = (e) => {
        e.preventDefault()
            
        mutate(formData)
    }   

    
    const handleCloseBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }

          setOpenBar(false)
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    

    return(
       <div  className="flex flex-col justify-center items-center h-screen border-2">
         <form onSubmit={handleLogin} action="" className="border-2 rounded-2xl border-none h-[355px] w-[350px] bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
           <h1 className="text-center text-3xl my-8 font-bold tracking-wide">Log In</h1>
             <div className="flex flex-col justify-center items-center m-2.5">
                <div className="m-3">
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        name="email"
                        value={isCredentials.email}
                        onChange={e => setIsCredentials(prev => ({
                                ...prev, 
                                [e.target.name]: e.target.value 
                            }))}
                        />
                </div>


                <div  className="m-3">
                    <TextField 
                        id="outlined-password-input" 
                        label="Password" 
                        type="password" 
                        autoComplete="current-password" 
                        name="password" 
                        value={isCredentials.password}
                        onChange={e => setIsCredentials(prev => ({
                                ...prev, 
                                [e.target.name]: e.target.value 
                        }))}

                       
                    />
                     
                </div>

                <div  className="m-3">
                    <Button variant="contained" disableElevation type="submit"> 
                        {isPending ? "Login inn...": "Log in "}
                    </Button>
                    <Snackbar
                        open={openBar}
                        autoHideDuration={6000}
                        onClose={handleCloseBar}
                        message=  "Login Succesfully"
                        action={action}
                    />
                </div>
                <p className=" tracking-wide text-base/6">
                    Enter your details to  <Link to ="/signup" className=" text-blue-700 font-semibold">sign </Link> 
                     or <Link to= "/reset-email" className=" text-blue-700  font-semibold">recover</Link>
                </p>
             </div>
             
        </form>
       </div>
    )

}

export default LogIn;


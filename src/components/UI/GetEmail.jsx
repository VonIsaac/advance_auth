import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ResetForm from "../Reset";
import { postResetPassword, queryClient } from "../../utils/http";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie";
const GetEmail = () => {
    const navigate = useNavigate()
    const [resetEmail, isResetEmail] = useState("")

    //const resetToken = Cookies.get('token')
    const { mutate, isPending } = useMutation({
        mutationFn: postResetPassword,
        onSuccess: (data) => {
            // Extract the token from the response
            const resetToken = data.token; 
    
            if (!resetToken) {
                alert("No token received. Please try again.");
                return;
            }
            alert(`RESET PASSWORD SUCCESSFULLY: ${data.message}`);
    
            setTimeout(() => {
                navigate(`/new-password/${resetToken}`);
            }, 100);
            
            
            queryClient.invalidateQueries({ queryKey: ['reset-email'] });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleResetPassword = (e) => {
        e.preventDefault();
       // navigate(`/new-password/${resetToken}`);
        mutate(resetEmail)

    }

    return(
        <ResetForm onSubmit = {handleResetPassword}>
            <h1 className="text-center text-3xl my-8 font-bold tracking-wide">Reset Email</h1>
            <div className="flex flex-col justify-center items-center m-2.5">
                <div className="m-3">
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined"
                        name="email" 
                        className="" 
                        value={resetEmail} 
                        onChange={e => isResetEmail(e.target.value)}
                        required
                    />
                </div>
                <div  className="m-3">
                    <Button variant="contained" type="submit" disableElevation>
                         {isPending ? "Sending Email....": "Send Email"}
                    </Button>
                </div>
            </div>
        </ResetForm>
    )
}

export default GetEmail;
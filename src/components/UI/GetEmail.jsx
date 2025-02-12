import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ResetForm from "../Reset";
import { postResetPassword, queryClient } from "../../utils/http";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const GetEmail = () => {
    const navigate = useNavigate()
    const [resetEmail, isResetEmail] = useState("")


    const {mutate, isPending} = useMutation({
        mutationFn: postResetPassword,
        onSuccess: (data) => {
            console.log(data.message);
            navigate('/new-password')
            alert(`RESET PASSWORD SUCCESFULLY ${data.message}`)
            queryClient.invalidateQueries({queryKey: ['reset-password']})
        },
        onError: (error) => {
            console.log(Error)
            alert(error.message);
          },
    })


    const handleResetPassword = (e) => {
        e.preventDefault();
        mutate(resetEmail)

    }

    return(
        <ResetForm onSubmit = {handleResetPassword}>
            <h1 className="text-center text-3xl my-8 font-bold tracking-wide">Reset Password</h1>
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
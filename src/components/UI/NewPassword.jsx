import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ResetForm from "../Reset";
import { useMutation} from "@tanstack/react-query";
//import { newPassword, queryClient} from "../../utils/http";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { getPassword, newPassword, queryClient } from "../../utils/http";
const NewPassword = () => {
    const navigate = useNavigate();
    const {token} = useParams()
    const [password, setPassword] = useState("");


    // handling the get password
    useEffect(() => {
        console.log("Token from useParams:", token);
        if (!token) {
            return; // Prevent API call if token is missing
        }
        const fetchPassword = async () => {
            try {
                const data = await getPassword(token);
                console.log("Response from server:", data);
            } catch (error) {
                console.error("Error fetching password:", error);
            }
        };
        fetchPassword();
    }, [token]);
    
    // handling the new password 
    const {mutate, isPending} = useMutation({
        mutationFn: newPassword,
        onSuccess: (data) => {  
            console.log(data)
            //navigate  to the login page
            navigate('../')
            alert('Password Reset Successful')
            queryClient.invalidateQueries(['get-password', token])
        },
        onError: (error) => {
            console.error(error)
            alert('Password Reset Failed')
        }
    })

    // handle the form data
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({password, token})
    }

   
    return(

        <ResetForm onSubmit={handleSubmit}>
            <h1 className="text-center text-3xl my-8 font-bold tracking-wide">New Password</h1>
            <div className="flex flex-col justify-center items-center m-2.5">
                <div className="m-3">
                    <TextField 
                        id="outlined-password-input"  
                        label="Confirm Password" 
                        type="password" 
                        autoComplete="current-password" 
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div  className="m-3">
                    <Button variant="contained" disableElevation type="submit"> 
                       {isPending ? "Resetting Pasword...": " Reset Password "}
                    </Button>
                </div>
            </div>
        </ResetForm>
    )
}

export default NewPassword;
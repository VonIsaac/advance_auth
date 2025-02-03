import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ResetForm from "../Reset";
const NewPassword = () => {
    return(

        <ResetForm>
            <h1 className="text-center text-3xl my-8 font-bold tracking-wide">New Password</h1>
            <div className="flex flex-col justify-center items-center m-2.5">
                <div className="m-3">
                    <TextField id="outlined-password-input"  label="Confirm Password" type="password" autoComplete="current-password" />
                </div>
                <div  className="m-3">
                    <Button variant="contained" disableElevation> Reset Password </Button>
                </div>
            </div>
        </ResetForm>
    )
}

export default NewPassword;
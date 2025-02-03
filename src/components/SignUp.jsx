import { TextField } from "@mui/material";
import Button from '@mui/material/Button';

const SignUp = () => {
    return (
        <div  className="flex flex-col justify-center items-center h-screen border-2">
        <form action="" className="border-2 rounded-2xl border-none h-[400px] w-[350px] bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-center text-3xl my-8 font-bold tracking-wide">Sign Up</h1>
            <div className="flex flex-col justify-center items-center m-2.5">
               <div className="m-3">
                   <TextField id="outlined-basic" label="Email" variant="outlined" className=""/>
               </div>

               <div  className="m-3">
                   <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
               </div>

               <div  className="m-3">
                   <TextField id="outlined-password-input"  label="Confirm Password" type="password" autoComplete="current-password" />
               </div>
               <div  className="m-3 tracking-wide">
                    <Button variant="contained" disableElevation> Sign Up </Button>
               </div>
            </div>
            
       </form>
      </div>
    );
}

export default SignUp;

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postLogout, fetchUser, queryClient} from '../utils/http';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './store/AuthProvider';
import { useEffect } from 'react';
//import { useEffect } from 'react';

const Page = () => {
    const {user} = useAuth();
    const navigate = useNavigate()
    const {mutate, isPending} = useMutation({
        mutationFn: postLogout, 
        onSuccess: (data) => {
            queryClient.invalidateQueries('logout')
            console.log(data)
            navigate('../')
        }
    })


    const handleLogout = ( ) => {
        mutate()
    }

   

    return (
        <>
          <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='success' >
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="default" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            USERS
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <main className=' text-white flex justify-center items-center h-screen' >
                <div className=' p-5 rounded-sm'>
                    <div className=' text-center tracking-wide text-base/6'>
                        <h1 className='text-5xl font-bold tracking-wider mb-2.5'>
                            Welcome to the User&apos;s Page: {user.username}  
                        </h1>
                        <p className=' font-medium mb-2.5'>
                            This page is for user pages, if wee log in the users creadentials wee redirect in this page&apos;s.
                        </p>
                        <p className="font-medium mb-2.5">
                            Role:{user.role}
                        </p>
                        <Button variant="contained" disableElevation onClick={handleLogout}>
                            {isPending ? 'Logging out...' : 'Logout Credentials'}
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Page;
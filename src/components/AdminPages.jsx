
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postLogout, queryClient } from '../utils/http';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './store/AuthProvider';
import { useContext } from 'react';
import { fetchAdmin } from '../utils/http';

const AdminPage = () => {
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)

    const {data: admin} = useQuery({
        queryKey: ['admin'], 
        queryFn: () => fetchAdmin(token),
        enabled: !!token, // Only fetch if token exists
    }) 


     
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
                <AppBar position="static" color='warning' >
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="default" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            ADMIN
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <main className=' text-white flex justify-center items-center h-screen' >
                <div className=' p-5 rounded-sm'>
                    <div className=' text-center tracking-wide text-base/6'>
                        <h1 className='text-5xl font-bold tracking-wider mb-2.5'>Welcome to the Admin Page&apos;s </h1>
                        <p className=' font-medium mb-2.5'>
                            This page is for admin pages, if wee log in the admin creadentials wee redirect in this page&apos;s.
                        </p>
                        <p>
                            {admin?.msg}
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

export default AdminPage;
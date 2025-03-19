
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link  } from 'react-router-dom';
//import Button from '@mui/material/Button';

//import { useNavigate } from 'react-router-dom';
//import { useEffect } from 'react';

const LandingPage = () => {
   // const navigate = useNavigate()
    
  

    let cssClasses = ' text-zinc-400 font-semibold text-xl tracking-wider hover:underline decoration-1' 
    return (
        <>
          <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="default" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                          HOME PAGE
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <main className=' text-white flex justify-center items-center h-screen' >
                <div className=' p-5 rounded-sm'>
                    <div className=' text-center tracking-wide text-base/6'>
                        <h1 className='text-5xl font-bold tracking-wider mb-2.5'>Welcome to the Home&apos;s Page </h1>
                        <p className=' font-medium mb-2.5'>
                            This page is for user pages, if wee log in the users creadentials wee redirect in this page&apos;s. 
                        </p>
                        <ul> 
                            <li className= {cssClasses}> 
                               <Link to= "/page">
                                    User&apos;s Pages
                               </Link>
                            </li>
                            <li className={cssClasses}>
                               <Link to ="/admin"> Admin&apos;s Pages</Link>
                            </li>
                            <li className={cssClasses}>
                                Admin&apos;s and  User&apos;s Pages
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}

export default LandingPage;
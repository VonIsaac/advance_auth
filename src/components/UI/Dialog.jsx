import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function ResponsiveDialog({open, onClose}) {
  //const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/page')
    }
 

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        className=''
      >
        <DialogContent className=' bg-stone-700 '>
          <DialogContentText>
          <h1 className=' text-slate-300 mb-2 text-2xl font-bold text-center'>Login successful! Enjoy your experience.</h1>
            <p className=' text-slate-300 mb-2  tracking-wide text-base/6'>
              Login successful! You&apos;re now signed in—explore, connect, and enjoy
              your experience.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions className=' bg-stone-700 '>
          <Button onClick={handleSubmit } color='info'  autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

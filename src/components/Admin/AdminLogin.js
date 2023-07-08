import React, { useRef, useState } from 'react';
import { Card, Button, FormControl, Alert, InputLabel, Input, Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Link } from 'react-router-dom';
import Axios from 'axios';
import darkLogin from '../../assets/darkLogin.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setAdminLogin } from '../../state';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import e from 'cors';
import Lord_Voldemort from '../../assets/Lord_Voldemort.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7D1702',
    },
  },
});

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let loadingToastId = toast.info('Unraveling Enchantments...', { autoClose: 1000 });
      const response = await Axios.post('http://localhost:5000/auth/admin/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      
      if (error.message) {
        toast.success('Login successful', { id: loadingToastId, autoClose: 3000 });
        setError("Username or password didn't match");
        setError(response.data.error);
        console.log(response.data.error);
        loadingToastId = toast.update(loadingToastId, { render: 'Lets Blog It', type: 'success', isLoading: false, autoClose: 1000 });
      } else {
        dispatch(setAdminLogin({ user: response.data.isUser, token: response.data.token, isAdmin: response.data.isAdmin }));
        toast.success('Unlocking the Chamber...', { id: loadingToastId, autoClose: 3000 });
        setTimeout(() => {
          navigate('/admin');
        }, 4000);
      }
    } catch (error) {
      toast.error('Spell misfired!', {autoClose: 3000 })
      setError("Username or password didn't match");
    }

    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: `url(${darkLogin})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <h2 className="text-center mb-4" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem', fontWeight: 'bold' }}>Accio Account!</h2>
      <p className='text-center mb-4' style={{ maxWidth: '430px', fontSize: '1.2rem', fontWeight: '400' }}>Prepare to be spellbound by the enchanting world of Quidditch. Are you ready for the magic? Join now and embark on a magical journey!</p>
      <Card style={{ height: '490px', padding: '20px', borderRadius: '15px', maxWidth: '500px', boxShadow: '6px 6px 9px 12px rgba(0,0,0,0.6)', background: 'transparent' }}>
      {error && 
      <div style={{display:"grid",gridTemplateColumns:"auto auto", maxWidth:"480px", columnGap:"96px", background:"white", height:"56px", boxShadow:"6px 6px 6px 6px rgba(0,0,0,0.4)"}}>
          <Alert severity="error" style={{ marginBottom: "20px", height:"56px", background:"white" }}>{error} </Alert>
          <img style={{ height:"55px"}} src={Lord_Voldemort} alt="Lord Voldemort" />
        </div>}
        <form onSubmit={login}>
          <FormControl sx={{ width: '100%', marginBottom: '45px', marginTop: '45px' }}>
            <InputLabel htmlFor="email">Wizard Mail</InputLabel>
            <Input type="email" id="email" inputRef={emailRef} required />
          </FormControl>
          <FormControl sx={{ width: '100%', marginBottom: '45px' }}>
            <InputLabel htmlFor="password">Potion Password</InputLabel>
            <Input type="password" id="password" inputRef={passwordRef} required />
          </FormControl>
          <Button
              variant="contained"
              type="submit"
              sx={{
                width: '100%',
                marginBottom: '40px',
                height: '45px',
                borderRadius: '18px',
                background: '#7D1702', 
                color: 'white',
                '&:hover': {
                  background: '#6D1402',
                },
              }}
            >
            Alohomora!
          </Button>
        </form>
        <div className="w-100 text-center mt-3" style={{ marginBottom: '10px' }}>
          <MuiLink component={Link} to="/forgotpassword" style={{color:"white"}}>
            Forgetful Charm?
          </MuiLink>
        </div>
        <div className="w-100 text-center mt-2">
          Muggle? <MuiLink component={Link} to="/admin/register" style={{color:"white"}}>Enroll as a Wizard</MuiLink>
        </div>
      </Card>
    </ThemeProvider>
    </div>
  );
}
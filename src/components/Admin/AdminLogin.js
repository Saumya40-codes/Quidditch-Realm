import React, { useRef, useState } from 'react';
import { Card, Button, FormControl, Alert, InputLabel, Input, Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import {  Link } from 'react-router-dom';
import Axios from 'axios';
import darkLogin from '../../assets/darkLogin.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Lord_Voldemort from '../../assets/Lord_Voldemort.jpg';
import tenor from '../../assets/tenor.gif';
import { faBroomBall } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let loadingToastId = toast.info(
        <div>
          Unraveling Enchantments...
          <img src={tenor} alt="Unraveling Enchantments" style={{width:"30px", height:"20px"}} />
        </div>,
        { autoClose: 1900 }
      );
      const response = await Axios.post('http://localhost:5000/auth/admin/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      
      if (error.message) {
        console.log(response.data.error);
      } else {
        dispatch(setLogin({user: response.data.isUser, token: response.data.token, isAdmin: response.data.isAdmin, id: response.data.userId }));
        toast.success(
          <div>
          Unlocking the Chamber...
          <FontAwesomeIcon icon={faBroomBall} flip />
          </div>, 
          { id: loadingToastId, autoClose: 2000 
          });
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      }
    } catch (error) {
      toast.error('Spell misfired!', {autoClose: 2000 })
      setError("Username or password didn't match");
    }

    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: `url(${darkLogin})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Accio Account!
        </h2>
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
          <MuiLink component={Link} to="/admin/forgotpassword" style={{color:"white"}}>
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
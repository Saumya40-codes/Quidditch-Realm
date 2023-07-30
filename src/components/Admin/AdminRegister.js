import React, { useRef, useState } from 'react';
import { Card, FormControl, InputLabel, Input, Button, Alert, CardContent, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import Axios from 'axios';
import darkLogin from '../../assets/darkLogin.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lord_Voldemort from '../../assets/Lord_Voldemort.jpg';
import tenor from '../../assets/tenor.gif';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7D1702',
    },
  },
});

const SignUp = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();

  const [error, setError] = useState('');

  const signUp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    if(usernameRef.current.value.length < 3){
      return setError('Username must be atleast 3 characters long');
    }


    let loadingToastId = toast.info(
      <div>
        Brewing Magic...
        <img src={tenor} alt="Unraveling Enchantments" style={{width:"30px", height:"20px"}} />
      </div>,
      { autoClose: 1900 }
    );
    try {
    const response = await Axios.post('http://localhost:5000/auth/admin/register', {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
      toast.success('Crafting Your Wizard Profile...', { id: loadingToastId, autoClose: 2000 });
      setTimeout(() => {
        navigate('/admin/login');
        toast.success('One step away, please login with your credentials', { autoClose: 2000 });
      }, 2000);
    } catch(error) {
       if(error.message === "Username must be atleast 3 characters long"){
        toast.error('Spell misfired!', { id: loadingToastId, autoClose: 2000 })
        setError("Username or password might already exist");
      }
      else{
        console.log(error);
        toast.error('Spell misfired!', { id: loadingToastId, autoClose: 2000 })
        setError("Username or password might already exist");
      }
    }
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
          Begin your Quidditch quest!
        </h2>
      <Card style={{ maxWidth: "470px", background: "transparent", boxShadow: "9px 6px 6px 12px rgba(0,0,0,0.5)", borderRadius: "20px" }}>
        <CardContent>
        {error && 
        <div style={{display:"grid",gridTemplateColumns:"auto auto", maxWidth:"400px", background:"white", height:"56px", marginBottom:"20px", boxShadow:"6px 6px 6px 6px rgba(0,0,0,0.4)" }}>
          <Alert severity="error" style={{ marginBottom: "20px", height:"56px",background:"white", maxWidth:"364" }}>{error} </Alert>
          <img style={{ height:"55px"}} src={Lord_Voldemort} alt="Lord Voldemort" />
        </div> }
          <form onSubmit={signUp}>
            <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input type="email" id="email" inputRef={emailRef} required />
            </FormControl>
            <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input type="username" id="username" inputRef={usernameRef} required />
            </FormControl>
            <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input type="password" id="password" inputRef={passwordRef} required />
            </FormControl>
            <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
              <InputLabel htmlFor="password-confirm">Password Confirmation</InputLabel>
              <Input type="password" id="password-confirm" inputRef={passwordConfirmRef} required />
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
              Registed for the World of Quidditch!
            </Button>
          </form>
        </CardContent>
        <div className="w-100 text-center mt-2">
          Are you returning wizard? <MuiLink component={Link} to="/admin/login" style={{color:"white"}}>Open the Portkey!</MuiLink>
        </div>
      </Card>
      </ThemeProvider>
    </div>
  );
};

export default SignUp;

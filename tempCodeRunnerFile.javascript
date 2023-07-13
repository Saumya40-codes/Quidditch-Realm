import React, { useRef, useState } from 'react';
import {
  Card,
  Button,
  FormControl,
  Alert,
  InputLabel,
  Input,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate } from 'react-router-dom';
import LordVoldemort from '../assets/Lord_Voldemort.jpg';
import DarkLoginBackground from '../assets/darkLogin.jpg';
import { Link } from 'react-router-dom';
import Axios from 'axios';

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
      const response = await Axios.post('http://localhost:5000/auth/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (response.data.error) {
        toast.success('Login successful', { id: loadingToastId, autoClose: 3000 });
        setError("Username or password didn't match");
        setError(response.data.error);
        console.log(response.data.error);
        loadingToastId = toast.update(loadingToastId, {
          render: 'Lets Blog It',
          type: 'success',
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        dispatch(setLogin({ user: response.data.user, token: response.data.token }));
        toast.success('Unlocking the Chamber...', { id: loadingToastId, autoClose: 3000 });
        setTimeout(() => {
          navigate('/dashboard');
        }, 4000);
      }
    } catch (error) {
      toast.error('Spell misfired!', { autoClose: 3000 });
      setError("Username or password didn't match");
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundImage: `url(${DarkLoginBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <ToastContainer />
        <Typography
          variant="h4"
          align="center"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            margin: '1rem',
          }}
        >
          Accio Account!
        </Typography>

        <Card
          style={{
            height: '490px',
            padding: '20px',
            borderRadius: '15px',
            maxWidth: '500px',
            boxShadow: '6px 6px 9px 12px rgba(0, 0, 0, 0.6)',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                height: '56px',
                boxShadow: '6px 6px 6px 6px rgba(0, 0, 0, 0.4)',
                padding: '0 1rem',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Alert severity="error" style={{ marginBottom: '20px', height: '56px', background: 'white' }}>
                {error}
              </Alert>
              <img style={{ height: '55px' }} src={LordVoldemort} alt="Lord Voldemort" />
            </div>
          )}

          <form onSubmit={login} style={{ width: '100%' }}>
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="email">Wizard Mail</InputLabel>
              <Input type="email" id="email" inputRef={emailRef} required />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="password">Potion Password</InputLabel>
              <Input type="password" id="password" inputRef={passwordRef} required />
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                marginBottom: '1rem',
                height: '45px',
                borderRadius: '18px',
                background: '#7D1702',
                color: 'white',
                '&:hover': {
                  background: '#6D1402',
                },
              }}
            >
              {loading ? 'Loading...' : 'Alohomora!'}
            </Button>
          </form>

          <Typography variant="body2" component="div" align="center" style={{ marginBottom: '10px' }}>
            <MuiLink component={Link} to="/forgotpassword" style={{ color: 'white' }}>
              Forgetful Charm?
            </MuiLink>
          </Typography>

          <Typography variant="body2" component="div" align="center">
            Muggle? <MuiLink component={Link} to="/signup" style={{ color: 'white' }}>Enroll as a Wizard</MuiLink>
          </Typography>
        </Card>
      </div>
    </ThemeProvider>
  );
}

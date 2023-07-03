import React, { useRef, useState } from 'react';
import { Card, Button, FormControl, InputLabel, Input, Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Link } from 'react-router-dom';
import Axios from 'axios';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import darkLogin from '../assets/darkLogin.jpg';
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate } from 'react-router-dom';

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
    try {
      setError('');
      setLoading(true);
      const response = await Axios.post('http://localhost:5000/auth/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        dispatch(setLogin({ user: response.data.user, token: response.data.token }));
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: `url(${darkLogin})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <ToastContainer />
      <h2 className="text-center mb-4" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem', fontWeight: 'bold' }}>Accio Account!</h2>
      <p className='text-center mb-4' style={{ maxWidth: '430px', fontSize: '1.2rem', fontWeight: '400' }}>Prepare to be spellbound by the enchanting world of Quidditch. Are you ready for the magic? Join now and embark on a magical journey!</p>
      <Card style={{ height: '490px', padding: '20px', borderRadius: '15px', maxWidth: '500px', boxShadow: '6px 6px 9px 12px rgba(0,0,0,0.6)', background: 'transparent' }}>
        <form onSubmit={login}>
          <FormControl sx={{ width: '100%', marginBottom: '45px', marginTop: '45px' }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input type="email" id="email" inputRef={emailRef} required />
          </FormControl>
          <FormControl sx={{ width: '100%', marginBottom: '45px' }}>
            <InputLabel htmlFor="password">Potion Password</InputLabel>
            <Input type="password" id="password" inputRef={passwordRef} required />
          </FormControl>
          <Button disabled={loading} variant="contained" type="submit" sx={{ width: '100%', marginBottom: '40px', height: '45px', borderRadius: '18px' }}>
            Alohomora!
          </Button>
        </form>
        <div className="w-100 text-center mt-3" style={{ marginBottom: '10px' }}>
          <MuiLink component={Link} to="/forgotpassword">
            Forgetful Charm?
          </MuiLink>
        </div>
        <div className="w-100 text-center mt-2">
          Muggle? <MuiLink component={Link} to="/signup">Enroll as a Wizard</MuiLink>
        </div>
      </Card>
    </div>
  );
}

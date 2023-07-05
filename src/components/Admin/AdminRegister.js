import React, { useRef, useState } from 'react';
import { Card, FormControl, InputLabel, Input, Button, Alert, CardContent, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import darkLogin from '../../assets/darkLogin.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lord_Voldemort from '../../assets/Lord_Voldemort.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const signUp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    if(usernameRef.current.value.length < 3){
      return setError('Username must be atleast 3 characters long');
    }


    let loadingToast = toast.info('Brewing Magic...', { autoClose: 1000 });
    try {
    const response = await Axios.post('http://localhost:5000/auth/admin/register', {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
      toast.success('Crafting Your Wizard Profile...', { id: loadingToast, autoClose: 3000 });
      setTimeout(() => {
        navigate('/admin/login');
        toast.success('One step away, please login with your credentials', { autoClose: 3000 });
      }, 5000);
    } catch(error) {
       if(error.message == "Username must be atleast 3 characters long"){
        toast.error('Spell misfired!', { id: loadingToast, autoClose: 3000 })
        setError("Username or password might already exist");
      }
      else{
        console.log(error);
        toast.error('Spell misfired!', { id: loadingToast, autoClose: 3000 })
        setError("Username or password might already exist");
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: `url(${darkLogin})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <ToastContainer />
      <h2 className="text-center mb-4">SignUp</h2>
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
            <Button disabled={loading} variant="contained" type="submit" sx={{ width: '100%', marginTop: '20px', borderRadius:"20px" }}>
              Registed for the World of Quidditch!
            </Button>
          </form>
        </CardContent>
        <div className="w-100 text-center mt-2">
          Are you returning wizard? <MuiLink component={Link} to="/admin/login">Open the Portkey!</MuiLink>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;

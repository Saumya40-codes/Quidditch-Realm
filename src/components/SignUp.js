import React, { useRef, useState } from 'react';
import { Card, FormControl, InputLabel, Input, Button, Alert, CardContent, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';

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

    const response = await Axios.post('http://localhost:5000/auth/register', {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    if (response.data.error) {
      setError(response.data.error);
    } else {
      navigate('/login');
    }
  };




  
  return (
    <>
      <Card>
        <CardContent>
          <h2 className="text-center mb-4">SignUp</h2>
          {error && <Alert severity="error">{error}</Alert>}
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
            <Button disabled={loading} variant="contained" type="submit" sx={{ width: '100%', marginTop: '20px' }}>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <MuiLink component={Link} to="/login">Log In</MuiLink>
      </div>
    </>
  );
};

export default SignUp;

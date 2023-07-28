import React, { useRef, useState } from 'react';
import { Card, Alert, Button, FormControl, InputLabel, Input, FormHelperText, Link as MuiLink, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import  Axios  from 'axios';
import DarkLoginBackground from '../../assets/darkLogin.jpg';

export default function AdminForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#7D1702', 
      },
    },
  });

  const forgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post('http://localhost:5000/forgot-password', {
      email: emailRef.current.value,
    })
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
        }, 50000);
      })
      .catch((error) => {
        setLoading(false);
        setError("Please make sure your email exists");
      });
  };

  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column", alignItems:"center",height:"100vh",backgroundImage: `url(${DarkLoginBackground})`, backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    <ThemeProvider theme={theme}>
    <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
          }}
        >Retrieve your Magical Key</h2>
      <Card style={{width:"490px",height:"420px", background:"transparent", borderRadius:"14px", boxShadow:"6px 9px 9px 9px rgba(0,0,0,0.5)"}}>
        <CardContent>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          {loading && <Alert variant="success">Please check your email for further instructions or try again after 5 minutes</Alert>}
          <form onSubmit={forgotPassword} style={{marginTop:"30px"}}>
            <FormControl sx={{ width: '100%', marginBottom: '45px' }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input type="email" id="email" inputRef={emailRef} required />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
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
              Reset Password
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
           Returning Wizard? <Link to="/admin/login" style={{color:"white"}} >Open the Portkey!</Link>
          </div>
        </CardContent>
        <div className="w-100 text-center mt-2">
        New Here?<Link to="/admin/register" style={{color:"white"}}>Enter the Magical World</Link>
      </div>
      </Card>
    </ThemeProvider>
    </div>
  );
}

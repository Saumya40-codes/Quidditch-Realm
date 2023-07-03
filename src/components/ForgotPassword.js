import React, { useRef, useState } from 'react';
import { Card, Alert, Button, FormControl, InputLabel, Input, FormHelperText, Link as MuiLink, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles'; // Import the 'styled' function

const StyledButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#293d5b', // Set the background color to the desired smoky black blue
  color: '#ffffff', // Set the text color to white
  '&:hover': {
    backgroundColor: '#202b40', // Set the hover background color
  },
});

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form>
            <FormControl sx={{ width: '100%', marginBottom: '45px' }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input type="email" id="email" inputRef={emailRef} required />
            </FormControl>
            {/* Use the StyledButton component instead of the regular Button */}
            <StyledButton disabled={loading} className="w-100" type="submit">
              Reset Password
            </StyledButton>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </CardContent>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

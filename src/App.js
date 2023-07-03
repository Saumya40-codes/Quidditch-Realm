import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import { useMemo } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import Dashboard from './components/Dashboard';
import { Navigate } from 'react-router-dom';
function App() {
  const isAuth = Boolean(useSelector(state => state.token));
  return (
      <div style={{ background: 'linear-gradient(#333333, #000000)', height: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/" element={isAuth? <Dashboard />: <Navigate to="/login" /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;

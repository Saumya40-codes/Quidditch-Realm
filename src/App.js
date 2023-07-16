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
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import Stepper from './components/Admin/AddEvent/Stepper';
import AdminForgotPassword from './components/Admin/AdminForgotPassword';
import Schedule from './components/Schedule';
import AddTeam from './components/Admin/AddTeam';
import MoreDetails from './components/MoreDetails';
import PastEvents from './components/PastEvents';
import PastEventDetails from './components/PastEventDetails';
import Register from './components/RegisterEvents/Register';

function App() {
  const isAuth = Boolean(useSelector(state => state.token));
  const isAdmin = Boolean(useSelector(state => state.isAdmin));
  
    return (
      <div>
        <Router>
          <Routes>
            {isAuth ? isAdmin? <Route path="/" element={<Navigate to="/admin" />} /> : <Route path="/dashboard" element={<Dashboard />} /> : <Route path="/" element={<LandingPage />} />}
            <Route path="/dashboard" element={isAuth? <Dashboard />: <Navigate to="/login" /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/more-details/:id" element={<MoreDetails />} />
            <Route path="/past/events" element={<PastEvents />} />
            <Route path="/past/event/:id" element={<PastEventDetails />} />
            <Route path="/register/event/:id" element={<Register />} />
            
          </Routes>
          <Routes>
          <Route path="/add/event" element={<Stepper mode="add" />} />
          <Route path="/add/event/:id" element={<Stepper mode="edit" />} />
            <Route path="/admin" element={<AdminDashboard /> } />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/forgotpassword" element={<AdminForgotPassword />} />
            <Route path="/admin/add/team" element={<AddTeam />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;

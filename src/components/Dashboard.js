import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLogout } from '../state';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.user);   
    const name = user ? user.username : ""; 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(setLogout());
        navigate('/login');
    };
  return (
    <div>
      Hello {name}
        <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default Dashboard

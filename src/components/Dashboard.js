import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLogout } from '../state';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import badge from '../assets/badge.png';
import { styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    width:"20px",
    height:"20px",
    borderRadius:"50%",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const isAdmin = useSelector((state) => state.isAdmin);
  const name = user ? user.username : '';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    if (isAdmin) {
      navigate('/admin/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      Hello {name}
      <div style={{ display: 'flex', justifyContent: 'right', marginRight:"20px"}}>
        <StyledBadge 
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          variant="dot"
          borderRadius="50%"
        >
        <Tooltip title="Avatar" arrow>
          <Avatar alt="Wizard" src={badge} style={{border:"2px solid blue",borderRadius:"50%", background:"azure",width:"70px",height:"70px"}} />
        </Tooltip>
        </StyledBadge>
      </div>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default Dashboard;

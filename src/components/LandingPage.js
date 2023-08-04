import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../App.css';

const ParchmentBackground = styled('div')({
  backgroundImage: 'url(https://i.pinimg.com/originals/8f/90/58/8f90581e86c50845d120251e7b244a8a.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundAttachment: 'fixed',
  fontFamily: 'Harry Potter Font, sans-serif',
  color: '#fff',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const HeaderText = styled('span')({
  fontFamily: "'Dancing Script', cursive",
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#060b26',
  fontSize: "70px",
});


const LandingPage = () => {
  return (
    <ParchmentBackground>
      <Typography variant="h2" component="h1" gutterBottom>
        <HeaderText>Quidditch Realm</HeaderText>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: '100px', mt: '100px' }}>
        <Box sx={{ position: "relative", left: -12 }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{
              width: "280px",
              height: "58px",
              borderRadius: "30px",
              background: "transparent",
              boxShadow:'17px 17px 21px 17px rgba(0,0,0,0.52)',
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                background:"transparent",
                boxShadow: "5px 5px 9px 6px rgba(233, 0, 0, 0.55)",
              },
            }}>
              <FontAwesomeIcon icon={faMagic} style={{ marginRight: "8px" }} />
              <Tooltip title="Users" arrow>
                Wizards
              </Tooltip>
            </Button>
          </Link>
          <span style={{
            position: "absolute",
            top: "50%",
            left: "calc(100% + 15px)",
            transform: "translateY(-50%)",
            width: "3px",
            height: "40px",
            background: "white"
          }} />
        </Box>
        <Box sx={{ position: "relative", left: 100 }}>
          <Link to="/admin/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{
              width: "280px",
              height: "58px",
              borderRadius: "30px",
              marginLeft:"15px",
              background: "transparent",
              boxShadow:'18px 17px 21px 21px rgba(0,0,0,0.65)',
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                background:"transparent",
                boxShadow: "5px 5px 9px 6px rgba(233, 0, 0, 0.6)",
              },
            }}>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
              <Tooltip title="Admins" arrow>
                Professors
              </Tooltip>
            </Button>
          </Link>
          <span style={{
            position: "absolute",
            top: "50%",
            left: "calc(-30px - 1px)",
            transform: "translateY(-50%)",
            width: "3px",
            height: "40px",
            background: "white"
          }} />
        </Box>
      </Box>
      <div>
        <Typography variant="h2" component="h1" gutterBottom style={{ mt: "40px", fontFamily: "Dancing Script, cursive", fontWeight: "bold", fontSize: "40px", textAlign: "center", color: "white" }}>
          <HeaderText>Embark on the journey</HeaderText>
        </Typography>
      </div>
    </ParchmentBackground>
  );
}

export default LandingPage;

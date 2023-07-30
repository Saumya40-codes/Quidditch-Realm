import React from 'react';
import { Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import landing from '../assets/landing.jpg';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../App.css'

const ParchmentBackground = styled('div')({
  backgroundImage: `url(${landing})`,
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

const LandingPage = () => {
  return (
    <ParchmentBackground>
      <div
        className="app-header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px", 
          fontFamily: "Dancing Script, cursive",
          fontWeight: "bold",
          fontSize: "40px",
          textAlign: "center",
          color: "white", 
        }}
      >
        <h1>
          <span
            style={{
                fontFamily: "'Dancing Script', cursive",
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            fontSize:"70px"
            }}
          >
            Quidditch Realm
          </span>
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', gap: '100px', marginTop: '100px' }}>
        <Box sx={{ position: "relative" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
              background: "linear-gradient(45deg, #FFA500, #0000FF, #8A2BE2)",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "6px 6px 9px 6px rgba(233, 3, 3, 0.5)",
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
            left: "calc(100% + 10px)",
            transform: "translateY(-50%)",
            width: "1px",
            height: "40px",
            background: "white"
          }} />
        </Box>
        <Box sx={{ position: "relative" }}>
          <Link to="/admin/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
              background: "linear-gradient(45deg, #FFA500, #0000FF, #8A2BE2)",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "6px 6px 9px 6px rgba(233, 3, 3, 0.5)",
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
            width: "1px",
            height: "40px",
            background: "white"
          }} />
        </Box>
      </div>
      <div>
      <div
        className="app-header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px", 
          fontFamily: "Dancing Script, cursive",
          fontWeight: "bold",
          fontSize: "40px",
          textAlign: "center",
          color: "white", 
        }}
      >
        <h1>
          <span
            style={{
                fontFamily: "'Dancing Script', cursive",
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            fontSize:"70px"
            }}
          >
            Embark on the journey
          </span>
        </h1>
      </div>
      </div>
    </ParchmentBackground>
  );
}

export default LandingPage;
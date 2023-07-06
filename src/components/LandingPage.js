import React from 'react';
import { Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => {
  return (
    <div style={{ background: "linear-gradient(135deg, #FFA500, #0000FF, #8A2BE2)" }}>
    <div  style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Header/>
    </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", gap: "100px",marginTop:"-100px" }}>
        <Box
          sx={{
            width: "200px",
            height: "50px",
            borderRadius: "20px",
            background: "white",
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "6px 6px 9px 6px rgba(233, 3, 3, 0.5)",
            },
          }}
        >
        <Link to="/login">
          <Button variant="contained" sx={{ width: "100%", height: "100%", p: 0,background:"white", color:"black", borderRadius:"15px" }}>
            <FontAwesomeIcon icon={faMagic} style={{ marginRight: "8px" }} />
            Wizards
          </Button>
        </Link>
        </Box>
        <Box
          sx={{
            width: "200px",
            height: "50px",
            backgroundColor: "white",
            borderRadius: "20px",
            background: "white",
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "6px 6px 9px 6px rgba(233, 3, 3, 0.5)",
            },
          }}
        >
        <Link to="/admin/login">
          <Button variant="contained" sx={{ width: "100%", height: "100%", p: 0, background:"white", color:"black", borderRadius:"15px" }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
            Muggles
          </Button>
        </Link>
        </Box>
      </div>
    </div>
  );
}

export default LandingPage;

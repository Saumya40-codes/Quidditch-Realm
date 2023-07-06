import React, { useEffect, useContext } from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroomBall } from '@fortawesome/free-solid-svg-icons';

const Header = ({ text }) => {
    return (
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
            {text}
          </span>
        </h1>
      </div>
    );
  };
  
  export default Header;
  
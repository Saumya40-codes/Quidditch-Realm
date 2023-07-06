import React, { useEffect, useContext } from 'react';
import '../App.css'

const Header = () => {

  useEffect(() => {
    const text = document.querySelector('.lst-note');
    const textContent = text.textContent;
    const chars = textContent.split('');

    text.textContent = '';
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${index * 0.1}s`;
      text.appendChild(span);
    });
  }, []);

  return (
    <div className='app-header'>
      <h1>
        <span className='lst-note' style={{fontFamily: "Dancing Script, cursive", fontWeight:"bold",fontSize:"90px"}}>Quidditch <br/> Realm</span>
      </h1>
    </div>
  );
};

export default Header;

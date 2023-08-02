import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';

const Random = () => {
  const [quotes, setQuotes] = useState([]);
  const [randQuote, setRandQuote] = useState('');
  const [effect, setEffect] = useState('');

  const getQuotes = async () => {
    const ress = await Axios.get('https://api.potterdb.com/v1/spells');
    setQuotes(ress.data.data);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0 && randQuote === '') {
      const availableIncantations = quotes.filter((quote) => quote.incantation !== null || quote.incantation !== 'None');

      if (availableIncantations.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableIncantations.length);
        const randomIncantation = availableIncantations[randomIndex];
        setRandQuote(randomIncantation.attributes.incantation);
        setEffect(randomIncantation.attributes.effect);
      }
    }
  }, [quotes,randQuote]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop:"12px"}}>
      {randQuote && (
        <div style={{ textAlign: 'center' }}>
          <h5 style={{fontFamily: 'Georgia, serif', fontSize: '20px', marginBottom: '5px'}}> Wondrous Incantation Revealed !! <FontAwesomeIcon icon={faHatWizard} /> </h5>
          <h4 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', marginBottom: '5px' }}>
          <span style={{ fontFamily: 'cursive', color:"grey" }}>Spell {randQuote} has the ability which can {effect}!!!
          </span></h4>
        </div>
      )}
    </div>
  );
};

export default Random;

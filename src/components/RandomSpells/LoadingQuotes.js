import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import loading from '../../assets/loading.gif';

const LoadingQuotes = () => {
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {randQuote && (
        <div style={{ textAlign: 'center' }}>
          <img src={loading} alt='funky wizard' style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', marginTop: '10px', marginBottom: '5px' }}>Did You Know?</h3>
          <h5 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Spell:<span style={{ fontFamily: 'cursive', fontWeight: 'normal' }}>{randQuote}</span></h5>
          <h6 style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px', fontStyle: 'italic', color: '#666' }}>Has the ability which can {effect}?!?!</h6>
        </div>
      )}
    </div>
  );
};

export default LoadingQuotes;

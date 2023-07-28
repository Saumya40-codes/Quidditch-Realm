import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import loading from '../assets/loading.gif';

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
      const availableIncantations = quotes.filter((quote) => quote.incantation !== null);

      if (availableIncantations.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableIncantations.length);
        const randomIncantation = availableIncantations[randomIndex];
        setRandQuote(randomIncantation.attributes.incantation);
        setEffect(randomIncantation.attributes.effect);
      }
    }
  }, [quotes]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {randQuote && (
        <div style={{ textAlign: 'center' }}>
          <img src={loading} alt='funky wizard' style={{ width: '100px', height: '100px' }} />
          <h3 >Did You Know?</h3>
          <h5>spell <span style={{fontFamily:"italic", fontWeight:"bold"}}>{randQuote}</span></h5>
          <h6>can {effect} !?!?</h6>
        </div>
      )}
    </div>
  );
};

export default LoadingQuotes;

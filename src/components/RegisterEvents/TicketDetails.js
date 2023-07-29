import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Slider } from '@mui/material';
import { useParams } from 'react-router-dom';
import LoadingQuotes from '../LoadingQuotes';

const styles = {
  root: {
    marginLeft: '20px',
    marginTop: '60px',
    padding: '20px',
  },
  card: {
    boxShadow: '6px 5px 5px rgba(0,0,0,0.5)',
    minHeight: '250px',
    maxWidth: '980px',
    margin: 'auto',
  },
  buyButton: {
    marginTop: '10px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 36,
    padding: '0 30px',
    fontWeight: 'bold',
    float: 'right',
  },
  totalPrice: {
    margin: '20px 0',
    marginLeft: '80px',
  },
  thumb:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
};

const TicketDetails = ({formChange, handleTicketQuantityChange, setTicketQuantity, buyClicked, setBuyClicked, handleBuyClick}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(formChange.total_price);
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);

  useEffect(()=>{
    setPrice(formChange.total_price)
  },[formChange.total_price,formChange.ticket_quantity,formChange, handleTicketQuantityChange, setTicketQuantity, buyClicked, setBuyClicked, handleBuyClick])

  React.useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await Axios.get(`http://localhost:5000/events/get/${id}`);
        setTickets(res.data.ticket);
        setTimeout(()=>{
          setLoading(false);
        },2500);
      } catch (error) {
        setTimeout(()=>{
          setLoading(false);
        },2500);
        console.log(error);
      }
    };
    getEvents();
  }, [id]);

  React.useEffect(() => {
    setTicketQuantity([]);
    setBuyClicked([]);
  }, [tickets]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={styles.root}>
    {loading ? (
        <div
          style={{
            height:"50vh",
            margin: '100px',
            width: '100%',
          }}
          >
        <LoadingQuotes />
        </div>
        ) : (<Grid container spacing={3}>
        {tickets.map((ticket, index) => (
          <Grid item key={ticket?._id} xs={12} sm={6} md={6} lg={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {ticket?.type}
                  <Button
                    variant="contained"
                    color="primary"
                    style={styles.buyButton}
                    onClick={handleBuyClick(index)}
                  >
                    Buy
                  </Button>
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Price: {ticket?.price}$
                </Typography>
                <Typography variant="body2" component="ul">
                  {ticket?.accom.split(',').map((accom, index) => (
                    <li key={index} style={{ margin: '14px 0' }}>
                      {accom}
                    </li>
                  ))}
                </Typography>
                {buyClicked[index] && (
                  <div>
                    <Typography id="ticket-quantity-slider" gutterBottom>
                      Select Quantity:
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">{formChange.ticket_quantity}</Typography>
                      <Slider
                        aria-labelledby="ticket-quantity-slider"
                        value={formChange.ticket_quantity}
                        onChange={(event, newValue) =>
                          handleTicketQuantityChange(event, index, newValue, ticket?.price, ticket?.type)
                        }
                        min={1}
                        max={ticket.amount}
                        step={1}
                        sx={{marginTop:"20px", marginLeft: '20px', marginRight: '20px', width: '80%' }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      )}
      {price !== 0 && (
        <Typography variant="h5" component="h2" style={styles.totalPrice}>
          Total Price: {price}$
        </Typography>
      )}
    </div>
  );
};

export default TicketDetails;
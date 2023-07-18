import React from 'react';
import Axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Slider } from '@mui/material';

const styles = {
  root: {
    marginTop: '60px',
    padding: '20px',
  },
  card: {
    boxShadow: '6px 5px 5px rgba(0,0,0,0.5)',
    minHeight: '250px',
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

const TicketDetails = () => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [buyClicked, setBuyClicked] = React.useState([]);
  const [ticketQuantity, setTicketQuantity] = React.useState([]);
  const [price, setPrice] = React.useState(0);

  const handleTicketQuantityChange = (event, index, newValue, ticketPrice) => {
    const newTicketQuantity = [...ticketQuantity];
    newTicketQuantity[index] = newValue;
    setTicketQuantity(newTicketQuantity);
    setPrice(Number(newTicketQuantity[index]) * Number(ticketPrice));
  };

  const handleBuyClick = (ticketId) => () => {
    const newBuyClicked = [...buyClicked];
    newBuyClicked[ticketId] = !newBuyClicked[ticketId];
    setBuyClicked(newBuyClicked);
  };

  React.useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await Axios.get('http://localhost:5000/events/get');
        setEvents(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const getTickets = () => {
    if (events.length > 0) {
      const tickets = events.map((event) => event.ticket).flat();
      return tickets;
    }
    return [];
  };

  const tickets = getTickets();

  React.useEffect(() => {
    setBuyClicked(new Array(tickets.length).fill(false));
  }, [tickets.length]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={styles.root}>
      <Grid container spacing={3}>
        {tickets.map((ticket, index) => (
          <Grid item key={ticket._id} xs={12} sm={6} md={6} lg={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {ticket.type}
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
                  Price: {ticket.price}$
                </Typography>
                <Typography variant="body2" component="ul">
                  {ticket.accom.split(',').map((accom, index) => (
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
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2}>
                        <Typography variant="body2">{ticketQuantity[index]}</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Slider
                          aria-labelledby="ticket-quantity-slider"
                          value={ticketQuantity[index]}
                          onChange={(event, newValue) =>
                            handleTicketQuantityChange(event, index, newValue, ticket.price)
                          }
                          min={1}
                          max={ticket.amount}
                          step={1}
                          sx={{ '& .MuiSlider-thumb': styles.thumb }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {buyClicked.includes(true) && (
        <Typography variant="h5" component="h2" style={styles.totalPrice}>
          Total Price: {price}$
        </Typography>
      )}
    </div>
  );
};

export default TicketDetails;
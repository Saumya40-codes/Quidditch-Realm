import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { faLocationDot, faMoneyBillTrendUp, faArrowTrendUp, faTicket, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import LoadingQuotes from './RandomSpells/LoadingQuotes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, Typography, Box } from '@mui/material';

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const userId = useSelector((state) => state.id);
  const [eventid, setEventId] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvent = async (id) => {
    try {
      const res = await Axios.get(`https://quidditch-realm.vercel.app/events/get/${id}`);
      return res.data; // Return the event data from the response
    } catch (err) {
      console.log(err);
      return null; // Return null if an error occurs to handle it later
    }
  };

  const getEventIds = async () => {
    try {
      const resp = await Axios.get(`https://quidditch-realm.vercel.app/reg/register/events/${userId}`);
      setEventId(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEventIds();
  }, [eventid]);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventDataPromises = eventid.map((id) => getEvent(id.eventID));

      const eventDetails = await Promise.all(eventDataPromises);

      const filteredEvents = eventDetails.filter((eventData) => eventData !== null);

      setEvents(filteredEvents);
      setLoading(false);
    };

    fetchEventData();
  }, [eventid]);

  const dateTime = (date, time) => {
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'long' });
    const year = eventDate.getFullYear();
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year} ${time}`;
    return formattedDate;
  };

  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  return (
    <div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems:"center"}}>
      <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "'Dancing Script', cursive", fontSize: "38px", marginBottom: "45px", fontWeight: "bold" }}>
        Registered Events
      </Typography>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {loading ? (
        <div
          style={{
            height: "50vh",
            margin: '100px',
            width: '100%',
          }}
        >
          <LoadingQuotes />
        </div>
      ) : events.length === 0 ? ( // Check if there are no registered events
        <Typography variant="h4" gutterBottom style={{ marginTop: "200px", fontFamily: "'Dancing Script', cursive" }}>
        <FontAwesomeIcon icon={faCircleExclamation} style={{marginRight:"5px"}} /> No Registered Events
        </Typography>
      ) : (
        events.map((event) => (
          <Card
            key={event._id}
            sx={{
              margin: '20px',
              width: '100%',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              overflow: 'hidden',
              '&:hover': {
                transform: 'scale(1.01)',
                transition: 'transform 0.3s',
              },
            }}
            elevation={3}
          >
            <CardContent
              style={{
                paddingTop: '12px',
                paddingBottom: '16px',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
           <Box sx={{ display: "grid", gridTemplateColumns: "auto auto auto", marginBottom: "40px" }}>
          <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
  <Typography variant="h5" component="h2" gutterBottom style={{fontFamily:"italic", fontWeight:"bold"}}>
    {event.team1}
  </Typography>
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
  <span>
    
  </span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
  <Typography variant="h5" component="h2" gutterBottom style={{fontFamily:"italic", fontWeight:"bold"}}>
    {event.team2}
  </Typography>
  </div>
</Box>
<div style={{ display: "grid", gridTemplateColumns: "auto auto auto", marginBottom: "40px" }}>
  <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
  <Link to={`/team?name=${event.team1}`}  style={{textDecoration:"none"}}>
    <img src={event.team1logo} alt="team1logo" style={{ width: '85px', height: '85px' }} />
  </Link>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <span style={{fontWeight:"bold", fontSize:"35px",fontFamily:"'Dancing Script', cursive"}}>
    VS
  </span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
  <Link to={`/team?name=${event.team2}`}  style={{textDecoration:"none"}}>
    <img src={event.team2logo} alt="team2logo" style={{ width: '85px', height: '85px' }} />
  </Link>  
  </div>
</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:"40px"}}>
          <div>
            <Typography variant="h4" component="h1" gutterBottom style={{fontFamily:"'Dancing Script', cursive", fontSize:"28px", marginBottom:"5px"}}>
              {event.title}
            </Typography>
          </div>
          </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ marginRight: '8px', color: '#555' }}
                />
                <p
                  style={{
                    fontFamily: 'Harry Potter',
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '0',
                  }}
                >
                  {event.venue}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon
                  icon={faClock}
                  style={{ marginRight: '8px', color: '#555' }}
                />
                <p
                  style={{
                    fontFamily: 'Harry Potter',
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '0',
                  }}
                >
                  {dateTime(event.date, event.time)}
                </p>
              </div>
            </div>
            <hr />
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",fontWeight:"medium", fontFamily:"italic", fontSize:"45px"}}>
            Your Ticket Details
            </div>
            <div>
            {eventid.filter((check)=>check.eventID === event._id)
                .map((ticket)=>{
                return(
                    <div>
                    <div style={{margin:"25px"}}>
                    <span style={{fontSize:"35px"}}>
                    <FontAwesomeIcon icon={faTicket} /> Ticket type: {ticket.ticket_type}
                    </span>
                    </div>
                    <div  style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{margin:"25px"}}>
                    <span style={{fontSize:"35px"}}>
                    <FontAwesomeIcon icon={faArrowTrendUp} style={{width:"35px", height:"35px"}} />  Quantity: {ticket.ticket_quantity}
                    </span>
                    </div>
                    <div style={{margin:"25px"}}>
                    <span style={{fontSize:"35px"}}>
                    <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{width:"35px", height:"35px"}} beat /> Price: {ticket.total_price}₹ 
                    </span>
                    </div>
                    </div>
                    </div>
                )
            })}
            </div>
          </CardContent>
</Card>
      ))
        )}
        </div>
    </div>
  )
}

export default RegisteredEvents
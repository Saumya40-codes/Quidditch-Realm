import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCalendarAlt, faMapMarkerAlt, faPerson, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Timeline from './Timeline';
import { useSelector } from 'react-redux';

const MoreDetails = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const [interest, setInterest] = useState(false);
  const userId = useSelector(state => state.id);

  const getInterest = async () => {
    try {
        console.log(userId);
        const res = await Axios.get(`http://localhost:5000/users/${userId}`);
        console.log(res.data.interests[id]);
        setInterest(res.data.interests[id]);
    } catch (error) {
        console.log(error);
    }
    }

    useEffect(() => {
        getInterest();
    }, []);

    const handleInterestChange = async (e) => {
        e.preventDefault();
        try {
          const updatedInterest = { [id]: !interest };
          const res = await Axios.put(`http://localhost:5000/users/update/${userId}`, {
            interests: updatedInterest,
          });
          setInterest(!interest); // Update with the updated value (!interest)
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      
      
      
      

  const dateTime = (date, time) => {
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'long' });
    const year = eventDate.getFullYear();
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year} ${time}`;
    return formattedDate;
  };

  const date = (date) => {
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'long' });
    const year = eventDate.getFullYear();
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
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

  const getEvent = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/events/get/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, [id]);


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #422b72 0%, #734b6d 100%)',
        padding: '20px',
        width: '100%',
      }}
    >
      <Card
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:"40px"}}>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.title}
          </Typography>
          {!interest ? (
            <Button variant="contained" color="primary" size="small" sx={{ flex: 1, maxWidth: "150px" }} onClick={handleInterestChange}>
             I'm Interested
            </Button>
            ) : (
                <div>
                <Typography variant="body1" component="p" gutterBottom style={{fontWeight:"bold", fontSize:"20px", color:"green"}}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }} />
                    Your interest has been noted, we will notify you when the match kicksoff.
                </Typography>
                <Button variant="contained" color="primary" size="small" sx={{ flex: 1, maxWidth: "150px", color:'red', marginRight:"14px" }} onClick={handleInterestChange}>
                undo
                </Button>
                </div>
            )
            }
        </div>
          <Typography variant="body1" component="p" gutterBottom style={{marginBottom:"40px"}}>
            {event.description}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom style={{marginBottom:"40px"}}>
            Format: {event.format}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 10, justifyContent:"center" }}>
  <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
    <img src={event.team1logo} alt="team1logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
    <Typography variant="body1" component="p" gutterBottom style={{fontWeight:"bold", fontSize:"35px" }}>
      {event.team1}
    </Typography>
  </Box>
  <Typography variant="body1" component="p" gutterBottom sx={{marginRight:"90px" }}>
    vs
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="body1" component="p" gutterBottom sx={{ marginRight: '10px', fontWeight:"bold", fontSize:"35px" }}>
      {event.team2}
    </Typography>
    <img src={event.team2logo} alt="team2logo" style={{ width: '50px', height: '50px' }} />
  </Box>
</Box>

          <Typography variant="body1" component="p" gutterBottom>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
            Venue: {event.venue}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom style={{marginBottom:"40px" }}>
            <FontAwesomeIcon icon={faPerson} style={{ marginRight: '5px'}} />
            Maximum Registrants:  {event.venuesize}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'left' }}>
            <Timeline start={'Registration Started'} deadline={date(event.date)} kickoff={dateTime(event.date, event.time)} />
          </Box>
        </CardContent>
        <Box
          sx={{
            borderTop: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: '#f9f9f9',
          }}
        >
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="body1" component="p" gutterBottom sx={{ marginBottom: '10px' }}>
            <FontAwesomeIcon icon={faBan} style={{ marginRight: '5px' }} />
            Rules:
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {event.rules}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <Button variant="contained" color="primary" size="large" startIcon={<FontAwesomeIcon icon={faCalendarAlt} />} sx={{ marginRight: '10px' }}>
            Add to Calendar
          </Button>
          <Button variant="contained" color="primary" size="large" sx={{ flex: 1 }}>
            Register
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default MoreDetails;

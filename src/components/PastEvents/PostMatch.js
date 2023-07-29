import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';

const PostMatch = () => {
  const isAdmin = Boolean(useSelector(state => state.isAdmin));

  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();



  const [team1players, setTeam1Players] = useState([]);
  const [team2players, setTeam2Players] = useState([]);

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

  const getTeam1Players = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/teams/getTeam/${event.team1}`);
      const { teammembers } = res.data;
      const team1PlayerList = Object.values(teammembers).reduce((prev, current) => prev.concat(current), []);
      setTeam1Players(team1PlayerList || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeam2Players = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/teams/getTeam/${event.team2}`);
      const { teammembers } = res.data;
      const team2PlayerList = Object.values(teammembers).reduce((prev, current) => prev.concat(current), []);
      setTeam2Players(team2PlayerList || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (event.team1) getTeam1Players();
    if (event.team2) getTeam2Players();
  }, [event.team1, event.team2]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #422b72 0%, #734b6d 100%)',
        color:"primary",
        padding: '20px',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{
          width: '100%',
          borderRadius: '10px',
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.title}
            </Typography>
          </div>
          <Typography variant="body1" component="p" gutterBottom style={{ marginBottom: '40px' }}>
            Format: {event.format}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom style={{marginBottom:"40px" }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px'}} />
            Venue: {event.venue}
          </Typography>
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
    <img src={event.team1logo} alt="team1logo" style={{ width: '70px', height: '70px' }} />
  </Link>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <span style={{fontWeight:"bold", fontSize:"30px"}}>
    {event.team1score} - {event.team2score}
  </span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
  <Link to={`/team?name=${event.team2}`}  style={{textDecoration:"none"}}>
    <img src={event.team2logo} alt="team2logo" style={{ width: '70px', height: '70px' }} />
  </Link>
  </div>
</div>
    <Tabs />
        </CardContent>
    </Card>
</Box>
  );
};

export default PostMatch;
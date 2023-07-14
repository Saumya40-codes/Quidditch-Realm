import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCalendarAlt, faMapMarkerAlt, faPerson, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Timeline from './Timeline';
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';

const PastEventDetails = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const [team1Score, setTeam1Score] = useState(event.team1score || 0);
  const [team2Score, setTeam2Score] = useState(event.team2score || 0);
  const [team1Scorer, setTeam1Scorer] = useState('');
const [team2Scorer, setTeam2Scorer] = useState('');


  const [team1players, setTeam1Players] = useState([]);
  const [team1ScorerMinutes, setTeam1ScorerMinutes] = useState([]);
  const [team2players, setTeam2Players] = useState([]);
  const [team2ScorerMinutes, setTeam2ScorerMinutes] = useState([]);
  const [team1Scorers, setTeam1Scorers] = useState([]);
  const [team2Scorers, setTeam2Scorers] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleDialogOpen = (team) => {
    setSelectedTeam(team);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedTeam('');
  };

  const handleTeam1Score = (name, minute) => {
    setTeam1Scorers([...team1Scorers, { name, minute }]);
  };

  const handleTeam2Score = (name, minute) => {
    setTeam2Scorers([...team2Scorers, { name, minute }]);
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

  const handleTeam1ScoreUpdate = (type) => {
    if (type === 'decrease') {
      if (team1Score === 0) return;
      const updatedScore = team1Score - 1;
      setTeam1Score(updatedScore);
    } else {
      const updatedScore = team1Score + 1;
      setTeam1Score(updatedScore);
    }
  };

  const handleTeam2ScoreUpdate = (type) => {
    if (type === 'decrease') {
      if (team2Score === 0) return;
      const updatedScore = team2Score - 1;
      setTeam2Score(updatedScore);
    } else {
      const updatedScore = team2Score + 1;
      setTeam2Score(updatedScore);
    }
  };

  const handleTeam1ScorerAddition = (e) => {
    const scorer = e.target.value;
    setTeam1Players([...team1players, scorer]);
  };

  const handleTeam2ScorerAddition = (e) => {
    const scorer = e.target.value;
    setTeam2Players([...team2players, scorer]);
  };

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.title}
            </Typography>
          </div>
          <Typography variant="body1" component="p" gutterBottom style={{ marginBottom: '40px' }}>
            Format: {event.format}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <img src={event.team1logo} alt="team1logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
  <Typography variant="body1" component="p" gutterBottom sx={{ marginRight: '30px', fontWeight: 'bold', fontSize: '35px' }}>
    {event.team1} -
    <Button variant="contained" size="small" onClick={() => handleTeam1ScoreUpdate('decrease')} style={{ marginLeft: '30px', marginRight: '30px' }}>
      -1
    </Button>
    <TextField
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={team1Score}
      style={{ width: '50px', marginTop: '7px', border: 'none' }}
      onChange={(e) => setTeam1Score(Number(e.target.value))}
    />
    <Button variant="contained" size="small" onClick={() => handleTeam1ScoreUpdate('increase')} style={{ marginLeft: '30px', marginRight: '30px' }}>
      +1
    </Button>
  </Typography>
</Box>

<Typography variant="body1" component="p" gutterBottom sx={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem', fontWeight: 'bold', marginRight: '40px' }}>
  vs
</Typography>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
  <img src={event.team2logo} alt="team2logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
  <Typography variant="body1" component="p" gutterBottom sx={{ marginRight: '30px', fontWeight: 'bold', fontSize: '35px' }}>
    {event.team2} -
    <Button variant="contained" color="primary" size="small" onClick={() => handleTeam2ScoreUpdate('decrease')} style={{ marginLeft: '30px', marginRight: '30px' }}>
      -1
    </Button>
    <TextField
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={team2Score}
      style={{ width: '50px', marginTop: '7px', border: 'none' }}
      onChange={(e) => setTeam2Score(Number(e.target.value))}
    />
    <Button variant="contained" color="primary" size="small" onClick={() => handleTeam2ScoreUpdate('increase')} style={{ marginLeft: '30px', marginRight: '30px' }}>
      +1
    </Button>
  </Typography>
</Box>
</Box>
        <div style={{display:"flex", justifyContent:"space-between", columnGap:"100px"}}>
        <div style={{marginLeft:"140px"}}>
    {team1Scorers.map((scorer, index) => (
      <Typography key={index} variant="body1" component="p" gutterBottom>
        <span style={{ marginRight: '10px' }}>{scorer.name}</span>
        <span>{scorer.minute}</span>
      </Typography>
    ))}
  </div>
  <div style={{marginRight:"320px"}}>
    {team2Scorers.map((scorer, index) => (
      <Typography key={index} variant="body1" component="p" gutterBottom>
        <span style={{ marginRight: '10px' }}>{scorer.name}</span>
        <span>{scorer.minute}</span>
      </Typography>
    ))}
  </div>
        </div>

          <Typography variant="body1" component="p" gutterBottom sx={{ marginTop: '30px' }}>
            Team 1 Scorers:
            <Button variant="contained" color="primary" size="small" style={{ marginLeft: '30px', marginRight: '30px' }} onClick={() => handleDialogOpen('team1')}>
              Add Scorer
            </Button>
          </Typography>

          <Typography variant="body1" component="p" gutterBottom sx={{ marginTop: '30px', marginBottom: '30px' }}>
            Team 2 Scorers:
            <Button variant="contained" color="primary" size="small" style={{ marginLeft: '30px', marginRight: '30px' }} onClick={() => handleDialogOpen('team2')}>
              Add Scorer
            </Button>
          </Typography>

          <Typography variant="body1" component="p" gutterBottom>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
            Venue: {event.venue}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom style={{ marginBottom: '40px' }}>
            <FontAwesomeIcon icon={faPerson} style={{ marginRight: '5px' }} />
            Maximum Registrants: {event.venuesize}
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
        ></Box>
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
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Scorer</DialogTitle>
        <DialogContent>
        <TextField
  label="Scorer"
  select
  value={selectedTeam === 'team1' ? team1Scorer : team2Scorer}
  onChange={(e) => {
    const scorer = e.target.value;
    if (selectedTeam === 'team1') {
      setTeam1Scorer(scorer);
    } else {
      setTeam2Scorer(scorer);
    }
  }}
  style={{ width: '200px' }}
>
  {selectedTeam === 'team1'
    ? team1players.map((player, index) => (
        <MenuItem key={index} value={player}>
          {player}
        </MenuItem>
      ))
    : team2players.map((player, index) => (
        <MenuItem key={index} value={player}>
          {player}
        </MenuItem>
      ))}
</TextField>

          <TextField
            label="Minute"
            type="number"
            onChange={(e) => {
              const minute = e.target.value;
              if (selectedTeam === 'team1') {
                setTeam1ScorerMinutes([...team1ScorerMinutes, minute]);
              } else {
                setTeam2ScorerMinutes([...team2ScorerMinutes, minute]);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={() => {
              const name = selectedTeam === 'team1' ? team1Scorer : team2Scorer;
              const minute = selectedTeam === 'team1' ? team1ScorerMinutes[team1ScorerMinutes.length - 1] : team2ScorerMinutes[team2ScorerMinutes.length - 1];
              selectedTeam === 'team1' ? handleTeam1Score(name, minute) : handleTeam2Score(name, minute);
              handleDialogClose();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PastEventDetails;

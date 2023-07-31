import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, TextField, ButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const PastEventDetails = () => {
  const isAdmin = Boolean(useSelector(state => state.isAdmin));

  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [team1Scorer, setTeam1Scorer] = useState('');
const [team2Scorer, setTeam2Scorer] = useState('');


  const [team1players, setTeam1Players] = useState([]);
  const [team1ScorerMinutes, setTeam1ScorerMinutes] = useState([]);
  const [team2players, setTeam2Players] = useState([]);
  const [team2ScorerMinutes, setTeam2ScorerMinutes] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await Axios.put(`http://localhost:5000/events/updateScore/${id}`, {
            comment: event.comment,
            team1score: event.team1score,
            team1scorer: event.team1scorer,
            team2score: event.team2score,
            team2scorer: event.team2scorer,
        })
        .then((res) => {
            toast.success('Scorecard Updated Successfully', { autoClose: 1000 });
            setTimeout(() => {
                navigate('/past/events');
            }, 2000);
        })
    } catch (error) {
        console.log(error);
    }
}

  const handleDialogOpen = (team) => {
    setSelectedTeam(team);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedTeam('');
  };

  const handleTeam1Score = (name, minute) => {
    const pair = { name, minute };
    const updatedEvent = { ...event, team1scorer: [...event.team1scorer, pair] };
    setEvent(updatedEvent);
  };

  const handleTeam2Score = (name, minute) => {
    const pair = { name, minute };
    const updatedEvent = { ...event, team2scorer: [...event.team2scorer, pair] };
    setEvent(updatedEvent);
  };

  const handleTeam1ScorerDeletion = (index) => {
    const updatedScorers = [...event.team1scorer];
    updatedScorers.splice(index, 1);
    const updatedEvent = { ...event, team1scorer: updatedScorers };
    setEvent(updatedEvent);
  }

    const handleTeam2ScorerDeletion = (index) => {
    const updatedScorers = [...event.team2scorer];
    updatedScorers.splice(index, 1);
    const updatedEvent = { ...event, team2scorer: updatedScorers };
    setEvent(updatedEvent);
    }

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
      if (event.team1score === 0) return;
      const updatedEvent = { ...event, team1score: event.team1score - 1 };
      setEvent(updatedEvent);
    } else {
      const updatedEvent = { ...event, team1score: event.team1score + 1 };
      setEvent(updatedEvent);
    }
  };

  const handleTeam2ScoreUpdate = (type) => {
    if (type === 'decrease') {
      if (event.team2score === 0) return;
      const updatedEvent = { ...event, team2score: event.team2score - 1 };
        setEvent(updatedEvent);
    } else {
      const updatedEvent = { ...event, team2score: event.team2score + 1 };
        setEvent(updatedEvent);
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
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <img src={event.team1logo} alt="team1logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
  <Typography variant="body1" component="p" gutterBottom sx={{ marginRight: '30px', fontWeight: 'bold', fontSize: '35px' }}>
    {event.team1} -
    <TextField
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={event.team1score}
      style={{ width: '50px', marginTop: '7px', border: 'none', marginLeft: '30px' }}
      onChange={(e) => setEvent({ ...event, team1score: Number(e.target.value) })}
    />
    <ButtonGroup
  disableElevation
  variant="contained"
  aria-label="Disabled elevation buttons"
  style={{ marginLeft: '30px', marginRight: '30px'}}
>
  <Button onClick={(e)=>handleTeam1ScoreUpdate('increase')}>+</Button>
  <Button onClick={(e)=>handleTeam1ScoreUpdate('decrease')}>-</Button>
</ButtonGroup>
  </Typography>
</Box>

<Typography variant="body1" component="p" gutterBottom sx={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem', fontWeight: 'bold', marginRight: '40px' }}>
  vs
</Typography>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
  <img src={event.team2logo} alt="team2logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
  <Typography variant="body1" component="p" gutterBottom sx={{ marginRight: '30px', fontWeight: 'bold', fontSize: '35px' }}>
    {event.team2} -
    <TextField
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={event.team2score}
      style={{ width: '50px', marginTop: '7px', border: 'none', marginLeft: '30px' }}
      onChange={(e) => setEvent({ ...event, team2score: Number(e.target.value) })}
    />
   <ButtonGroup
  disableElevation
  variant="contained"
  aria-label="Disabled elevation buttons"
  style={{ marginLeft: '30px', marginRight: '30px'}}
>
  <Button onClick={(e)=>handleTeam2ScoreUpdate('increase')}>+</Button>
  <Button onClick={(e)=>handleTeam2ScoreUpdate('decrease')}>-</Button>
</ButtonGroup>
  </Typography>
</Box>
</Box>
        <div style={{display:"flex", justifyContent:"space-between", columnGap:"100px"}}>
        <div style={{marginLeft:"140px"}}>
        {event.team1scorer && event.team1scorer.length > 0 && (
  <>
    {event.team1scorer.map((scorer, index) => (
      <Typography key={index} variant="body1" component="p" gutterBottom>
        <span style={{ marginRight: '10px' }}>{scorer.name}</span>
        <span>{scorer.minute}</span>
        <span style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faXmark} style={{cursor:"pointer"}} onClick={() => handleTeam1ScorerDeletion(index)} />
        </span>
      </Typography>
    ))}
  </>
)}
  </div>
  <div style={{marginRight:"320px"}}>
  {event.team2scorer && event.team2scorer.length > 0 && (
  <>
    {event.team2scorer.map((scorer, index) => (
      <Typography key={index} variant="body1" component="p" gutterBottom>
        <span style={{ marginRight: '10px' }}>{scorer.name}</span>
        <span>{scorer.minute}</span>
        <span style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faXmark} style={{cursor:"pointer"}} onClick={() => handleTeam2ScorerDeletion(index)} />
        </span>
      </Typography>
    ))}
  </>
)}
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

          <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          </Box>
        </CardContent>
        <Box
          sx={{
            borderTop: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '10px',
          }}
        >
    <TextField
    id="outlined-basic"
    variant="outlined"
    size="large"
    label="Match Comments"
    multiline
    required
    rows={4}
    style={{ width: '100%', marginTop: '17px', marginBottom:"40px"}}
    onChange={(e) => setEvent({...event, comment: e.target.value})}
    value={event.comment}
    />
    <div style={{display:"block", justifyContent:"center", alignItems:"center"}}>
    <Button variant="contained" color="primary" size="large" style={{width:"580px"}} onClick={handleSubmit}>
                Update
    </Button>
    </div>
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
  style={{ width: '200px', marginRight:"20px" }}
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
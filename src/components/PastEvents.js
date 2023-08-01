import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import {Button} from '@mui/material';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingQuotes from './LoadingQuotes';


const PastEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading,setLoading] = useState(true);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const isAdmin = Boolean(useSelector(state => state.isAdmin));
    const navigate = useNavigate();
  
    const getEvents = async () => {
      try {
        const res = await Axios.get('http://localhost:5000/events/past');
        setEvents(res.data);
          setLoading(false);
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
  
    useEffect(() => {
      getEvents();
    }, []);
  
  
    const handleDeleteConfirmationOpen = (event) => {
      setEventToDelete(event);
      setDeleteConfirmationOpen(true);
    };
  
    const handleDeleteConfirmationClose = () => {
      setDeleteConfirmationOpen(false);
      setEventToDelete(null);
    };
  
    const handleDeleteEvent = async () => {
      try {
        await Axios.delete(`http://localhost:5000/events/delete/${eventToDelete._id}`);
        getEvents();
        handleDeleteConfirmationClose();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"'Dancing Script', cursive", fontSize:"38px", marginBottom:"45px", fontWeight:"bold"}}>
        Match Results
      </Typography>
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
        ) : (
          events.map((event) => (
          <Card
            key={event._id}
            style={{
              margin: '20px',
              width: '100%',
              borderRadius: '16px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              overflow: 'hidden',
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
              <p
                className="text-center mb-4"
                style={{
                  fontFamily: 'Harry Potter',
                  fontSize: '16px',
                  color: '#555',
                  marginBottom: '12px',
                }}
              >
                <h2
                className="text-centre mb-2"
                style={{
                  fontFamily: 'Harry Potter',
                  fontSize: '14px',
                  marginTop:"5px",
                  marginBottom: '8px',
                }}
              >
              {
                event.team1score == event.team2score ? <span>{event.team1} ties with {event.team2}</span> :
                event.team1score > event.team2score ? <span>{event.team1} seals the win against {event.team2}</span> : <span>{event.team2} seals the win against {event.team1}</span>
              }
              </h2>
              {
                event.comment ? (
                String(event.comment).length > 175 ? String(event.comment).substring(0,175) + '...' : event.comment
                )
                : "Match completed tune in later for more details"
              }
              </p>
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
            </CardContent>
            <div
              style={{
                padding: '8px 16px',
                borderTop: '1px solid #ddd',
                textAlign: 'right',
              }}
            >
              <p
                style={{
                  fontFamily: 'Harry Potter',
                  fontSize: '14px',
                  color: '#555',
                  marginBottom: '0',
                  cursor: 'pointer',
                }}
              >
              <Link to={`/post/match/${event._id}`} style={{ textDecoration: 'none', color: '#555' }}>
                More Details...
              </Link>
              </p>
              </div>
              {
                  isAdmin && (
                      <div style={{display:"flex", justifyContent:"space-between", padding: '8px 16px', borderTop: '1px solid #ddd', textAlign: 'right'}}>
                      <Button
                          variant="contained"
                          style={{
                              color: 'white',
                              fontFamily: 'Harry Potter',
                              fontSize: '14px',
                              marginBottom: '0',
                              cursor: 'pointer',
                              marginLeft: '10px',
                          }}
                          onClick={()=>navigate(`/add/event/${event._id}`)}
                      >
                          Edit
                      </Button>
                      <Button
                          variant="contained"
                          style={{
                              color: 'white',
                              fontFamily: 'Harry Potter',
                              fontSize: '14px',
                              marginBottom: '0',
                              cursor: 'pointer',
                              marginLeft: '10px',
                          }}
                          onClick={() => navigate(`/past/event/${event._id}`)}
                      >
                        {event.team1score? "Edit Result" : "Add Result"}
                      </Button>
                      <Button
                          variant="contained"
                          style={{
                              color: 'white',
                              fontFamily: 'Harry Potter',
                              fontSize: '14px',
                              marginBottom: '0',
                              cursor: 'pointer',
                              marginLeft: '10px',
                          }}
                          onClick={() => handleDeleteConfirmationOpen(event)}
                      >
                          Delete
                      </Button>
                      </div>
                  )
              }
          </Card>
        ))
        )
        }
        <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this event?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
            <Button onClick={handleDeleteEvent} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};  
export default PastEvents
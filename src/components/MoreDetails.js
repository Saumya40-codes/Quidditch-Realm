import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCalendarAlt, faMapMarkerAlt, faPerson, faCheckCircle, faReceipt, faRocket } from '@fortawesome/free-solid-svg-icons';
import Timeline from './Timeline';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useRef } from 'react';

const MoreDetails = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const [interest, setInterest] = useState(false);
  const userId = useSelector(state => state.id);
  const userm = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const hasCalled = useRef(false);
  const [registered,hasRegistered] = useState(false);

  const getInterest = async () => {
    try {
        console.log(userId);
        const res = await Axios.get(`https://quidditch-realm.vercel.app/users/${userId}`);
        setInterest(res.data.interests[id]);
    } catch (error) {
        console.log(error);
    }
    }

    useEffect(() => {
        getInterest();
    }, [interest]);

    const checkRegister = async () => {
      try {
        if (id) {
          const resp = await Axios.get(`https://quidditch-realm.vercel.app/reg/register/users/${id}`);
          const users = resp.data; 
          console.log(users);
    
          const doesExist = users.some((user) => user.userID.toLowerCase() === userId.toLowerCase());
          if (doesExist) {
            hasRegistered(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    

    useEffect(()=>{
      checkRegister();
    },[id,userId,registered])

    const handleInterestChange = async (e) => {
        e.preventDefault();
        try {
          const updatedInterest = { [id]: !interest };
          console.log(updatedInterest[id])
          const res = await Axios.put(`https://quidditch-realm.vercel.app/users/update/${userId}`, {
            interests: updatedInterest,
          });

          setInterest(!interest);

          const res2 = await Axios.put(`https://quidditch-realm.vercel.app/events/interest/${id}`,{
            interest: interest? event.interest-1 : event.interest+1,
          });
          
          const date = String(event.date).substring(0, 10);
          const time = String(event.time).substring(0, 5);
          const dateTime = `${date}T${time}:00.000+05:30`;

          setTimeout(()=>{
            return;
          },2500)

          if(interest){
            const res = await Axios.put(`https://quidditch-realm.vercel.app/users/del/notif/${userId}`, {
              message: `You had shown interest in match between ${event.team1} and ${event.team2}. It has started, join in!! ${dateTime}`,
              email: userm.email,
              date: dateTime,
              receiver: userId,
            });
          }else{
            const res = await  Axios.post(`https://quidditch-realm.vercel.app/users/addNotification/${userId}`, {
              message: `You had shown interest in match between ${event.team1} and ${event.team2}. It has started, join in!! ${dateTime}`,
              email: userm.email,
              date: dateTime,
              receiver: userId,
            });
          }

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
      const res = await Axios.get(`https://quidditch-realm.vercel.app/events/get/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, [id]);

  const handleRedirectToServer = () => {
    window.location.href = `https://quidditch-realm.vercel.app/calendar/${id}`;
  };

  let searchForStatus = new URLSearchParams(window.location.search)
  let status = searchForStatus.get('status')

  useEffect(()=>{
    searchForStatus = new URLSearchParams(window.location.search)
    status = searchForStatus.get('status')
  }, [])

  
  useEffect(() => {
    if (!hasCalled.current && status === '200' && event.date && event.time && event.endtime) {
      hasCalled.current = true;
      (async () => {
        const date = String(event.date).substring(0, 10);
        const time = String(event.time).substring(0, 5);
        const endtime = String(event.endtime).substring(0, 5);
        const combinedDateTime = new Date(`${date}T${time}:00.000+05:30`);
        const combinedEndTime = new Date(`${date}T${endtime}:00.000+05:30`);
  
        try {
          const res = await Axios.post('https://quidditch-realm.vercel.app/create-event', {
            summary: event.title,
            description: `Quidditch match between ${event.team1} and ${event.team2}`,
            dateTime1: combinedDateTime.toISOString(),
            dateTime2: combinedEndTime.toISOString(),
          });
          if (res.status === 200) {
            toast.success('Event has been added to your calendar', { autoClose: 2500 });
            setTimeout(() => {
              navigate(`/more-details/${id}`);
            }, 1000);
          }
        } catch (err) {
          console.log(err);
          toast.error('Event addition to your calendar has failed', { autoClose: 2500 });
          setTimeout(() => {
            navigate(`/more-details/${id}`);
          }, 1000);
        }
      })();
    }
  }, [status, event]);
  
  
  

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
    <ToastContainer />
      <Card
        sx={{
          width: '100%',
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
            <Button variant="contained" size="small" sx={{ flex: 1, maxWidth: "150px" }} onClick={handleInterestChange}>
             I'm Interested
            </Button>
            ) : (
                <div>
                <Typography variant="body1" component="p" gutterBottom style={{fontWeight:"bold", fontSize:"20px", color:"green"}}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }} />
                    Your interest has been noted, we will notify you when the match kicksoff.
                </Typography>
                <Button variant="contained" size="small" sx={{ flex: 1, maxWidth: "150px", color:'red', marginRight:"14px" }} onClick={handleInterestChange}>
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
  <Link to={`/team?name=${event.team1}`}  style={{textDecoration:"none"}}>
    <img src={event.team1logo} alt="team1logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
  </Link>
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
    <Link to={`/team?name=${event.team2}`}  style={{textDecoration:"none"}}>
    <img src={event.team2logo} alt="team2logo" style={{ width: '50px', height: '50px' }} />
    </Link>
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
          }}
        >
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
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
        <Box sx={{ display: 'flex', justifyContent:"space-evenly", padding: '10px' }}>
  <Button variant="contained" size="large" startIcon={<FontAwesomeIcon icon={faCalendarAlt} />} sx={{ marginRight: '10px', padding:"10px 300px 10px 300px" }} onClick={handleRedirectToServer}>
    Add to Calendar
  </Button>
    <Link to={`/register/event/${event._id}`} style={{ textDecoration: "none" }}>
      <Button variant="contained" size="large" disabled={registered} sx={{padding:"10px 300px 10px 300px"}} startIcon={registered? <FontAwesomeIcon icon={faRocket} />: <FontAwesomeIcon icon={faReceipt} /> } >
        {registered ? "Registered": "Register"}
      </Button>
    </Link>
</Box>
      </Card>
    </Box>
  );
};

export default MoreDetails; 
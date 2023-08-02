import Axios from 'axios'
import { useState, useEffect } from 'react'
import LoadingQuotes from '../RandomSpells/LoadingQuotes';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { faLocationDot, faMoneyBillTrendUp, faArrowTrendUp} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Sales = () => {
    const [event, setEvent] = useState([]);
    const [loading,setLoading] = useState(true);

    const getEvent = async() =>{
        try{
            const res = await Axios.get('https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/all')
                setEvent(res.data);
                setLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getEvent();
    },[event]);


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
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"'Dancing Script', cursive", fontSize:"38px", marginBottom:"45px", fontWeight:"bold"}}>
        Match Sales
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
      event.map((events) => (
        <Card
          key={events._id}
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
    {events.team1}
  </Typography>
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
  <span>
    
  </span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
  <Typography variant="h5" component="h2" gutterBottom style={{fontFamily:"italic", fontWeight:"bold"}}>
    {events.team2}
  </Typography>
  </div>
</Box>
<div style={{ display: "grid", gridTemplateColumns: "auto auto auto", marginBottom: "40px" }}>
  <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
  <Link to={`/team?name=${events.team1}`}  style={{textDecoration:"none"}}>
    <img src={events.team1logo} alt="team1logo" style={{ width: '85px', height: '85px' }} />
  </Link>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <span style={{fontWeight:"bold", fontSize:"35px",fontFamily:"'Dancing Script', cursive"}}>
    VS
  </span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
  <Link to={`/team?name=${events.team2}`}  style={{textDecoration:"none"}}>
    <img src={events.team2logo} alt="team2logo" style={{ width: '85px', height: '85px' }} />
  </Link>  
  </div>
</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:"40px"}}>
          <div>
            <Typography variant="h4" component="h1" gutterBottom style={{fontFamily:"'Dancing Script', cursive", fontSize:"28px", marginBottom:"5px"}}>
              {events.title}
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
                  {events.venue}
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
                  {dateTime(events.date, events.time)}
                </p>
              </div>
            </div>
            <hr />
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"30px"}}>
            <div>
            <FontAwesomeIcon icon={faArrowTrendUp} style={{width:"55px", height:"55px"}} /> <span style={{fontSize:"55px"}} > {events.ticketSold && events.ticketSold} </span> Tickets sold
            </div>
            <div>
            <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{width:"55px", height:"55px"}} beat /> <span style={{fontSize:"55px"}} > {events.totalSale && events.totalSale}₹ </span> of Sales
            </div>
            </div>
          </CardContent>
</Card>
      ))
        )}
</div>
  );
};

export default Sales

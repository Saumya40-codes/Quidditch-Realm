import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import defaultvenue from '../assets/defaultvenue.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import {Button} from '@mui/material';
import state from '../state';
import {  useSelector } from 'react-redux/es/hooks/useSelector';

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const isAdmin = Boolean(useSelector(state => state.isAdmin));

  const getEvents = async () => {
    try {
      const res = await Axios.get('http://localhost:5000/events/get');
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const delEvents = async (id) => {
    try {
        const res = await Axios.delete('http://localhost:5000/events/delete/'+id);
        setEvents(res.data)
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <h2 className="text-center">Schedule</h2>
      {events.map((event) => (
        <Card
          key={event._id}
          style={{
            margin: '20px',
            width: '100%',
            backgroundColor: '#d6e7f5',
            borderRadius: '16px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          elevation={3}
        >
          <img
            src={defaultvenue}
            alt="venue"
            style={{
              width: '100%',
              height: '300px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          />
          <CardContent
            style={{
              paddingTop: '12px',
              paddingBottom: '16px',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <h2
              className="text-left mb-2"
              style={{
                fontFamily: 'Harry Potter',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              {event.title}
            </h2>
            <h3
              className="text-center mb-2"
              style={{
                fontFamily: 'Harry Potter',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#777',
                marginBottom: '12px',
              }}
            >
              {event.team1} vs {event.team2}
            </h3>
            <p
              className="text-center mb-4"
              style={{
                fontFamily: 'Harry Potter',
                fontSize: '16px',
                color: '#555',
                marginBottom: '12px',
              }}
            >
              {String(event.description).length > 100 ? event.description + '...' : event.description}
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
              backgroundColor: '#f5f5f5',
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
              More Details...
            </p>
            </div>
            {
                isAdmin && (
                    <div style={{backgroundColor: '#f5f5f5',display:"flex", justifyContent:"space-between", padding: '8px 16px', borderTop: '1px solid #ddd', textAlign: 'right'}}>
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
                        onClick={() => delEvents(event._id)}
                    >
                        Delete
                    </Button>
                    </div>
                )
            }
        </Card>
      ))}
    </div>
  );
};

export default Schedule;
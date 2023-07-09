import Axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Schedule = () => {
    const [events, setEvents] = useState([]);

    const getEvents = async (req, res) => {
        try {
            Axios.get('http://localhost:5000/events/get')
            .then((res)=>{
                setEvents(res.data);
            }
            )
            .catch((err)=>{
                console.log(err);
            }
            )
        } catch (error) {
            res.status(500).json({message: "Something went wrong"});
        }
    }
            useEffect(() => {
                getEvents();
            }, [])
  return (
    <div>
      
    </div>
  )
}

export default Schedule

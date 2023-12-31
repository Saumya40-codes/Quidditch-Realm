import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons'

const DashboardData = ({sidebar}) => {
    const [events , setEvents] = useState([])
    const [favouriteTeam, setFavouriteTeam] = useState('')
    const id = useSelector(state => state.id)

    const getEvents = async () => {
        try{
        const response = await Axios.get('https://quidditch-realm.vercel.app/events/get')
        .then((response) => {
            setEvents(response.data)
        })
        } 
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    const getFavouriteTeam = async () => {
        try{
        const response = await Axios.get(`https://quidditch-realm.vercel.app/users/${id}`)
        .then((response) => {
            setFavouriteTeam(response.data.favouriteTeam)
        })
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFavouriteTeam()
    }, [favouriteTeam])

  return (
    <div>
        <Box sx={{ display: 'flex', marginTop:"60px", borderRadius:"12px" }}>
        <Card style={{width:"100%"}}>
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"italic", fontSize:"18px", marginBottom:"5px", fontWeight:"bold"}}>
        {
  favouriteTeam ? (
    <>
      Upcoming Matches of {favouriteTeam}
    </>
  ) : (
    <>
      Please select your favourite team to view their upcoming matches
      <Link to="/profile" style={{ textDecoration: 'none' }}> select</Link>
    </>
  )
}
        </Typography>
        </div>
        {!sidebar? <hr />:(
          <div style={{ height:"20px"}}>
            
          </div>
        )}
            {events.filter((event) => event?.team1 === favouriteTeam || event?.team2 === favouriteTeam).map((event) => (
                <Card sx={{ width: "90%", margin: "20px", marginTop:"50px", marginLeft:"85px", boxShadow:"6px 6px 9px 6px rgba(0,0,0,0.4)" }}>
                    <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="h5" component="h1" gutterBottom>
            <FontAwesomeIcon icon={faCalendarTimes} style={{ marginRight: "8px" }} />
              {String(event.date).toLocaleString().substring(0,10)} {event.time}
            </Typography>
          </div>
          <Typography variant="body1" component="p" gutterBottom style={{ marginBottom: '40px' }}>
            Format: {event.format}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "auto auto auto", marginBottom: "40px" }}>
  <Typography variant="h3" component="h2" gutterBottom style={{ marginLeft: '250px', fontFamily: "'Dancing Script', cursive", fontWeight:"bold"}}>
    {event.team1}
  </Typography>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>

  </div>
  <Typography variant="h3" component="h2" gutterBottom style={{fontFamily: "'Dancing Script', cursive", fontWeight:"bold"}}>
    {event.team2}
  </Typography>
</Box>
<div style={{ display: "grid", gridTemplateColumns: "auto auto auto", marginBottom: "40px" }}>
  <div style={{ marginLeft: '250px' }}>
    <img src={event.team1logo} alt="team1logo" style={{ width: '100px', height: '100px' }} />
  </div>
  <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
    vs
  </div>
  <div>
    <img src={event.team2logo} alt="team2logo" style={{ width: '100px', height: '100px' }} />
  </div>
</div>
<Typography variant="body1" component="p" gutterBottom style={{ marginTop: '10px', textAlign:"right" }}>
    <Link to={`/more-details/${event._id}`} style={{ textDecoration: 'none'}}>View Match Details</Link>
</Typography>
</CardContent>
                </Card>    
            ))}
            </Card>
        </Box>        
    </div>
  )
}

export default DashboardData
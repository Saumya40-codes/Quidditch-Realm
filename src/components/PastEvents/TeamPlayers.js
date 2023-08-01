import React from 'react'
import { Box, Card, CardContent } from '@mui/material'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TeamPlayers = () => {
    const { id } = useParams();
    
    const [team1players, setTeam1Players] = useState([]);
    const [team2players, setTeam2Players] = useState([]);
    const [event, setEvent] = useState({});

    const getEvent = async () => {
        try {
            const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/get/${id}`);
            setEvent(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getTeam1Players = async () => {
        try {
          const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/getTeam/${event.team1}`);
          const { teammembers } = res.data;
          setTeam1Players(teammembers || [])
        } catch (error) {
          console.log(error);
        }
      };
    
      const getTeam2Players = async () => {
        try {
          const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/getTeam/${event.team2}`);
          const { teammembers } = res.data;
          setTeam2Players(teammembers || [])
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getEvent();
    }, []);

    useEffect(() => {
        event.team1 && getTeam1Players();
        console.log(event.team1);
        event.team2 && getTeam2Players();
    }, [event]);

    let team1color = '#000000';
    let team2color = '#000000';

  if(event?.team1score > event?.team2score){
    team1color = '#008000';
    team2color = '#FF0000';
    }else if(event.team1score < event.team2score){
    team1color = '#FF0000';
    team2color = '#008000';
    }else{
    team1color = '#000000';
    team2color = '#000000';
    }
    
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:"centre" }}>
            <div style={{ marginLeft:"300px"}}>
                <h3 style={{color:team1color, marginBottom:"20px"}}>{event?.team1}</h3>
                {Object.keys(team1players)?.map((type)=>{
                    return(
                        <div key={type}>
                        <h4 style={{fontWeight:"bold"}}>{type}</h4>
                        <ul>
                            {team1players[type]?.map((player,index)=>{
                                return(
                                    <li key={index} style={{fontFamily:"italic"}}>{player}</li>
                                )
                            })}
                        </ul>
                        </div>
                    )
                })}
            </div>
            <div style={{ marginRight: "300px" }}>
  <h3 style={{color:team2color, marginBottom:"20px"}}>{event.team2}</h3>
  {Object.keys(team2players)?.map((type) => {
    return (
      <div key={type}>
        <h4 style={{fontWeight:"bold"}}>{type}</h4>
        <ul>
          {team2players[type]?.map((player, index) => {
            return <li key={index} style={{fontFamily:"italic"}}>{player}</li>;
          })}
        </ul>
      </div>
    );
  })}
</div>
      </Box>
    </div>
  )
}

export default TeamPlayers
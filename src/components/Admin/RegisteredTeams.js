import React from 'react'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, CardContent, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const RegisteredTeams = () => {
    const [teams, setTeams] = useState([]);

    const getTeams = async () => {
        try {
            const res = await Axios.get('https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/getTeams');
            setTeams(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getTeams();
    }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection:"column" }}>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Registered Teams</h1>
      </div>
      <div style={{marginTop:"60px"}}>
        {teams.map((team) => (
            <Card sx={{marginTop:"30px", marginBottom:"20px" }} key={team._id}>
                <CardContent style={{display:"flex", justifyContent:"space-between", alignItems:"centre"}}>
                    <div>
                    <h3>{team.teamname}</h3>
                    <h5>Registered on: {String(team.registerDate).toLocaleString('en-us').substring(0,10)} </h5>
                    </div>
                    <div>
                    <img src={team.teamlogo} alt="teamlogo" style={{width:"100px", height:"100px"}} />
                    <div style={{display:"block", marginTop:"20px"}}>
                    <Link to={`/team/${team._id}`} style={{textDecoration:"none"}}>
                    <Button color="secondary">More Details</Button>
                    </Link>
                    </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
        </Box>
    </div>
  )
}

export default RegisteredTeams

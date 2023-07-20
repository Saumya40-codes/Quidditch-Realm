import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Card, CardContent, Button } from '@mui/material'
import Axios from 'axios'
import { Link } from 'react-router-dom'


const Team = () => {
    const { id } = useParams();
    const [team, setTeam] = useState({});

    const getTeam = async () => {
        try {
            const res = await Axios.get(`http://localhost:5000/teams/getTeamDetails/${id}`);
            setTeam(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTeam();
    }, []);

  return (
    <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection:"column" }}>
            <Card sx={{marginTop:"30px", marginBottom:"20px" }}>
                <CardContent style={{display:"flex", justifyContent:"space-between", alignItems:"centre"}}>
                    <div>
                    <h3>{team.teamname}</h3>
                    </div>
                    <Link to={`/admin/add/team/${team._id}`} style={{textDecoration:"none"}}>
                    <Button color="secondary">Edit Details</Button>
                    </Link>
                </CardContent>
            </Card>
        </Box>
    </div>
  )
}

export default Team

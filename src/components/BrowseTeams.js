import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Card, CardContent, TextField, Typography } from '@mui/material';
import Axios from 'axios';
import { faSearch, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BrowseTeams = () => {
  const [allTeams, setAllTeams] = useState([]); 
  const [showTeams, setShowTeams] = useState([]); 

  const getTeams = async () => {
    try {
      const response = await Axios.get('https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/getTeams');
      setAllTeams(response.data);
      setShowTeams(response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "" || searchValue === null) {
      setShowTeams(allTeams); 
    } else {
      const filteredTeams = allTeams.filter((team) => {
        return team.teamname.toLowerCase().includes(searchValue.toLowerCase());
      });
      setShowTeams(filteredTeams);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', marginTop: "60px" }}>
        <Card style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TextField
              id="outlined-basic"
              label="Search Teams"
              variant="outlined"
              style={{ width: "50%", marginTop: "20px", marginBottom: "20px" }}
              onChange={handleSearch}
            />
            <FontAwesomeIcon icon={faSearch} style={{ color: "#2862c8", width: "30px", height: "30px", marginTop: "20px", marginLeft: "25px", cursor:"pointer", marginBottom:"20px" }} />
          </div>
          {showTeams.length === 0 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h5" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", margin: "15px" }}>
                No teams found <FontAwesomeIcon icon={faHourglassHalf} spin />
              </Typography>
            </div>
          )}
          {showTeams.map((team) => (
            <Card key={team.id} style={{ width: "100%", margin: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)" }}>
              <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex",flexDirection:"column" }}>
                  <Typography variant="h5" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px", fontWeight:"bold" }}>
                    {team?.teamname}
                  </Typography>
                  <Typography variant="h5" component="h1" gutterBottom style={{ display:"block", fontFamily: "italic", fontSize: "12px", marginBottom: "5px", marginTop:"3px" }}>
                   {team?.teamdescription.length > 100 ? team.teamdescription.substring(0,100) + "..." : team.teamdescription}
                   <Link to={`/team/${team._id}`} style={{textDecoration:"none"}}>
                     More
                   </Link>
                 </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={team.teamlogo} alt="teamlogo" style={{ width: "175px", height: "150px",margin: "20px" }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </Card>
      </Box>
    </div>
  )
}

export default BrowseTeams;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { TextField, Box, Card, CardContent, Input, Menu, MenuItem, Button, Typography, Select } from '@mui/material';
import noUser from '../assets/noUser.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const userId = useSelector(state => state.id);
  const isAdmin = useSelector(state => state.isAdmin);

  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [favouriteTeam, setFavouriteTeam] = useState('' || user.favouriteTeam);
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/users/${userId}`);
      setUser(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setProfilePic(res.data.profilePic);
      setFavouriteTeam(res.data.favouriteTeam);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getTeams = async () => {
    try {
      const res = await Axios.get('http://localhost:5000/teams/getTeams');
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(!open)
  };

  const handleTeamChange = async (teamname) => {
    setFavouriteTeam(teamname);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async() =>{
    try{
      const res = await Axios.put(`http://localhost:5000/users/updateProfile/${userId}`, {
        username: username,
        email: email,
        profilePic: profilePic,
        favouriteTeam: favouriteTeam
      })
      .then((res) => {
        toast.success("Profile updated successfully!", {autoClose: 2000});
        setTimeout(()=>{
            isAdmin ? navigate('/admin') : navigate('/dashboard');
        },1000);
        })
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height:"100%" }}>
        <Card sx={{ width: "100%", margin: 'auto', marginTop: 10 }}>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "200px" }}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={username}
                  inputProps={{ style: { width: "580px" } }}
                  style={{ display: "block", marginBottom: "30px" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  inputProps={{ style: { width: "580px" } }}
                  style={{ marginBottom: "30px" }}
                />
              </div>
              <div style={{ marginRight: "200px" }}>
                  <img
                    src={profilePic ? profilePic : noUser}
                    alt="profile"
                    style={{
                      display: 'block',
                      width: '250px',
                      height: '250px',
                      borderRadius: '50%',
                      marginBottom: '20px',
                      objectFit: 'cover',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                <Input type="file" id="file1" onChange={handleProfileChange} style={{ paddingRight: '250px' }} required />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "55px", marginLeft: "200px", flexDirection: "column" }}>
              {!favouriteTeam ? (
                <Typography variant="subtitle1" color="textSecondary" style={{marginBottom:"10px"}}>
                  You haven't selected your favourite team yet. Choose one and get regular updates!
                </Typography>
              ) : (
                <Typography variant="subtitle1" color="textSecondary" style={{marginBottom:"10px"}}>
                  Your selected favourite team is: {favouriteTeam}
                </Typography>
              )}
              <Button
                variant="contained"
                size="small"
                sx={{ flex: 1, maxWidth: "150px", marginTop: "10px" }}
                onClick={handleOpenMenu}
                id="teamButton"
              >
                {favouriteTeam ? "Edit Selection" : "Choose Team"}
              </Button>
              <Menu
              id="simple-menu"
              anchorEl={document.getElementById("teamButton")}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {teams.map((team) => (
                <MenuItem key={team._id} onClick={(e) => handleTeamChange(team.teamname)} style={{fontFamily:"italic"}}>
                  {team.teamname}
                </MenuItem>
              ))}
            </Menu>
            </div>
          </CardContent>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "55px", marginBottom:"25px"}}>
            <Button
                variant="contained"
                size="large"
                sx={{ flex: 1, maxWidth: "380px"}}
                onClick={handleSubmit}
                >
                Save
            </Button>
            </div>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;

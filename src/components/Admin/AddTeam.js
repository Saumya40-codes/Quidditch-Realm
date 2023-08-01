import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, Input } from '@mui/material';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';

const AddTeam = ({mode}) => {
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState({ seekers: [], keepers: [], beaters: [], chasers: [] });
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [hometown, setHometown] = useState('');
  const [team, setTeam] = useState({});
  const { id } = useParams();

  const getTeam = async () => {
    try {
      const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/getTeamDetails/${id}`)
      .then((res) => {
        setTeam(res.data);
        setTeamName(res.data.teamname);
        setLogo(res.data.teamlogo);
        setHometown(res.data.hometown);
        setPlayers(res.data.teammembers);
        setDescription(res.data.teamdescription);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeam();
  }, [team]);

  const navigate = useNavigate();

  const handlePlayerChange = (role, index, event) => {
    const updatedPlayers = { ...players };
    updatedPlayers[role][index] = event.target.value;
    setPlayers(updatedPlayers);
  };

  const addPlayer = (role) => {
    const updatedPlayers = { ...players };
    updatedPlayers[role].push('');
    setPlayers(updatedPlayers);
  };

  const removePlayer = (role, index) => {
    const updatedPlayers = { ...players };
    updatedPlayers[role].splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      Axios.post('https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/addTeam', {
        teamdescription: description,
        teamname: teamName,
        teamlogo: logo,
        hometown: hometown,
        teammembers: players,
        registerDate: new Date(),
        updatedDate: new Date(),
      }).then((res) => {
        toast.success('Team Added Successfully', { autoClose: 3000 });
        setTimeout(() => {
            navigate('/admin');
            }, 2000);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    try {
      Axios.put(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/updateTeam/${id}`, {
        teamdescription: description,
        teamname: teamName,
        teamlogo: logo,
        hometown: hometown,
        teammembers: players,
        updatedDate: new Date(),
      }).then((res) => {
        toast.success('Team Updated Successfully', { autoClose: 3000 });
        setTimeout(() => {
            navigate('/admin');
            }, 2000);
      });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div style={{ backgroundColor: '#b5b2ff', padding: '20px' }}>
        <ToastContainer />
      <Card>
        <CardContent style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" component="h2" style={{ color: '#663399' }}>
            Add Team
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Team Name"
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              required
              style={{ width: '100%', marginTop: '20px', marginBottom: '40px' }}
              InputProps={{ style: { color: '#663399' } }}
              InputLabelProps={{ style: { color: '#663399' } }}
            />
            <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            multiline
            rows={4}
            style={{ width: '100%', marginTop: '20px', marginBottom: '40px' }}
            InputProps={{ style: { color: '#663399' } }}
            InputLabelProps={{ style: { color: '#663399' } }}
          />
            <TextField
              label="Hometown"
              value={hometown}
              onChange={(event) => setHometown(event.target.value)}
              style={{ width: '100%', marginTop: '20px', marginBottom: '40px' }}
              InputProps={{ style: { color: '#663399' } }}
              InputLabelProps={{ style: { color: '#663399' } }}
            />
            <label htmlFor="logo" />
            <Typography variant="h5" component="h4" style={{ color: '#663399', marginBottom: '20px' }}>
              Add Team Logo
            </Typography>
            <div style={{ display: 'flex', marginBottom: '20px', columnGap: '60px' }}>
              <Input type="file" id="file1" style={{ paddingRight: '250px' }} onChange={handleLogoChange} required />
              {logo && <img src={logo} style={{ height: '100px', width: '100px' }} />}
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                <div style={{ marginRight: '20px' }}>
                  <Typography variant="h6" component="h4" style={{ color: '#663399', marginBottom: '10px' }}>
                    Seekers
                  </Typography>
                  {players?.seekers.map((player, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '20px',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      <TextField
                        label={`Seeker ${index + 1}`}
                        value={player}
                        onChange={(event) => handlePlayerChange('seekers', index, event)}
                        required
                        style={{ color: '#663399' }}
                        InputProps={{ style: { color: '#663399' } }}
                        InputLabelProps={{ style: { color: '#663399' } }}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => removePlayer('seekers', index)}
                        style={{ marginLeft: '20px', marginTop: '15px', marginLeft: '60px', color: '#663399' }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div
                    style={{
                      marginBottom: '20px',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => addPlayer('seekers')}
                      style={{ marginTop: '20px', color: '#663399' }}
                    >
                      Add Seeker
                    </Button>
                  </div>
                </div>
                <div style={{ marginRight: '20px' }}>
                  <Typography variant="h6" component="h4" style={{ color: '#663399', marginBottom: '10px' }}>
                    Keepers
                  </Typography>
                  {players?.keepers.map((player, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '20px',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      <TextField
                        label={`Keeper ${index + 1}`}
                        value={player}
                        onChange={(event) => handlePlayerChange('keepers', index, event)}
                        required
                        style={{ color: '#663399' }}
                        InputProps={{ style: { color: '#663399' } }}
                        InputLabelProps={{ style: { color: '#663399' } }}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => removePlayer('keepers', index)}
                        style={{ marginLeft: '20px', marginTop: '15px', marginLeft: '60px', color: '#663399' }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div
                    style={{
                      marginBottom: '20px',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => addPlayer('keepers')}
                      style={{ marginTop: '20px', color: '#663399' }}
                    >
                      Add Keeper
                    </Button>
                  </div>
                </div>
                <div style={{ marginRight: '20px' }}>
                  <Typography variant="h6" component="h4" style={{ color: '#663399', marginBottom: '10px' }}>
                    Beaters
                  </Typography>
                  {players?.beaters.map((player, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '20px',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      <TextField
                        label={`Beater ${index + 1}`}
                        value={player}
                        onChange={(event) => handlePlayerChange('beaters', index, event)}
                        required
                        style={{ color: '#663399' }}
                        InputProps={{ style: { color: '#663399' } }}
                        InputLabelProps={{ style: { color: '#663399' } }}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => removePlayer('beaters', index)}
                        style={{ marginLeft: '20px', marginTop: '15px', marginLeft: '60px', color: '#663399' }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div
                    style={{
                      marginBottom: '20px',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => addPlayer('beaters')}
                      style={{ marginTop: '20px', color: '#663399' }}
                    >
                      Add Beater
                    </Button>
                  </div>
                </div>
                <div>
                  <Typography variant="h6" component="h4" style={{ color: '#663399', marginBottom: '10px' }}>
                    Chasers
                  </Typography>
                  {players?.chasers.map((player, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '20px',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      <TextField
                        label={`Chaser ${index + 1}`}
                        value={player}
                        onChange={(event) => handlePlayerChange('chasers', index, event)}
                        required
                        style={{ color: '#663399' }}
                        InputProps={{ style: { color: '#663399' } }}
                        InputLabelProps={{ style: { color: '#663399' } }}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => removePlayer('chasers', index)}
                        style={{ marginLeft: '20px', marginTop: '15px', marginLeft: '60px', color: '#663399' }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div
                    style={{
                      marginBottom: '20px',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => addPlayer('chasers')}
                      style={{ marginTop: '20px', color: '#663399' }}
                    >
                      Add Chaser
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '40px', width: '100%' }}
            onClick={mode === 'add' ? handleSubmit : handleEdit}
            >
              {mode === 'add' ? 'Add Team' : 'Edit Team'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeam;

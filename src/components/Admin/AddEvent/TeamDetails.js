import React, { useState } from 'react';
import { Card, CardContent, TextField, FormGroup, FormControl, Input, InputLabel } from '@mui/material';
import { useEffect } from 'react';

const TeamDetails = ({ handleFormChange, formchanged }) => {
    let [img1, setImg1] = useState('');
    let [img2, setImg2] = useState('');
  
    const [format, setformat] = useState(formchanged.format);
    const [team1, setTeam1] = useState(formchanged.team1);
    const [team2, setTeam2] = useState(formchanged.team2);
    const [team1logo, setTeam1Logo] = useState(formchanged.team1logo);
    const [team2logo, setTeam2Logo] = useState(formchanged.team2logo);

    useEffect(() => {
        setTeam1Logo(formchanged.team1logo);
        setTeam2Logo(formchanged.team2logo);
    }, [formchanged.team1logo, formchanged.team2logo]);
  
    const handleFileChange1 = (event) => {
      const file = event.target.files[0];
      handleFormChange('team1logo', file);
    };
  
    const handleFileChange2 = (event) => {
      const file = event.target.files[0];
      handleFormChange('team2logo', file);
    };
  
    return (
      <div>
        <Card style={{ marginTop: '20px' }}>
          <CardContent>
            <h2 className="text-center mb-4">Team Details</h2>
            <FormGroup>
              <TextField
                id="match-format"
                label="Match Format"
                type="search"
                onChange={(e) => handleFormChange('format', e.target.value)}
                value={format}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {team1logo && (
                  <img
                    src={URL.createObjectURL(team1logo)}
                    style={{ height: '120px', width: '120px', marginLeft: '250px', marginTop: '10px' }}
                  />
                )}
                {team2logo && (
                  <img
                    src={URL.createObjectURL(team2logo)}
                    style={{ height: '140px', width: '140px', marginRight: '250px', marginTop: '10px' }}
                  />
                )}
              </div>
  
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="team1"
                  label="Team 1"
                  type="search"
                  style={{ marginTop: '40px', width: '560px' }}
                  onChange={(e) => {
                    handleFormChange('team1', e.target.value);
                  }}
                  value={team1}
                />
  
                <TextField
                  id="team2"
                  label="Team 2"
                  type="search"
                  style={{ marginTop: '40px', width: '560px' }}
                  onChange={(e) => {
                    handleFormChange('team2', e.target.value);
                  }}
                  value={team2}
                />
              </div>
  
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                <FormControl>
                  <h3 style={{ textDecoration: 'none', fontWeight: '100', color: 'grey', fontSize: '20px' }}>
                    Add/Update team1 logo
                  </h3>
                  <Input type="file" id="file1" onChange={handleFileChange1} style={{ paddingRight: '250px' }} />
                </FormControl>
  
                <FormControl>
                  <h3 style={{ textDecoration: 'none', fontWeight: '100', color: 'grey', fontSize: '20px' }}>
                    Add/Update team2 logo
                  </h3>
                  <Input type="file" id="file2" onChange={handleFileChange2} style={{ paddingRight: '250px' }} />
                </FormControl>
              </div>
            </FormGroup>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default TeamDetails;
  
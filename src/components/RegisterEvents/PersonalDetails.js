import React from 'react'
import { Typography, TextField,Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

const PersonalDetails = () => {
    const user = useSelector(state => state.user);
  return (
    <div>
      <Card style={{marginTop:"40px"}}>
        <CardContent>
            <Typography variant="h5" style={{fontFamily:"Harry Potter", marginBottom:"20px"}}>Personal Details</Typography>
            <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={user.username}
                style={{marginBottom:"40px"}}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Email"   
                variant="outlined"
                value={user.email}
                style={{marginBottom:"40px"}}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                style={{marginBottom:"40px"}}
                fullWidth
            />
        </CardContent>
      </Card>
    </div>
  )
}

export default PersonalDetails
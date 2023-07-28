import React from 'react'
import { Typography, TextField,Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const PersonalDetails = ({formChange, handleFormChange}) => {
    const user = useSelector(state => state.user);
    const [email,setEmail] = useState(formChange.email);
    const [phone, setPhone] = useState(formChange.phone);

    useEffect(()=>{
      setEmail(formChange.email);
      setPhone(formChange.phone);
    },[formChange.email,formChange.phone])

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
                style={{marginBottom:"60px"}}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Email"   
                variant="outlined"
                value={email}
                onChange={(e)=>handleFormChange(e,'email',e.target.value)}
                style={{marginBottom:"60px"}}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Phone Number"
                value={phone}
                variant="outlined"
                onChange={(e)=>handleFormChange(e,'phone',e.target.value)}
                style={{marginBottom:"60px"}}
                fullWidth
            />
        </CardContent>
      </Card>
    </div>
  )
}

export default PersonalDetails
import { FormGroup, FormControl } from "@mui/material"
import { TextField } from "@mui/material"
import { Card, CardContent } from "@mui/material"
import defaultvenue from '../../../assets/defaultvenue.jpeg';
import { useState } from "react";
import { Input } from "@mui/material";

const AboutRegister = ({ handleFormChange, formchanged }) => {
    const [venue, setVenue] = useState(defaultvenue);
    const [deadline, setDeadline] = useState(formchanged.deadline);
    const [rules, setRules] = useState(formchanged.rules);

    
const handleFileChange3 = (event) => {
    const file = event.target.files[0];
    setVenue(URL.createObjectURL(file));
    handleFormChange('venueimage', file);
    };

  return (
    <div>
      <Card  style={{marginTop:"40px"}}>
        <CardContent>   
            <h2 className="text-center mb-4">About Register</h2>
            <FormGroup>
            <FormControl>
            <h4>Venue Image(default)</h4>
                <img 
                src={venue}
                style={{ height: '240px', width: '55%', marginLeft: '250px', marginTop: '10px' }}
                />
                Change/Update Venue Image
                <Input type="file" id="file1" onChange={handleFileChange3} style={{ paddingRight: '250px', marginBottom:"40px" }} />
            </FormControl>
                <FormControl>
                <TextField id="date" type="date" variant="filled" onChange={(e) => handleFormChange('deadline', e.target.value)} value={deadline}  />
                </FormControl>
                <FormControl>
                <TextField id="outlined-search" label="Rules and regulation(if any)" type="search" style={{marginTop:"40px"}} onChange={(e) => handleFormChange('startingfee',e.target.value)} value={rules} />
                </FormControl>
            </FormGroup>
        </CardContent>
        </Card>
    </div>
  )
}

export default AboutRegister

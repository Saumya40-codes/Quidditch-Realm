import { FormGroup, FormControl } from "@mui/material"
import { InputLabel, Input, TextField } from "@mui/material"
import { Grid, Button, Card, CardContent } from "@mui/material"

const EventDetails = ({handleFormChange}) => {
  return (
    <div>
        <Card  style={{marginTop:"40px"}}>
        <CardContent>
                    <h2 className="text-center mb-4">Add Event</h2>
                    <FormGroup>
                        <FormControl>
                        <TextField id="outlined-search" label="Event title" type="search" onChange={(e) => handleFormChange("title",e.target.value)}/>
                        </FormControl>
                        <FormControl>
                        <TextField id="outlined-search" label="Description" type="search" style={{marginTop:"40px"}} onChange={(e) => handleFormChange("description",e.target.value)} />
                        </FormControl>
                        <FormControl>
                        <TextField id="outlined-search" label="Venue" type="search" style={{marginTop:"40px"}} onChange={(e) => handleFormChange("venue",e.target.value)} />
                        </FormControl>
                        <FormControl>
                        <TextField id="outlined-search" label="Venue Size" type="number" style={{marginTop:"40px"}} onChange={(e) => handleFormChange("venueSize",e.target.value)} />
                        </FormControl>
                        <FormControl>
                        <h4 style={{marginTop:"40px"}}>Date & Time</h4>
                        <TextField id="date" type="date" variant="filled" onChange={(e) => handleFormChange('date', e.target.value)} /> <TextField id="time" type="time" variant="filled" style={{marginBottom:"20px"}} onChange={(e) => handleFormChange('time', e.target.value)} />
                        </FormControl>
                    </FormGroup>
        </CardContent>
        </Card>
    </div>
  )
}

export default EventDetails

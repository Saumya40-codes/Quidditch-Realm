import { FormGroup, FormControl } from "@mui/material"
import { InputLabel, Input, TextField } from "@mui/material"
import { Grid, Button, Card, CardContent } from "@mui/material"
import { useState } from "react"

const EventDetails = ({handleFormChange, formchanged}) => {
  const [title, setTitle] = useState(formchanged.title);
  const [description, setDescription] = useState(formchanged.description);
  const [venue, setVenue] = useState(formchanged.venue);
  const [venuesize, setVenueSize] = useState(formchanged.venuesize);
  const [date, setDate] = useState(formchanged.date);
  const [time, setTime] = useState(formchanged.time);

  return (
    <div>
        <Card  style={{marginTop:"40px"}}>
        <CardContent>
                    <h2 className="text-center mb-4">Add Event</h2>
                    <FormGroup>
                        <FormControl>
                        <TextField id="outlined-search" label="Event title" type="search" onChange={(e) => handleFormChange("title",e.target.value)} value={title}/>
                        </FormControl>
                        <FormControl>
                        <TextField id="outlined-search" label="Description" type="search" style={{marginTop:"40px"}} onChange={(e) => handleFormChange("description",e.target.value)} value={description} />
                        </FormControl>
                        <FormControl>
                        <TextField id="outlined-search" label="Venue" type="search" style={{marginTop:"40px"}} onChange={(e) => handleFormChange("venue",e.target.value)} value={venue} />
                        </FormControl>
                        <FormControl>
                        <TextField id="outlined-search" label="Venue Size" type="number" style={{marginTop:"40px"}} onChange={(e) => handleFormChange("venuesize",e.target.value)} value={venuesize} />
                        </FormControl>
                        <FormControl>
                        <h4 style={{marginTop:"40px"}}>Date & Time</h4>
                        <TextField id="date" type="date" variant="filled" onChange={(e) => handleFormChange('date', e.target.value)} /> <TextField id="time" type="time" variant="filled" style={{marginBottom:"20px"}} onChange={(e) => handleFormChange('time', e.target.value)} value={date} />
                        </FormControl>
                    </FormGroup>
        </CardContent>
        </Card>
    </div>
  )
}

export default EventDetails

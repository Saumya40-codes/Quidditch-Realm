import { FormGroup, FormControl } from "@mui/material";
import { InputLabel, Input, TextField } from "@mui/material";
import { Grid, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const EventDetails = ({ handleFormChange, formchanged }) => {
  const [title, setTitle] = useState(formchanged.title);
  const [description, setDescription] = useState(formchanged.description);
  const [venue, setVenue] = useState(formchanged.venue);
  const [venuesize, setVenueSize] = useState(formchanged.venuesize);
  const [date, setDate] = useState(formchanged.date);
  const [time, setTime] = useState(formchanged.time);

  useEffect(() => {
    setTitle(formchanged.title || "");
    setDescription(formchanged.description || "");
    setVenue(formchanged.venue || "");
    setVenueSize(formchanged.venuesize || "");
    setDate(formchanged.date || "");
    setTime(formchanged.time || "");
  }, [formchanged]);

  return (
    <div>
      <Card style={{ marginTop: "40px" }}>
        <CardContent>
          <h2 className="text-center mb-4">Add Event</h2>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="title">Event title</InputLabel>
              <Input
                id="title"
                type="search"
                onChange={(e) => handleFormChange("title", e.target.value)}
                value={title}
                required
              />
            </FormControl>
            <FormControl style={{marginTop:"40px"}}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                type="search"
                onChange={(e) => handleFormChange("description", e.target.value)}
                value={description}
                required
              />
            </FormControl>
            <FormControl style={{marginTop:"40px"}}>
              <InputLabel htmlFor="venue">Venue</InputLabel>
              <Input
                id="venue"
                type="search"
                onChange={(e) => handleFormChange("venue", e.target.value)}
                value={venue}
                required
              />
            </FormControl>
            <FormControl style={{marginTop:"40px"}}>
              <InputLabel htmlFor="venuesize">Venue Size</InputLabel>
              <Input
                id="venuesize"
                type="number"
                onChange={(e) => handleFormChange("venuesize", e.target.value)}
                value={venuesize}
                required
              />
            </FormControl>
            <FormControl style={{marginTop:"40px"}}>
              <h4 style={{ marginTop: "40px" }}>Date & Time</h4>
              <TextField
                id="date"
                type="date"
                variant="filled"
                onChange={(e) => handleFormChange("date", e.target.value)}
                value={date}
                required
              />{" "}
              <TextField
                id="time"
                type="time"
                variant="filled"
                style={{ marginBottom: "20px" }}
                onChange={(e) => handleFormChange("time", e.target.value)}
                value={time}
                required
              />
            </FormControl>
          </FormGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;

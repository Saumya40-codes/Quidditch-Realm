import { useState } from 'react';
import { Card, CardContent, Button, TextField } from '@mui/material';
import { useEffect } from 'react';

const AboutRegister = ({ handleFormChange, formchanged, add, update, del, ticket }) => {
  const [deadline, setDeadline] = useState(formchanged.deadline);
  const [rules, setRules] = useState(formchanged.rules || []);

  useEffect(() => {
    setDeadline(formchanged.deadline);
    setRules(formchanged.rules);
  }, [formchanged.deadline, formchanged.rules]);

  return (
    <div>
      <Card style={{ marginTop: '40px' }}>
        <CardContent>
          <h2 className="text-center mb-4">Ticket Details</h2>
          <TextField
            id="date"
            type="date"
            variant="filled"
            label="Registration Deadline"
            style={{ marginTop: '20px', width: '100%' }}
            onChange={(e) => handleFormChange('deadline', e.target.value)}
            value={deadline}
            required
          />
          <TextField
            id="outlined-search"
            label="Rules and regulation (if any)"
            type="search"
            style={{ marginTop: '35px', width: '100%' }}
            onChange={(e) => handleFormChange('rules', e.target.value)}
            value={rules}
          />
          <div style={{ marginTop: '35px' }}>
            {ticket.map((ticket, index) => (
              <div key={index}>
                <TextField
                  label={`Ticket Type ${index + 1}`}
                  value={ticket.type}
                  onChange={(e) => update(index, 'type', e.target.value)}
                  style={{ marginRight: '20px', marginBottom: '20px' }}
                />
                <TextField
                  label="Price"
                  value={ticket.price}
                  onChange={(e) => update(index, 'price', Number(e.target.value))}
                  style={{ marginRight: '20px', marginBottom: '20px', width: '110px' }}
                />
                <TextField
                  type="number"
                  label="Amount"
                  value={ticket.amount}
                  onChange={(e) => update(index, 'amount', Number(e.target.value))}
                  style={{ marginRight: '20px', marginBottom: '20px', width: '100px' }}
                />
                <TextField
                    label="Accomodation"
                    value={ticket.accom}
                    onChange={(e) => update(index, 'accom', e.target.value)}
                    style={{ marginRight: '20px', marginBottom: '20px', width: '690px' }}
                    />
                <Button variant="contained" onClick={() => del(index)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <Button variant="contained" onClick={add}>
            Add Ticket
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutRegister;

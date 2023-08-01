import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import EventDetails from './EventDetails';
import TeamDetails from './TeamDetails';
import AboutRegister from './AboutRegister';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const steps = ['Event Details', 'Team Details', 'Additionals'];

export default function HorizontalLinearStepper({ mode }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [ticket, setTicket] = useState([]);
  const userId = useSelector((state) => state.id);


  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...ticket];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };
    setTicket(updatedTickets);
  };

  const handleAddTicket = () => {
    setTicket([
      ...ticket,
      { type: "", price: "", accom: "", amount: "" }
    ]);
  };

  const handleDeleteTicket = (index) => {
    const updatedTickets = [...ticket];
    updatedTickets.splice(index, 1);
    setTicket(updatedTickets);
  };

  const today = new Date();

  const [formchanged, setFormChanged] = useState({
    date: today.toISOString().split('T')[0],
    deadline: today.toISOString().split('T')[0], 
    description: '',
    endtime: '',
    format: '',
    rules: '',
    team1: '',
    team1logo: '',
    team2: '',
    team2logo: '',
    time: '',
    title: '',
    venue: '',
    venuesize: '',
  });

  const [eventId, setEventId] = useState('');

  const { id } = useParams();

  const navigate = useNavigate();

  const getDetails = async () => {
    Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/get/${id}`)
      .then((res) => {
        setFormChanged(res.data);
        setTicket(res.data.ticket)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (mode === 'edit') {
      getDetails();
    }
  }, [mode, id]);

  React.useEffect(() => {
    
  }, [ticket]);
  

  const handleFormChange = (name, value) => {
    setFormChanged({ ...formchanged, [name]: value });
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const checkEmpty = Object.keys(formchanged).map((val)=>formchanged[val])
    const arr = [...checkEmpty];
    if(arr.includes('')){
      console.log(arr);
      toast.error('Please make sure all fields are filled correcly', {autoClose:3500});
      return;
    }
    Axios.post('https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/add', {
      ...formchanged,
      ticket: ticket,
    })
      .then(async (res) => {
        toast.success('Event Added Successfully', { autoClose: 3500 });
        setFormChanged({});
        setTicket([])
        const date = String(formchanged.date).substring(0, 10);
        const time = String(formchanged.endtime).substring(0, 5);
        const dateTime = `${date}T${time}:00.000+05:30`;
        setTimeout(() => {
          navigate('/admin');
        }, 3000);
        const resss = await Axios.put(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/users/addNotification/${userId}`, {
          message: `Match between ${formchanged.team1} and ${formchanged.team2} has been ended. Please add the post match details. If not already added. ${dateTime}`,
          date: dateTime,
          receiver: userId,
        })
      })
  };
  
  

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formchanged,
      ticket: ticket,
    };
    console.log(updatedData);
    Axios.put(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/update/${id}`, updatedData)
      .then((res) => {
        setFormChanged({});
        toast.success('Event Edited Successfully', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/schedule');
        }, 2000);
      })
      .catch((err) => {
        toast.error('Event Edit Failed', { autoClose: 3000 });
      });
  };
  
  

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormChanged({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ToastContainer />
      <Stepper activeStep={activeStep} sx={{ pt: 4 }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ position: 'fixed', bottom: '16px', left: '16px' }}
            >
              Back
            </Button>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - want to add this event?</Typography>

            {mode === 'add' && <Button onClick={handleFormSubmit}>Submit</Button>}
            {mode === 'edit' && <Button onClick={handleEdit}>Edit</Button>}
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <EventDetails handleFormChange={handleFormChange} formchanged={formchanged} />}
          {activeStep === 1 && <TeamDetails handleFormChange={handleFormChange} formchanged={formchanged} />}
          {activeStep === 2 && (
  <AboutRegister
    handleFormChange={handleFormChange}
    formchanged={formchanged}
    add={handleAddTicket} 
    update={handleTicketChange}
    del={handleDeleteTicket}
    ticket={ticket}
  />
)}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ position: 'fixed', bottom: '16px', left: '16px' }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} sx={{ position: 'fixed', bottom: '16px', right: '16px' }}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

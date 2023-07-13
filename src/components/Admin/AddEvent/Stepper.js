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
import  Axios  from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const steps = ['Event Details', 'Team Details', 'Additionals'];

export default function HorizontalLinearStepper({mode}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formData, setFormData] = useState({});
  const [formchanged, setFormChanged] = useState({});
  const [eventId, setEventId] = useState('');


  const {id} = useParams();

  const navigate = useNavigate();

  //edit func
  const [eventDetails, setEventDetails] = useState({});

    const getDetails = async () => {
      Axios.get(`http://localhost:5000/events/get/${id}`)
    .then((res)=>{
      setFormChanged(res.data);
      console.log(formchanged)
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  React.useEffect(() => {
    if (mode === 'edit') {
      getDetails();
    }
    console.log(formchanged);
  }, [mode]);
  


  const handleFormChange = (name,value) => {
    setFormChanged({...formchanged, [name]: value});
    console.log(formchanged);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formchanged);
    Axios.post('http://localhost:5000/events/add', formchanged)
    .then((res)=>{
      setFormChanged({});
      toast.success('Event Added Successfully', { autoClose: 3000 });
      setTimeout(() => {
        navigate('/admin');
    },2000)
  })
    .catch((err)=>{
      toast.error('Event Addition Failed', { autoClose: 3000 });
    })
}

  const handleEdit = async (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:5000/events/update/${id}`, formchanged)
    .then((res)=>{
      setFormChanged({});
      toast.success('Event Edited Successfully', { autoClose: 3000 });
      setTimeout(() => {
        navigate('/admin');
    },2000)
  })
}


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
      <Stepper activeStep={activeStep}>
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:"column"}}>
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - want to add this event?
        </Typography>

        {mode == 'add' && <Button onClick={handleFormSubmit}>Submit</Button>}
        {mode === 'edit' && <Button onClick = {handleEdit}>Edit</Button>}
        <Button onClick={handleReset}>Reset</Button>
        </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
        {activeStep === 0 && <EventDetails handleFormChange={handleFormChange} formchanged={formchanged} /> }
      {activeStep === 1 && <TeamDetails    handleFormChange={handleFormChange} formchanged={formchanged} /> }
      {activeStep === 2 && <AboutRegister handleFormChange={handleFormChange}  formchanged={formchanged} /> }
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
            <Button onClick={handleNext}
            sx={{ position: 'fixed', bottom: '16px', right: '16px' }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
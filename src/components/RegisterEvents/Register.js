import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import  Axios  from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import TicketDetails from './TicketDetails';
import { useSelector } from 'react-redux';
import Payment from './Payment';

const steps = ['Personal Details', 'Ticket Selection', 'Payment'];


export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const userId = useSelector((state)=>state.user);
  const [ticketQuantity, setTicketQuantity] = useState([]);
  const [buyClicked, setBuyClicked] = useState([]);



  const handleTicketQuantityChange = async (event, index, newValue, ticketPrice) => {
    const newTicketQuantity = [...ticketQuantity];
    newTicketQuantity[index] = newValue;
    setTicketQuantity(newTicketQuantity);
    setFormChanged((prevFormChange) => ({
      ...prevFormChange,
      ticket_quantity: Number(newValue),
      total_price: Number(newTicketQuantity[index]) * Number(ticketPrice),
    }));
  };

  const handleBuyClick = (ticketId) => () => {
    setBuyClicked((prevBuyClicked) => ({
      ...prevBuyClicked,
      [ticketId]: !prevBuyClicked[ticketId],
    }));
  };

  const [formChange, setFormChanged] = useState({
    eventID:'', 
    userID:userId.id, 
    name:userId.username, 
    email:userId.email, 
    phone:'', 
    ticket_type:'', 
    ticket_quantity:0, 
    payment:false, 
    total_price:0,
  });

  const handleFormChange = (e,data,value) =>{
    console.log(data,value);
    setFormChanged({...formChange,[data]:value})
    console.log(formChange)
  }



  const {id} = useParams();

  const navigate = useNavigate();

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
      <Stepper activeStep={activeStep} style={{marginTop:"10px"}}>
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
          All steps completed - want to register for this event?
        </Typography>

        <Button onClick={handleReset}>Reset</Button>
        </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
      {activeStep === 0 && <PersonalDetails formChange={formChange} handleFormChange={handleFormChange} /> }
      {activeStep === 1 && <TicketDetails formChange={formChange} handleFormChange={handleFormChange} handleTicketQuantityChange={handleTicketQuantityChange} ticketQuantity={ticketQuantity} setTicketQuantity={setTicketQuantity} 
      buyClicked={buyClicked} setBuyClicked={setBuyClicked} handleBuyClick={handleBuyClick} /> 
      }
      {activeStep === 2 && <Payment formChange={formChange} handleFormChange={handleFormChange} /> }
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
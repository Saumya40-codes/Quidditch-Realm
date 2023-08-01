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
  const useridd = useSelector((state)=>state.id);
  const [ticketQuantity, setTicketQuantity] = useState([]);
  const [buyClicked, setBuyClicked] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [event, setEvents] = useState([]);
  

  const {id} = useParams();

  const getEvents = async () => {
    try {
      const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/get/${id}`)
      .then((res)=>{
        setEvents(res.data);
        setTickets(res.data.ticket);
      })
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(()=>{
    getEvents();
  },[tickets]);

  const handleTicketQuantityChange = async (event, index, newValue, ticketPrice, type) => {
    if(newValue > tickets.amount){
      newValue = tickets.amount;
    }
    const newTicketQuantity = [...ticketQuantity];
    newTicketQuantity[index] = newValue;
    setTicketQuantity(newTicketQuantity);
    setFormChanged((prevFormChange) => ({
      ...prevFormChange,
      ticket_quantity: Number(newValue),
      total_price: Number(newTicketQuantity[index]) * Number(ticketPrice),
      ticket_type: type,
    }));
  };

  const handleBuyClick = (ticketId) => () => {
    setBuyClicked((prevBuyClicked) => ({
      ...prevBuyClicked,
      [ticketId]: !prevBuyClicked[ticketId],
    }));
  };

  const [formChange, setFormChanged] = useState({
    eventID:id,
    userID:useridd, 
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

  const handleFormSubmit = async(e) =>{
    e.preventDefault();
    const checkEmpty = Object.keys(formChange).map((val)=>formChange[val])
    const arr = [...checkEmpty];
    const toChange = [...tickets]
    toChange.forEach((val) => {
      if (val.type === formChange.ticket_type) {
        val.amount -= formChange.ticket_quantity;
      }
    });
    setTickets(toChange);
    if(arr.includes(''||0)){
      toast.error('Please make sure all fields are filled correcly', {autoClose:3500});
      return;
    }
    try{
      const res = await Axios.post('https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/reg/register/events',{
        ...formChange
      })
      .then(async (res)=>{
        setTimeout(()=>{
          navigate(`/more-details/${id}`)
        },3000)

        toast.success('You have been successfully registered for the event!!', {autoClose:3500});

        const resp = await Axios.put(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/tickets/change/${id}`,{
          ticket : tickets,
          ticketSold :  event.ticketSold + formChange.ticket_quantity,
          totalSale : event.totalSale + formChange.total_price,
        })
        setFormChanged({});
      })
    }
    catch(err){
      toast.error('Event registration failed', {autoClose:3500});
      console.log(err);
    }
  }

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
        <Button onClick={(e)=>handleFormSubmit(e)}> Register </Button>
        <Button onClick={handleReset}>Reset</Button>
        </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
      {activeStep === 0 && <PersonalDetails formChange={formChange} handleFormChange={handleFormChange} /> }
      {activeStep === 1 && <TicketDetails formChange={formChange} handleFormChange={handleFormChange} handleTicketQuantityChange={handleTicketQuantityChange} ticketQuantity={ticketQuantity} setTicketQuantity={setTicketQuantity} 
      buyClicked={buyClicked} setBuyClicked={setBuyClicked} handleBuyClick={handleBuyClick} /> 
      }
      {activeStep === 2  && <Payment formChange={formChange} handleFormChange={handleFormChange} /> }
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
            <Button onClick={handleNext} disabled={activeStep === 1 && formChange.total_price === 0}
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
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

const steps = ['Personal Details', 'Ticket Selection', 'Payment'];


export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formChange, setFormChanged] = useState({});

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
      {activeStep === 0 && <PersonalDetails /> }
      {activeStep === 1 && "Ticker selection" }
      {activeStep === 2 && "Payment" }
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
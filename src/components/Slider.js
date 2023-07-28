import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import slider1 from '../assets/slider1.jpeg';
import slider2 from '../assets/slider2.jpg';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loading from '../assets/loading.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Slider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [pastEvents, setPastEvents] = useState([]);

  const getPastEvents = async () => {
    try {
      const res = await Axios.get('http://localhost:5000/events/past');
      setPastEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPastEvents();
  }, []);

  const images = [slider1, slider2]

  const events = pastEvents.map((event, index) => ({
    id: event._id,
    imgPath: images[index % images.length],
    team1score: event.team1score,
    team2score: event.team2score,
    team1: event.team1,
    team2: event.team2,
  }));

  const maxSteps = events.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  
  return (
    <div className="slider-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center" }}>
      <Box sx={{marginTop: "30px", width: "60%"}}>
        {events.length > 0 ? (
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {events.map((step, index) => (
              <div key={step.team1}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    sx={{
                      height: 300,
                      width: "100%",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: `url(${step.imgPath})`,
                        backgroundSize: "cover",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
                        <Typography variant="h5" color="primary" sx={{ bottom: 10, left: 10, fontSize: "24px", fontWeight: "bold", color: "#fff", fontFamily: "'Dancing Script', cursive" }}>
                          {step.team1} {step.team1score} - {step.team2score} {step.team2}
                          <Link style={{ display: "block", fontSize: "28px", color: "azure", textAlign: "center" }} to={`/post/match/${step.id}`}>More Details</Link>
                        </Typography>
                      </div>
                    </Box>
                  </Box>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
            <Typography variant="h5" sx={{ bottom: 10, left: 10, fontSize: "24px", fontWeight: "bold", color: "#555" }}>
            <FontAwesomeIcon icon={faHourglassHalf} spin style={{marginRight:"15px"}} />  
              Loading...
              <img src={loading} alt="loading" style={{ width: "70px", height: "70px" }} />
            </Typography>
          </div>
        )}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            alignSelf: "center",
            width: "100%",
          }}
          nextButton={
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "50%" }}>
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            </div>
          }
          backButton={
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "50%" }}>
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            </div>
          }
        />
      </Box>
    </div>
  );
}

export default Slider;

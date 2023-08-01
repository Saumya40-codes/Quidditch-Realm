import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loading from '../assets/loading.gif';

function Slider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [pastEvents, setPastEvents] = useState([]);
  SwiperCore.use([Autoplay])

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

  const images = [
  'https://vignette.wikia.nocookie.net/harrypotter/images/5/52/Coupe_du_Monde_de_Quidditch_de_1994.jpg/revision/latest/scale-to-width-down/2000?cb=20160502120620&path-prefix=fr', 
  'https://vignette.wikia.nocookie.net/harrypotter/images/d/da/Quidditch_pitch_hogwarts.jpg/revision/latest?cb=20140715145938&path-prefix=zh', 
  'https://imagesvc.timeincapp.com/v3/fan/image?url=https://wizardsandwhatnot.com/files/image-exchange/2017/07/ie_21763.jpeg&',
  'https://assets.mugglenet.com/wp-content/uploads/2019/09/Hogwarts-Mystery-Quidditch-Update-Stadium1.jpg',
  'https://www.bing.com/images/blob?bcid=S8A8725ebucFAw.V3VsAmnSjaiTs.....2A', 
]

  const events = pastEvents.slice(0, 5).map((event, index) => ({
    id: event._id,
    imgPath: index < images.length ? images[index % images.length] : null,
    team1score: event.team1score,
    team2score: event.team2score,
    team1: event.team1,
    team2: event.team2,
  }));

  const maxSteps = events.length;

  return (
    <div className="slider-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ marginTop: "30px", width: "60%" }}>
        {events.length > 0 ? (
          <Swiper
            autoplay={{
            delay: 2550,
            disableOnInteraction: false,
            }
           }
            onSlideChange={(swiper) => setActiveStep(swiper.realIndex)}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50} 
            slidesPerView={1}
            effect='fade'
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {events.map((step, index) => (
              <SwiperSlide key={index}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
            <Typography variant="h5" sx={{ bottom: 10, left: 10, fontSize: "24px", fontWeight: "bold", color: "#555" }}>
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
        />
      </Box>
    </div>
  );
}

export default Slider;

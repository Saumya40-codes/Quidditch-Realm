import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function MatchTimeline() {
  const [event, setEvent] = useState([]);
  const [combinedScorers, setCombinedScorers] = useState([]);

  const { id } = useParams();

  const getEvent = async () => {
    try {
      const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/events/get/${id}`);
      setEvent(res.data);

      if (res.data.team1scorer && res.data.team2scorer) {
        const combinedScorers = [...res.data.team1scorer, ...res.data.team2scorer].sort(
          (a, b) => a.minute - b.minute
        );
        setCombinedScorers(combinedScorers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let team1color = '#000000';
    let team2color = '#000000';

  if(event?.team1score > event?.team2score){
    team1color = '#008000';
    team2color = '#FF0000';
    }else if(event.team1score < event.team2score){
    team1color = '#FF0000';
    team2color = '#008000';
    }else{
    team1color = '#000000';
    team2color = '#000000';
    }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <Timeline style={{marginTop:"25px"}}>
      {combinedScorers?.map((scorer, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            {index < combinedScorers.length - 1 && <TimelineConnector style={{ marginLeft: "-4px" }} />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" component="p" gutterBottom>
              <span style={{ marginRight: '10px' }}>{scorer?.name}'{scorer?.minute}</span>
              {event.team1scorer.some((player) => player.name === scorer?.name) ? (
                <span style={{ color: team1color }}>{event.team1}</span>
              ) : (
                <span style={{ color: team2color }}>{event.team2}</span>
              )}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

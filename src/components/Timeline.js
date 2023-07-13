import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import EventIcon from '@mui/icons-material/Event';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FlagTwoTone } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';

export default function CustomizedTimeline({ start, deadline, kickoff }) {
  return (
    <Timeline
    sx={{
      [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.2,
      },
      position:'alternate',
    }}
  >
      <TimelineItem>
        <TimelineOppositeContent
        >
          {start}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <EventIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Registration Start
          </Typography>
          <Typography>Get ready to join</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
        >
          {deadline}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <FlagTwoTone />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography>Registration Ends</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
        >
          {kickoff}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <SportsSoccerIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Kickoff
          </Typography>
          <Typography>Let the game begin!</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Timeline from './Timeline';
import TeamPlayers from './TeamPlayers';
import Comments from './Comments';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Scorers" />
        <Tab label="Comments" />
        <Tab label="Players" />
      </Tabs>
      {value === 0 && <Timeline />}
      {value === 1 && <Comments />}
      {value === 2 && <TeamPlayers />}
    </Box>
  );
}
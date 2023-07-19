import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Timeline from './Timeline';

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
      </Tabs>
      {value === 0 && <Timeline />}
      {value === 1 && <Box>Item Two</Box>}
    </Box>
  );
}
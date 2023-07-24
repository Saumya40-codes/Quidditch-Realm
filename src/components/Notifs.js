import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Menu, MenuItem } from '@mui/material';
import { Badge, useTheme } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';

const Notifs = ({ showNotif, handleBadgeClick, handleCloseMenu , enchorEl1}) => {
  const [notifs, setNotifs] = useState([]);
  const userId = useSelector((state) => state.id);
  const [len, setLen] = useState(0);
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark' ? '#fff' : '#000';

  const getNotifs = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/users/${userId}`)
      setNotifs(res.data.occuredNotifications);
      setLen(res.data.occuredNotifications.length)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifs();
  }, [userId]);

  return (
    <div>
        <Badge badgeContent={len} color="primary" sx={{ fontSize: "40px", color:dark, cursor:"pointer" }} onClick={(event) => handleBadgeClick(event)} >
          <Notifications sx={{ fontSize: "40px", color:dark }} />
        </Badge>
      {showNotif && (
        <Menu 
          anchorEl={enchorEl1}
          open={Boolean(enchorEl1)}
          onClose={handleCloseMenu}
        >
          {notifs?.map((notif) => (
            <MenuItem key={notif?._id} onClick={handleCloseMenu}>
              {notif?.message}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default Notifs;
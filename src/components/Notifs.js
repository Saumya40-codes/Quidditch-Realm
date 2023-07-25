import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Menu, MenuItem, Paper } from '@mui/material';
import { Badge, useTheme } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import { UseSelector } from 'react-redux';

const Notifs = ({ showNotif, handleBadgeClick, handleCloseMenu , enchorEl1}) => {
  const [notifs, setNotifs] = useState([]);
  const userId = useSelector((state) => state.id);
  const [len, setLen] = useState(0);
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const mode = useSelector((state) => state.mode);

  const getNotifs = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/users/${userId}`)
      setNotifs(res.data.occuredNotifications);
      console.log(res.data.occuredNotifications);
      setLen(res.data.occuredNotifications.length)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifs();
    console.log(notifs);
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
          PaperProps={{
            style: {
              maxWidth: '500px',
              height: 'auto',
              background: mode === "dark" ? "rgba(51,51,51,0.5)" : "rgba(240, 240, 240, 0.65)",
              marginTop: "30px",
            },
          }}
        >
          {notifs?.map((notif) => (
            <MenuItem key={notif?._id} onClick={handleCloseMenu} sx={{whiteSpace:"normal"}}>
            <div style={{display:'flex', flexDirection:"column"}}>
            <ul>
            <span style={{ color:mode === "dark"?"#E8E8E8":"#333333", fontWeight:"bold"}}>{" " + String(notif?.message).substring(notif.message.length-27,notif.message.length-19)}
              {" " + String(notif?.message).substring(notif.message.length-18,notif.message.length-13)}</span>
              <span style={{fontWeight:"bold"}}>
             <li>{String(notif?.message).substring(0,notif.message.length-30)} </li>
              </span>
              </ul> 
              <hr />
            </div>
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default Notifs;

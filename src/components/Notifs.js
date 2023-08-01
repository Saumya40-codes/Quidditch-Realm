import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Menu, MenuItem, MenuList, Paper  } from '@mui/material';
import { Badge, useTheme } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notifs = ({ showNotif, handleBadgeClick, handleCloseMenu , enchorEl1}) => {
  const [notifs, setNotifs] = useState([]);
  const userId = useSelector((state) => state.id);
  const [len, setLen] = useState(0);
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const mode = useSelector((state) => state.mode);
  const primaryLight = theme.palette.primary.light;

  const getNotifs = async () => {
    try {
      const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/users/${userId}`)
      setNotifs(res.data.occuredNotifications);
      const newLen = res.data.occuredNotifications.length || 0;
      setLen(newLen);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifs();
  }, [userId]);

  const handleDelete = async (e,formId) =>{
    e.preventDefault();
    e.stopPropagation(); // so found out that this helps for other function to stop propogating (the parent ones)
    try{
      const res = await Axios.put( `https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/users/del/notification/${userId}`,{
        formId:formId,
      })
      .then((res)=>{
        setNotifs(res.data.occuredNotifications);
        setLen(res.data.occuredNotifications.length);
      }
      )
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div>
        <Badge badgeContent={len !== 0? len : '0'} color="primary" sx={{ fontSize: "40px", color:dark, cursor:"pointer" }} onClick={(event) => handleBadgeClick(event)} >
          <Notifications sx={{ fontSize: "40px", color:dark }} />
        </Badge>
      {len !== 0 ? (
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
              maxHeight:'484px',
            },
          }}
        >
        <MenuList>
          {notifs?.map((notif) => (
            <MenuItem key={notif?._id} onClick={handleCloseMenu} sx={{whiteSpace:"normal"}}>
            <div style={{display:'flex', flexDirection:"column"}}>
            <ul>
            <span style={{ color:mode === "dark"?"#E8E8E8":"#333333", fontWeight:"bold"}}>{" " + String(notif?.message).substring(notif.message.length-27,notif.message.length-19)}
              {" " + String(notif?.message).substring(notif.message.length-18,notif.message.length-13)}</span>
              <span style={{fontWeight:"bold"}}>
              <div style={{display:"flex", justifyContent:"center"}}>
             <li>{String(notif?.message).substring(0,notif.message.length-30)}</li>
             <div>
             <FontAwesomeIcon icon={faTrash} style={{color:"blueviolet"}} onClick={(e)=>handleDelete(e,notif._id)} />
             </div>
             </div>
              </span>
              </ul> 
              <hr />
            </div>
            </MenuItem>
          ))}
          </MenuList>
        </Menu>
      ):(
        <Menu
        anchorEl={enchorEl1}
          open={Boolean(enchorEl1)}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxWidth: '500px',
              height: '300px',
              background: mode === "dark" ? "rgba(51,51,51,0.5)" : "rgba(240, 240, 240, 0.65)",
              marginTop: "30px",
            },
          }}
        >
          <MenuItem onClick={handleCloseMenu} sx={{whiteSpace:"normal"}}>
          <span style={{fontFamily:"italic"}}>No new notifications :(</span>
          </MenuItem>
        </Menu>
      )
      }
    </div>
  );
};

export default Notifs;

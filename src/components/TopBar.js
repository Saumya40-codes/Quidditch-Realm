import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  Menu,
  FormControl,
} from "@mui/material";
import { DarkMode, LightMode, Notifications } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useTheme } from "@mui/material/styles";
import { Badge } from '@mui/material';
import badge from '../assets/badge.png';
import { styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import {Avatar} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      width:"10px",
      height:"10px",
      borderRadius:"50%",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const TopBar = ({showSidebar}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isDarkMode = useSelector((state) => state.mode === "dark");
  const neutralLight = theme.palette.grey[100];
  const dark = theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.grey[800];
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.username}`;

  const handleBadgeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };  
  
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
<FlexBetween gap="1.75rem" alignItems="center">
  <div style={{ position: "relative", display:"flex", justifyContent:"flex-start" }}>
    <FontAwesomeIcon icon={faBars} style={{ color: "#2862c8", cursor: "pointer" }} onClick={showSidebar} />
  </div>
  <Typography
    fontWeight="bold"
    fontSize="clamp(1rem, 2rem, 2.25rem)"
    color="primary"
    onClick={() => navigate("/admin")}
    sx={{
      "&:hover": {
        color: primaryLight,
        cursor: "pointer",
      },
      marginRight: "1rem",
    }}
  >
    Quidditch Realm
  </Typography>
</FlexBetween>


        <FlexBetween gap="2rem">
        <IconButton onClick={() => dispatch(setMode())}>
  {isDarkMode ? (
    <DarkMode sx={{ fontSize: "40px" }} />
  ) : (
    <LightMode sx={{ color: dark, fontSize: "40px" }} />
  )}
</IconButton>
          <Notifications sx={{ fontSize: "40px", color:dark }} />
          <StyledBadge 
          overlap="circular"
          variant="dot"
          borderRadius="50%"
          onClick={handleBadgeClick}
        >
        <Tooltip title="Avatar" arrow>
          <Avatar alt="Wizard" src={badge} style={{border:`2px solid #2862c8`,borderRadius:"50%", background:dark ,width:"55px",height:"55px"}} />
        </Tooltip>
        </StyledBadge>
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  <MenuItem value={fullName}>
    <Typography>{fullName}</Typography>
  </MenuItem>
  <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
</Menu>
        </FlexBetween>
    </FlexBetween>
  );
};

export default TopBar;
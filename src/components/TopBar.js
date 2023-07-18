import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, NotificationsActiveOutlined, Menu, Close, Notifications } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useTheme } from "@mui/material/styles";

const TopBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const isDarkMode = useSelector((state) => state.mode === "dark");
  const neutralLight = theme.palette.grey[100];
  const dark = theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.grey[800];
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.username}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
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
          }}
        >
          Quidditch Realm
        </Typography>
      </FlexBetween>

        <FlexBetween gap="2rem">
        <IconButton onClick={() => dispatch(setMode())}>
  {isDarkMode ? (
    <DarkMode sx={{ fontSize: "25px" }} />
  ) : (
    <LightMode sx={{ color: dark, fontSize: "25px" }} />
  )}
</IconButton>
          <Notifications sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName} style={{color:"black"}}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
                color: "black",
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
    </FlexBetween>
  );
};

export default TopBar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBroom, faBook, faMagic, faWand, faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, Typography, Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TopBar from "../TopBar";
import Slider from "../Slider";
import SidebarData from "./SidebarData";
import "../Navbar.css";
import { setLogout } from "../../state";

const AdminDashboard = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    navigate("/admin/login");
  };

  return (
    <div className="harry-potter-dashboard">
      <TopBar showSidebar={showSidebar} />
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <FontAwesomeIcon icon={faXmark} />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Slider />
      </div>
      <div style={{ marginTop: "100px" }}>
        <Card style={{ width: "100%", background: "#f7f7f7", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <CardContent>
            <Typography variant="h4" style={{ fontFamily: "Harry Potter", color: "#2268e2", textAlign: "center", marginBottom: "20px" }}>
              Welcome to the Wizarding World's Administrative Chamber!
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffffff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                  <FontAwesomeIcon icon={faBroom} style={{ color: "#2268e2", width: "100px", height: "100px" }} />
                  <Typography variant="h5" style={{ fontFamily: "Harry Potter", color: "#2268e2", marginTop: "10px" }}>
                    View Registered Teams
                  </Typography>
                  <IconButton>
                    <Link to="/admin/registered/teams">
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffffff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                  <FontAwesomeIcon icon={faBook} style={{ color: "#2268e2", width: "100px", height: "100px" }} />
                  <Typography variant="h5" style={{ fontFamily: "Harry Potter", color: "#2268e2", marginTop: "10px" }}>
                    Manage Events
                  </Typography>
                  <IconButton>
                    <Link to="/admin/manage/events">
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffffff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                  <FontAwesomeIcon icon={faMagic} style={{ color: "#2268e2", width: "100px", height: "100px" }} />
                  <Typography variant="h5" style={{ fontFamily: "Harry Potter", color: "#2268e2", marginTop: "10px" }}>
                    Wizards and Witches
                  </Typography>
                  <IconButton>
                    <Link to="/admin/wizards">
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Card>
              </Grid>
              {/* Add more grid items with different functionalities */}
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

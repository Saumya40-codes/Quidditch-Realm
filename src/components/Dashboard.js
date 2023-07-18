import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { SidebarData } from "./SidebarData"
import './Navbar.css'
import Slider from './Slider'
import { Button } from "@mui/material"
import { setLogout } from "../state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    navigate('/login');
  }

  return (
  <div className="nav-container">
    <div className="navbar">
    <FontAwesomeIcon icon={faBars} style={{color: "#2862c8", marginLeft:"10px", cursor:"pointer"}} onClick={showSidebar} />
    </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
                <FontAwesomeIcon icon={faXmark} />
            </Link>
          </li>
          {SidebarData.map((item,index)=>{
            return(
              <li key={index} className={item.cName}>
                <Link to={item.path} >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Slider />
      <div style={{ position: "fixed", bottom: "14px", right: "14px" }} onClick={logout}>
  <Button variant="contained" color="primary" onClick={logout}>
    Logout
  </Button>
</div>
  </div>
  )
}

export default Dashboard

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { SidebarData } from "./SidebarData"
import '../Navbar.css'
import Slider from '../Slider'
import { setLogout } from "../../state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import TopBar from "../TopBar"
import {Card, CardContent} from "@mui/material"
import { faBroomBall } from "@fortawesome/free-solid-svg-icons"
import {IconButton} from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';

const AdminDashboard = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    navigate('/admin/login');
  }

  return (
  <div>
  <TopBar showSidebar={showSidebar} />
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
      <div>
      <Slider />
      </div>
      <div style={{ marginTop:"100px"}}>
        <Card style={{width:"100%"}}>
          <h1 style={{textAlign:"center", marginTop:"30px"}}>Welcome to Admin Dashboard</h1>
                <Card style={{width:"450px", height:"230px", boxShadow:"12px 12px 9px 9px rgba(0,0,0,0.4)", marginLeft:"80px",marginBottom:"80px", marginTop:"40px"}}>
                  <CardContent>
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <FontAwesomeIcon icon={faBroomBall} style={{color: "#2268e2", width:"100px", height:'100px'}} />
                    </div>
                    <hr />
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"10px"}}>
                    <h3>View Registered Teams</h3> 
                    <IconButton>
                    <Link to="/admin/registered/teams">
                    <VisibilityIcon />
                    </Link>
                    </IconButton>
                    </div>
                  </CardContent>
                </Card>
        </Card>
      </div>
  </div>
  )
}

export default AdminDashboard

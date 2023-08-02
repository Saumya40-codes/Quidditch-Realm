import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import {SidebarData} from "./SidebarData"
import './Navbar.css'
import Slider from './Slider'
import TopBar from "./TopBar"
import DashboardData from "./DashboardData"
import Random from "./RandomSpells/Random"


const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar);

  return (
  <div className="nav-container">
  <TopBar showSidebar = {showSidebar} />
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

      <Random />
      <DashboardData sidebar={sidebar} />
  </div>
  )
}

export default Dashboard

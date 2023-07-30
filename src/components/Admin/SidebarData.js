import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUserPlus,faCalendar, faCalendarPlus, faCalendarDays, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons"

export const SidebarData = [
    {
        title: 'Home',
        path: '/admin',
        icon:<FontAwesomeIcon icon={faHouse} />,
        cName: 'nav-text'
    },
    {
        title: 'Add Quidditch Match',
        path: '/add/event',
        icon:<FontAwesomeIcon icon={faCalendarPlus} />,
        cName: 'nav-text'
    },
    {
        title: 'Schedule',
        path: '/schedule',
        icon:<FontAwesomeIcon icon={faCalendarDays} />,
        cName: 'nav-text'
    },
    {
        title: 'Past Events',
        path: '/past/events',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        cName: 'nav-text'
    },
    {
        title: 'Add Teams',
        path: '/admin/add/team',
        icon:<FontAwesomeIcon icon={faUserPlus} />,
        cName: 'nav-text'
    },
    {
        title: 'Ticket Sales',
        path: '/admin/sales',
        icon:<FontAwesomeIcon icon={faIndianRupeeSign} />,
        cName: 'nav-text'
    },
]
export default SidebarData;

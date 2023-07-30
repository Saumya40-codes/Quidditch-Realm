import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faTicket,faCalendar, faCalendarDays, faSearch } from "@fortawesome/free-solid-svg-icons"

export const SidebarData = [
    {
        title: 'Home',
        path:'/dashboard',
        icon:<FontAwesomeIcon icon={faHouse} />,
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
        title: 'Browse Teams',
        path: '/browse/teams',
        icon: <FontAwesomeIcon icon={faSearch} />,
        cName: 'nav-text'
    },
    {
        title: 'Registered Events',
        path: '/registered/events',
        icon: <FontAwesomeIcon icon={faTicket} /> ,
        cName: 'nav-text',
    }
]

import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUserPlus,faCalendar, faCalendarPlus } from "@fortawesome/free-solid-svg-icons"

export const SidebarData = [
    {
        title: 'Home',
        path: '/admin',
        icon:<FontAwesomeIcon icon={faHouse} />,
        cName: 'nav-text'
    },
    {
        title: 'Add Events',
        path: '/add/event',
        icon:<FontAwesomeIcon icon={faCalendarPlus} />,
        cName: 'nav-text'
    },
    {
        title: 'Schedule',
        path: '/schedule',
        icon:<FontAwesomeIcon icon={faCalendar} />,
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
]
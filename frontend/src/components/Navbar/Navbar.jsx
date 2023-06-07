import React from "react";
import { useState } from "react";
import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom"; 
//импорт иконоккк home дома 
import { AiOutlineHome } from "react-icons/ai";
//иконка выйти 
import { MdOutlineLogout } from "react-icons/md";
//иконка уроков
import { IoSchoolOutline } from "react-icons/io5";
//иконка статуса
import { MdQueryStats } from "react-icons/md";
//иконка инфо
import { MdContentPaste } from "react-icons/md";
//иконка навбара

import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";

import { useLogout } from "../../queries/authQueries.js";
import GlobalSpinner from "../GlobalSpinner/GlobalSpinner";

const NavUrl = ({url, icon, title, tabIndex }) => {
    return( 
    <li className={styles.navLink} tabIndex={tabIndex}>
        <NavLink
         to={`${url}`}
         className={({ isActive }) => (isActive ? styles.active: undefined)}
         title={title}
         aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
            {icon}
            <span className={styles.description}>{title}</span>

        </NavLink>
    </li>
    );
};

const Navbar=({ role })=>{
    const [navActive, setNavActive] = useState(false);
    const { mutate: logout, isLoading } = useLogout();
    return <div
             className={`${styles.navContainer} ${ 
                navActive ? styles.navBig : styles.navSmall}`}
          
           >
            <button
               className={styles.navControl}
               tabIndex={0}
               aria-expanded={navActive}
               onClick={()=>{
                setNavActive(!navActive);
               }}
            >
                {navActive ? <FaTimes/> : <FaBars/>}
            </button>
               {/*Панель навигации*/}
               <nav
                label='Main navigation menu'
                role='navigation'
                aria-label='Main navigation menu'
               >
                <NavUrl url='/' title='Главная' icon={<AiOutlineHome/>} tabIndex={1}/>
                <NavUrl
                   url='/information'
                   title='Информация'
                   icon={<MdContentPaste/>}
                   tabIndex={2}
                />
                
                <NavUrl
                 url={`${role === "STUDENT" ? "/tutors" : "/students"}`}
                 title={`${role === "STUDENT" ? "Преподаватель": "Студенты"}`}
                 icon={<IoPeopleOutline/>}
                 tabIndex={3}
                />
                <NavUrl
                   url='/requests'
                   title='Запрос'
                   icon={<HiOutlineRefresh/>}
                   tabIndex={4}
                />
                <NavUrl
                   url='/feedback'
                   title='Feedback'
                   icon={<IoSchoolOutline/>}
                   tabIndex={5}
                />
                <NavUrl
                   url='/settings'
                   title='Настройки'
                   icon={<IoSettingsOutline/>}
                   tabIndex={6}
                />
                <button
                  title='Logout'
                  className={`${styles.navControl} ${styles.logout}`}
                  onClick={()=>{
                    logout();
                  }}
                  >
                    <MdOutlineLogout/>
                  </button>
                  {isLoading && <GlobalSpinner/>}

               </nav>
           </div>
};

export default Navbar;
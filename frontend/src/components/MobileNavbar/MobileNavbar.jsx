import React from "react";

import styles from "./MobileNavbar.module.scss";
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
import { useMobileNav } from "../../context/MobileNavProvider";

import { useLogout } from "../../queries/authQueries.js";
import GlobalSpinner from "../GlobalSpinner/GlobalSpinner";

const NavUrl = ({ url, icon, title }) => {
    const { setIsOpened } = useMobileNav();
    return(
        <li className={styles.li_navlink} onClick={() => setIsOpened(false)}>
            <NavLink
              to={`${url}`}
              className={({ isActive }) => (isActive ? styles.active: undefined)}
            >
                {icon}
                <span className={styles.description}>{title}</span>
            </NavLink>
        </li>
    );
};


const MobileNavbar = ({role}) =>{
    const {isOpened, setIsOpened} = useMobileNav();
    return(
        <div className={`${styles.container} ${isOpened && styles.navActive}`}>
            <div className={styles.FaTimes} onClick={() => setIsOpened(false)}>
                <FaTimes/>
            </div>
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
             </nav>
             <div className={styles.bg} onClick={() => setIsOpened(false)}></div>
        </div>
    )
}
export default MobileNavbar
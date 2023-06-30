import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";
import { NavLink, Link } from "react-router-dom";
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
//nav
import { FaTimes, FaBars } from "react-icons/fa";
import { IoSettingsOutline, IoPeopleOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";

import { useLogout } from "../../queries/authQueries";
import GlobalSpinner from "../../components/GlobalSpinner";

const NavUrl = ({ url, icon, title, tabIndex }) => {
  return (
    <li className={styles.navLink} tabIndex={tabIndex}>
      <NavLink
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        title={title}
        aria-current={({ isActive }) => (isActive ? "page" : undefined)}
      >
        {icon}
        <span className={styles.description}>{title}</span>
      </NavLink>
    </li>
  );
};

const Navbar = ({ role }) => {
  const [navActive, setNavActive] = useState(false);
  const { mutate: logout, isLoading } = useLogout();
  return (
    <div
      className={`${styles.navContainer} ${
        navActive ? styles.navBig : styles.navSmall
      }`}
    >
      <button
        className={styles.navControl}
        tabIndex={0}
        aria-expanded={navActive}
        onClick={() => {
          setNavActive(!navActive);
        }}
      >
        {navActive ? <FaTimes /> : <FaBars />}
      </button>
      {/* Меню*/}
      <nav
        label='Главная навигационная панель'
        role='navigation'
        aria-label='Главная навигационная панель'
      >
        <NavUrl url='/' title='Home' icon={<AiOutlineHome />} tabIndex={1} />
        <NavUrl
          url='/information'
          title='Информация'
          icon={<MdContentPaste/>}
          tabIndex={2}
        />
        <NavUrl
          url={`${role === "STUDENT" ? "/tutors" : "/students"}`}
          title={`${role === "STUDENT" ? "Кураторы" : "Студенты"}`}
          icon={<IoPeopleOutline />}
          tabIndex={3}
        />
        <NavUrl
          url='/requests'
          title='Запрос'
          icon={<HiOutlineRefresh />}
          tabIndex={4}
        />
        <NavUrl
          url='/prescriptions'
          title='Обратная связь'
          icon={<IoSchoolOutline />}
          tabIndex={5}
        />
        <NavUrl
          url='/settings'
          title='Настройки'
          icon={<IoSettingsOutline />}
          tabIndex={6}
        />
      </nav>
      {/* CONTROL */}
      <button
        title='Logout'
        className={`${styles.navControl} ${styles.logout}`}
        onClick={() => {
          logout();
        }}
      >
        <MdOutlineLogout />
      </button>
      {isLoading && <GlobalSpinner />}
    </div>
  );
};

Navbar.defaultProps = {
  role: "student",
};

export default Navbar;

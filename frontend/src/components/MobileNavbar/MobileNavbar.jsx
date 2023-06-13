//STYLES
import styles from "./MobileNavbar.module.scss";

//импорт иконоккк home дома 
import { AiOutlineHome } from "react-icons/ai";
//иконка уроков
import { IoSchoolOutline } from "react-icons/io5";
//иконка статуса
import { MdQueryStats } from "react-icons/md";
//иконка инфо
import { MdContentPaste } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import {
  IoSettingsOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import { HiOutlineRefresh } from "react-icons/hi";

//хуукк
import { NavLink } from "react-router-dom";
import { useMobileNav } from "../../context/MobileNavProvider";

const NavUrl = ({ url, icon, title }) => {
  const { setIsOpened } = useMobileNav();
  return (
    <li className={styles.li_navlink} onClick={() => setIsOpened(false)}>
      <NavLink
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        {icon}
        <span className={styles.description}>{title}</span>
      </NavLink>
    </li>
  );
};

const MobileNavbar = ({ role }) => {
  const { isOpened, setIsOpened } = useMobileNav();

  return (
    <div className={`${styles.container} ${isOpened && styles.navActive}`}>
      <div className={styles.FaTimes} onClick={() => setIsOpened(false)}>
        <FaTimes />
      </div>
      <nav
        label='Главное навигационное меню'
        role='навигация'
        aria-label='Главное навигационное меню'
      >
        <NavUrl url='/' title='Home' icon={<AiOutlineHome />} tabIndex={1} />
        <NavUrl
          url='/information'
          title='Info'
          icon={<MdContentPaste />}
          tabIndex={2}
        />
        <NavUrl
          url={`${role === "STUDENT" ? "/tutors" : "/students"}`}
          title={`${role === "STUDENT" ? "Tutors" : "Students"}`}
          icon={<IoPeopleOutline />}
          tabIndex={3}
        />
        <NavUrl
          url='/requests'
          title='Requests'
          icon={<HiOutlineRefresh />}
          tabIndex={4}
        />
        <NavUrl
          url='/prescriptions'
          title='FeedBack'
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

      <div className={styles.bg} onClick={() => setIsOpened(false)}></div>
    </div>
  );
};

export default MobileNavbar;

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import Logo from "../logo";

//иконки импорты иконок
import{
    BsFillBellFill,
    BsArrowRepeat,
    BsSunFill,
    BsFillMoonFill,
} from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { useTheme } from "../../context/ThemeProvider";
import { useMobileNav } from "../../context/MobileNavProvider";
import { Link } from "react-router-dom";
import { useLogout } from "../../queries/authQueries";
import { useWhoami } from "../../queries/authQueries";
import GlobalSpinner from "../GlobalSpinner/GlobalSpinner";
import useClickOutside from "../../hooks/ClickOutside";

const Navbar = ({ user, homePath }) => {
  const { mode, setMode } = useTheme();
  const { setIsOpened } = useMobileNav();
  const [searchModal, setSearchModal] = React.useState(false);

  const [searchMenu, setSearchMenu] = useState(false);
  let searchMenuOutside = useClickOutside(() => {
    setSearchMenu(false);
  });

  const [userSubmenu, setUserSubmenu] = useState(false);
  const userSubmenuHandler = () => setUserSubmenu(!userSubmenu);
  let userSubmenuOutside = useClickOutside(() => {
    setUserSubmenu(false);
  });

  const { mutate: logout, isLoading: loggingOut } = useLogout();
  const { data: me } = useWhoami();
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState([]);

  const searchResults = (input) => {
    if (input.length > 0) {
      let results;
      if (me?.user?.userRole === "DOCTOR") {
        results = ResultsDoc.filter((result) => {
          return result.text.toLowerCase().includes(input.toLowerCase());
        });
      } else {
        results = ResultPatient.filter((result) => {
          return result.text.toLowerCase().includes(input.toLowerCase());
        });
      }
      return results;
    }
  };

  React.useEffect(() => {
    setResults(searchResults(input));
  }, [input]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>

        {/* Верхний навбар */}
        <div className={styles.top}>
          <div className={`${styles.logoContainer} `}>
            <button
              className={styles.mobileFaBars}
              title='Меню'
              role='button'
              onClick={() => setIsOpened(true)}
            >
              <FaBars />
            </button>
            <div className={styles.logoWrapper} title='Дом'>
              <Logo homePath={homePath} />
            </div>
          </div>
        </div>

        {/* BOTTOM PART */}
        <div className={styles.btm}>
          {/* SEARCH */}
          <div
            className={styles.searchContainer}
            ref={searchMenuOutside}
            onClick={() => setSearchMenu(true)}
          >
            <div className={styles.searchWrapper}>
              <label for='searchInput'>
                <div className={styles.searchInner}>
                  <FaSearch title='Search' aria-label='Search' />
                  <input
                    id='searchInput'
                    type='text'
                    placeholder='Search...'
                    className={styles.topSearchbar}
                    aria-label='Search'
                    value={input}
                    onFocus={() => setSearchMenu(true)}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </label>
              {input?.length > 0 && searchMenu && (
                <div
                  className={styles.searchDesktop}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul>
                    {results?.length > 0 &&
                      results.map((result, index) => {
                        return (
                          <li onClick={() => setInput("")}>
                            <Link to={result.link} key={index}>
                              <BsArrowRepeat />
                              {result.text}
                            </Link>
                          </li>
                        );
                      })}
                    {results?.length === 0 && (
                      <div className={styles.noResults}>
                        <div className={styles.noResultBg}>
                          <BsArrowRepeat />
                        </div>
                        {input === "" ? (
                          <span>Search something...</span>
                        ) : (
                          <span>No Results</span>
                        )}
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {/* SEARCH MOBILE */}
           
          </div>

          {/* Светлый темный */}
          <button
            className={styles.themeContainer}
            title='Toggle light/dark mode'
            role='button'
            aria-label='Toggle light/dark mode'
            onClick={() => setMode(!mode)}
          >
            {mode ? <BsSunFill /> : <BsFillMoonFill />}
          </button>

          {/* НАСТРОЙКИ */}
          <button
            className={`${styles.notificationContainer}`}
            title='Notifications'
            role='button'
          >
            <div className={styles.iconContainer}>
              <BsFillBellFill />
            </div>
          </button>

          {/* Профиль */}
          <button
            className={styles.profileWrapper}
            ref={userSubmenuOutside}
            title='Profile'
            role='button'
            onClick={userSubmenuHandler}
          >
            <div className={styles.personIconContainer}>
              <IoPersonSharp />
            </div>

            <div className={styles.user}>
              <span className={styles.userTop}>{user?.firstName}</span>
              {!userSubmenu ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
              {/* ПОЛЬЗОВАТЕЛЬСКОЕ ПОДМЕНЮ */}
              <div
                onClick={(e) => e.stopPropagation()}
                className={`${styles.submenu} ${
                  userSubmenu ? styles.submenuActive : undefined
                }`}
              >
                <div className={styles.info}>
                  <span className={styles.userName}>{me?.user?.firstName} </span>
                  <span className={styles.userName}>{me?.user?.lastName}</span>
                  <span className={styles.id}>{me?.user?.userRole}</span>
                </div>
                <div className={styles.actions}>
                  <Link to={"/settings"} onClick={userSubmenuHandler}>
                    Настройки
                  </Link>
                  <button
                    onClick={() => {
                      userSubmenuHandler();
                      logout();
                    }}
                  >
                    Выйти 
                  </button>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      {loggingOut && <GlobalSpinner />}
    </div>
  );
};



export default Navbar;
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import Logo from "../logo";
//Иконки
import {
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
import SearchModal from "./SearchModal";
import useClickOutside from "../../hooks/ClickOutside";
import { Link } from "react-router-dom";
import { useLogout } from "../../queries/authQueries";
import { useWhoami } from "../../queries/authQueries";

import ResultsDoc from "./ResultsTutor.json";
import ResultPatient from "./ResultsStudent.json";

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
      if (me?.user?.userRole === "TUTOR") {
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
        {/* верняя часть */}
        <div className={styles.top}>
          <div className={`${styles.logoContainer} `}>
            <button
              className={styles.mobileFaBars}
              title='Menu'
              role='button'
              onClick={() => setIsOpened(true)}
            >
              <FaBars />
            </button>
            <div className={styles.logoWrapper} title='Home'>
              <Logo homePath={homePath} />
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className={styles.btm}>
          {/* Поиск */}
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
                    placeholder='Поиск...'
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
                          <span>Найти что-нибудь</span>
                        ) : (
                          <span>Нет результатов</span>
                        )}
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {/* мобильный поиск */}
            <button
              className={`${styles.searchInner} ${styles.searchModalBtn}`}
              onClick={() => setSearchModal(!searchModal)}
            >
              <FaSearch title='Search' aria-label='Search' />
            </button>
            {/* модель поиска мобильного */}
            <SearchModal
              setIsVisible={() => setSearchModal(false)}
              isVisible={searchModal}
            />
          </div>

          {/* режим черно/белый */}
          <button
            className={styles.themeContainer}
            title='Toggle light/dark mode'
            role='button'
            aria-label='Toggle light/dark mode'
            onClick={() => setMode(!mode)}
          >
            {mode ? <BsSunFill /> : <BsFillMoonFill />}
          </button>

          {/* Уведомления */}
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
              {/* Пользовательское подменю */}
              <div
                onClick={(e) => e.stopPropagation()}
                className={`${styles.submenu} ${
                  userSubmenu ? styles.submenuActive : undefined
                }`}
              >
                <div className={styles.info}>
                  <span className={styles.userName}>{me?.user?.firstName}</span>
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

Navbar.defaultProps = {
  homePath: "/",
  user: {
    firstName: "John",
    lastName: "Doe",
  },
};

export default Navbar;

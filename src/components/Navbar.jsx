import { useContext, useEffect, useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";
import Entry from "./Entry";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);

  const { logout, currentUser } = useContext(UserContext);

  const searchRef = useRef();

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleLogin = () => setShowLogin(!showLogin);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!searchRef.current.value) return;
    history.push({
      pathname: "/",
      search: "?search=" + searchRef.current.value + "&filter=true",
    });
    e.target.value = "";
    setShowMenu(false);
    setShowSearch(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const mediaQueryChange = (e) => {
      if (e.matches) {
        setShowMenu(false);
      } else {
        setShowSearch(false);
      }
    };

    mediaQuery.addEventListener("change", mediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", mediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!showSearch) return;
    searchRef.current.focus();
  }, [showSearch]);

  useEffect(() => {
    if (currentUser) {
      setShowLogin(false);
    }
  }, [currentUser]);

  return (
    <nav>
      {showLogin && (
        <Modal
          onClose={() => {
            setShowLogin(false);
          }}
        >
          <div className={styles.modal}>
            <Entry />
          </div>
        </Modal>
      )}

      <div className={styles.spacer} />

      <div className={styles.navbar}>
        <div className={styles.mobileSection}>
          {/* Hamburger and cross icon */}
          <button onClick={toggleMenu}>
            {showMenu ? (
              <FontAwesomeIcon icon={faTimes} className="fa-lg" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="fa-lg" />
            )}
          </button>
        </div>

        {/* Logo and gif logo */}
        <div
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
        >
          {hoverLogo ? (
            <img
              className={styles.logo}
              src="/assets/icons/logo.gif"
              alt="Funky Films"
              onClick={() => history.push("/")}
            />
          ) : (
            <img
              className={styles.logo}
              src="/assets/icons/logo.png"
              alt="Funky Films"
              onClick={() => history.push("/")}
            />
          )}
        </div>

        <div
          className={`${styles.linksSection} ${showMenu ? styles.active : ""}`}
        >
          {currentUser && (
            <Link onClick={toggleMenu} to="/profile">
              My profile
            </Link>
          )}

          {!currentUser ? (
            <Link to="#" onClick={toggleLogin}>
              Login/Register
            </Link>
          ) : (
            <Link to="#" onClick={() => logout()}>
              Logout
            </Link>
          )}

          <form
            className={`${styles.searchField} ${
              showSearch ? styles.active : ""
            }`}
            onSubmit={submitSearch}
          >
            <input
              ref={searchRef}
              className="input search"
              placeholder="Search..."
            />
          </form>
        </div>

        <div className={styles.searchSection}>
          <button
            onClick={() => {
              if (!showSearch) {
                setShowSearch(true);
                setShowMenu(true);
              } else {
                setShowSearch(false);
              }
            }}
          >
            <FontAwesomeIcon className="fa-lg" icon={faSearch} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

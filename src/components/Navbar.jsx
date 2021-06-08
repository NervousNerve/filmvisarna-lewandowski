import { useContext, useEffect, useState } from "react";
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
  const [mediaQuery] = useState(window.matchMedia("(min-width: 768px)"));
  const { logout, currentUser } = useContext(UserContext);

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleLogin = () => setShowLogin(!showLogin);
  const toggleSearch = () => setShowSearch(!showSearch);

  useEffect(() => {
    if (!mediaQuery) return;

    const handleChange = (e) => {
      if (e.matches) {
        setShowMenu(false);
      } else {
        setShowSearch(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener(handleChange);
    };
  }, [mediaQuery]);

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

        <div className={styles.searchSection}>
          <button onClick={toggleSearch}>
            <FontAwesomeIcon className="fa-lg" icon={faSearch} />
          </button>
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

          <input
            className={`${styles.searchField} search ${
              showSearch ? styles.active : ""
            }`}
            placeholder="Search..."
          ></input>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

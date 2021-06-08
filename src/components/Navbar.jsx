import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";
import Entry from "./Entry";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);
  const { logout, currentUser } = useContext(UserContext);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (currentUser) {
      setShowLogin(false);
    }
  }, [currentUser]);

  return (
    <div>
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

      <div
        className={`${styles.topfield} ${showMenu ? styles.clickedMenu : ""}`}
      >
        <div className={`${styles.navs} ${showMenu ? styles.clickedMenu : ""}`}>
          <div className={`${styles.grid} ${styles.alignCenter}`}>
            {/* Hamburger and cross icon */}
            <div className={styles.icons}>
              {showMenu ? (
                <FontAwesomeIcon
                  className="fa-lg"
                  icon={faTimes}
                  onClick={handleClick}
                />
              ) : (
                <FontAwesomeIcon
                  className="fa-lg"
                  icon={faBars}
                  onClick={handleClick}
                />
              )}
            </div>
          </div>

          {/* Logo and gif logo */}
          <div
            className={styles.logos}
            onMouseEnter={() => setHoverLogo(true)}
            onMouseLeave={() => setHoverLogo(false)}
          >
            {hoverLogo ? (
              <img
                className={styles.gifLogo}
                src="/assets/icons/logo.gif?a="
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
            className={`${styles.grid} ${styles.justifyEnd} ${styles.alignCenter}`}
          >
            {/* Search field goes here later */}
          </div>
        </div>

        <div className={styles.topnav}>
          {currentUser && (
            <Link onClick={handleClick} to="/profile">
              My profile
            </Link>
          )}

          {!currentUser ? (
            <Link to="#" onClick={() => setShowLogin(!showLogin)}>
              Login/Register
            </Link>
          ) : (
            <Link to="#" onClick={() => logout()}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

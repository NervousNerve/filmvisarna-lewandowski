import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";
import Entry from "./Entry";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { logout, currentUser } = useContext(UserContext);

  const handleClick = () => {
    if (showMenu === false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  const handleModal = () => {
    if (showLogin === false) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  };

  const logOut = () => {
    logout();
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
          <Entry />
        </Modal>
      )}

      <div className={styles.spacer} />

      <div
        className={`${styles.topfield} ${showMenu ? styles.clickedMenu : ""}`}
      >
        <div className={`${styles.navs} ${showMenu ? styles.clickedMenu : ""}`}>
          <div className={`${styles.grid} ${styles.alignCenter}`}>
            <FontAwesomeIcon
              className={styles.burger}
              icon={faBars}
              onClick={handleClick}
            />
          </div>

          <img
            className={styles.img}
            src="/assets/icons/logo.png"
            alt="Logo"
            onClick={() => history.push("/")}
          />

          <div
            className={`${styles.grid} ${styles.justifyEnd} ${styles.alignCenter}`}
          >
            {/* Search field goes here later */}
          </div>
        </div>

        <div className={styles.topnav}>
          <Link onClick={handleClick} to="/">
            Home
          </Link>

          {currentUser && (
            <Link onClick={handleClick} to="/profile">
              My profile
            </Link>
          )}

          {!currentUser ? (
            <Link to="#" onClick={handleModal}>
              Login/Register
            </Link>
          ) : (
            <Link to="#" onClick={logOut}>
              LogOut
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

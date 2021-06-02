import { useEffect, useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Entry from "./Entry";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const history = useHistory();

  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const { logout, currentUser } = useContext(UserContext);
  // const { feedbackMessageOk } = useContext(UserContext);

  // const history = useHistory();

  const handleClick = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  const handleModal = () => {
    if (modal === false) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  const logOut = () => {
    logout();
  };

  useEffect(() => {
    if (currentUser) {
      setModal(false);
    }
  }, [currentUser]);

  return (
    <div className={styles.wrapper}>
      {/* {currentUser && (
        <div> */}
      {modal && (
        <Modal
          onClose={() => {
            setModal(false);
          }}
        >
          <div className={styles.entry}>
            <Entry />
          </div>
        </Modal>
      )}
      {/* </div>
      )} */}
      <div className={styles.spacer} />

      <div className={`${styles.topfield} ${menu && styles.clickedMenu}`}>
        <div className={`${styles.navs} ${menu && styles.clickedMenu}`}>
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
          {currentUser && (
            <div className={`${styles.feedbackMessageOk}`}>
              You're logged in
            </div>
          )}
          <div
            className={`${styles.grid} ${styles.justifyEnd} ${styles.alignCenter}`}
          >
            {/* Search field goes here later */}
          </div>
        </div>
        <div className={styles.topnav} id="myMenu">
          <NavLink onClick={handleClick} to="/">
            Home
          </NavLink>
          {currentUser && (
          <NavLink onClick={handleClick} to="/profile">
            My profile
          </NavLink>
            )}

          {!currentUser ? (
            <div className={styles.login} onClick={handleModal}>
              Login/Register
            </div>
          ) : (
            <div onClick={logOut} className={`${styles.one} ${styles.login}`}>
              <span>LogOut</span>
              <span className={`${styles.feedbackMessageOk2}`}>
                You're logged in
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

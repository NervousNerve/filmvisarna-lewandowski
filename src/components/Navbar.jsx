import { useState } from "react";
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
  // eslint-disable-next-line
  // const filmLogo =
  //   "https://trello-attachments.s3.amazonaws.com/60a21d927cb7b38110c05826/60ab5f1eb07e002ab9bbcfb5/3429140ee35b63a2ad4a06612bacce6f/logo-1.png";

  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const { currentUser } = useContext(UserContext);
  // const { feedbackMessageOk } = useContext(UserContext);

  const history = useHistory();

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
    history.push(`/login`);
  };

  // const logOut = () => {
  //   dispatch(logout());
  // };

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

          <img className={styles.img} src="/assets/icons/logo.png" alt="Logo" />

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
          <NavLink onClick={handleClick} to="/profile">
            My profile
          </NavLink>

          {!currentUser ? (
            <div className={styles.login} onClick={handleModal}>
              Login/Register
            </div>
          ) : (
            <NavLink to="/login" onClick={logOut} className={`${styles.one}`}>
              <span>LogOut</span>
              <span className={`${styles.feedbackMessageOk}`}></span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

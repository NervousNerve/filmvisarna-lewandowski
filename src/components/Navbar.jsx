import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ModalLogin from "./ModalLogin";
import styles from "../css/Navbar.module.css";

const Navbar = () => {
  // eslint-disable-next-line
  // const filmLogo =
  //   "https://trello-attachments.s3.amazonaws.com/60a21d927cb7b38110c05826/60ab5f1eb07e002ab9bbcfb5/3429140ee35b63a2ad4a06612bacce6f/logo-1.png";

  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);

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

  return (
    <div className={styles.wrapper}>
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
          <NavLink onClick={handleClick} to="/my-profile">
            My profile
          </NavLink>

          <div onClick={handleModal}>
            Login/Register
            {modal && (
              <ModalLogin
                onClose={() => {
                  setModal(false);
                }}
              ></ModalLogin>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const history = useHistory();

  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
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
        <div className={styles.topnav} id="myMenu">
          <NavLink onClick={handleClick} to="/">
            Home
          </NavLink>
          <NavLink onClick={handleClick} to="/my-profile">
            My profile
          </NavLink>
          <NavLink onClick={handleClick} to="/login-register">
            Login/Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

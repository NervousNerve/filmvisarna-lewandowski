import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
  // eslint-disable-next-line
  const filmLogo =
    "https://trello-attachments.s3.amazonaws.com/60a21d927cb7b38110c05826/60ab5f1eb07e002ab9bbcfb5/3429140ee35b63a2ad4a06612bacce6f/logo-1.png";

  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  return (
    <div className={styles.top}>
      <div
        className={`${styles.topfield} ${styles.topfield2} ${
          menu && styles.clickedMenu
        }`}
      >
        <div className={`${styles.navs} ${menu && styles.clickedMenu}`}>
          <FontAwesomeIcon
            className={styles.burger}
            icon={faBars}
            onClick={handleClick}
          />

          <img className={styles.img} src={filmLogo} alt="Logo" />
          <FontAwesomeIcon className={styles.searchicon} icon={faSearch} />
        </div>
        <div className={styles.topnav} id="myMenu">
          <NavLink onClick={handleClick} to="/">
            Home
          </NavLink>
          <NavLink onClick={handleClick} to="/my-profile">
            My profile
          </NavLink>
          <NavLink onClick={handleClick} to="/confirmation">
            Confirmation
          </NavLink>
          <NavLink onClick={handleClick} to="/login-register">
            Login/Register
          </NavLink>
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search.."
            name="search"
          />
          <FontAwesomeIcon className={styles.searchicon2} icon={faSearch} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

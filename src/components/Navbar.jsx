import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/Navbar.module.css";

const handleClick = () => {
  var menu = document.getElementById("myMenu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
};

const Navbar = () => {
  //   // eslint-disable-next-line
  const [filmLogo, setFilmLogo] = useState(
    "https://trello-attachments.s3.amazonaws.com/60a21d927cb7b38110c05826/60ab5f1eb07e002ab9bbcfb5/3429140ee35b63a2ad4a06612bacce6f/logo-1.png"
  );

  return (
    <div>
      <div className={styles.navs}>
        <FontAwesomeIcon
          className={styles.burger}
          icon={faBars}
          onClick={handleClick}
        />
        <img className={styles.img} src={filmLogo} alt="Logo" />
        <FontAwesomeIcon className={styles.searchicon} icon={faSearch} />
        <div className={styles.topnav} id="myMenu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/my-profile">My profile</NavLink>
          <NavLink to="/confirmation">Confirmation</NavLink>
          <NavLink to="/login-register">Login/Register</NavLink>
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Search.."
          name="search"
        />
        <FontAwesomeIcon className={styles.searchicon2} icon={faSearch} />
      </div>
    </div>
  );
};

export default Navbar;

import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const history = useHistory();

  const [menu, setMenu] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);

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

          <div
            className={styles.logos}
            onMouseEnter={() => setHoverLogo(true)}
            onMouseLeave={() => setHoverLogo(false)}
          >
            <img
              className={`${styles.logo} ${hoverLogo && styles.hoverLogo}`}
              src="/assets/icons/logo.png"
              alt="Funky Films"
              onClick={() => history.push("/")}
            />
            {hoverLogo && (
              <img
                className={styles.gifLogo}
                src="/assets/icons/logo.gif"
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
        <div className={styles.topnav} id="myMenu">
          <NavLink onClick={handleClick} to="/profile">
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

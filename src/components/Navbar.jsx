import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { slide as Menu } from 'react-burger-menu'

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

//       <faSearch>
//         <a id="home" className="menu-item" href="/">Home</a>
//         <a id="about" className="menu-item" href="/about">About</a>
//         <a id="contact" className="menu-item" href="/contact">Contact</a>
//         <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
//       </faSearch>
//     );
//   }
// }

const Navbar = () => {
  //   // eslint-disable-next-line
  //   const [links, setLinks] = useState([{ name: "Channels", url: "/" }, { name: "Programs category", url: "/programcategory" }, { name: "Favorite", url: "/favorite" }, {name: "Register/Login", url:"/login"}]);

  //   const renderLinks = () => {
  //     return links.map((link) => (
  //       <Link className={styles.link} key={link.name} to={link.url}>
  //         {link.name}
  //       </Link>
  //     ));
  //   };
  // function Navbar(props) {
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
        <NavLink to="/login-register">Login/Register</NavLink>
      </div>
        <FontAwesomeIcon className={styles.searchicon2} icon={faSearch} />
      </div>
      {/* <div className={styles.topnav} id="myMenu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/my-profile">My profile</NavLink>
        <NavLink to="/login-register">Login/Register</NavLink>
      </div> */}

      {/* <img className={styles.img} src={marvelLogo} alt="Logo" /> */}
    </div>
  );

  // }
  //   return <nav >
  //     <FontAwesomeIcon icon={faBars}/>
  //     <FontAwesomeIcon icon={faSearch}/></nav>;
};

export default Navbar;

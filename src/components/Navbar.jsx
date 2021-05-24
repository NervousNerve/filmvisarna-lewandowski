import { useState } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

import styles from "../css/Navbar.module.css";

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
    .
    .
    .
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

// const Navbar = () => {
//   // eslint-disable-next-line 
//   const [links, setLinks] = useState([{ name: "Channels", url: "/" }, { name: "Programs category", url: "/programcategory" }, { name: "Favorite", url: "/favorite" }, {name: "Register/Login", url:"/login"}]);

//   const renderLinks = () => {
//     return links.map((link) => (
//       <Link className={styles.link} key={link.name} to={link.url}>
//         {link.name}
//       </Link>
//     ));
//   };

//   return <nav className={styles.navbar}>{renderLinks()}</nav>;
// };

export default Navbar;
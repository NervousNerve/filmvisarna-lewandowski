import UserBookings from "../components/UserBookings";
// import Entry from "../components/Entry";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/ProfilePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

//ability to edit user info to be implemented in next sprint

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regexMessage, setRegexMessage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const { edit, login } = useContext(UserContext);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const regex = new RegExp(
      "^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"
    );

    if (regex.test(password)) {
      setRegexMessage(
        "Your password must be at least 6 characters long, contain both upper- and lowercase and one special character."
      );
      setTimeout(() => {
        setRegexMessage(null);
      }, 5000);
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    let result = await edit(user);
    if (!result) {
      setFeedbackMessage("A user with this email already exists.");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
      return;
    }

    login(user);
  };

  return (
    <div>
      {currentUser ? (
        <div className={styles.profileContainer}>
          <h1>
            Hi,{" "}
            {currentUser && (currentUser.name || currentUser.loggedInUser.name)}
            !
          </h1>
          <div
            className={`${styles.topfield} ${
              showMenu ? styles.clickedMenu : ""
            }`}
          >
            <div
              className={`${styles.navs} ${showMenu ? styles.clickedMenu : ""}`}
            >
              <div className={styles.icon}>
                <FontAwesomeIcon
                  className="fa-lg"
                  icon={faEdit}
                  onClick={handleClick}
                />
              </div>
            </div>
          
          <div className={styles.topnav}>
            <form onSubmit={handleEdit}>
              <input
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
               
              />
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              
              />
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
               
              />
              <div className={styles.feedbackMessage}>
                {feedbackMessage}
                {regexMessage}
              </div>
              <div className={styles.saveBtn}>
                <button>Save</button>
              </div>
            </form>
          </div>
          </div>
          <UserBookings />{" "}
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePage;

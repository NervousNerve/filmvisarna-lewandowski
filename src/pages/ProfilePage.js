import UserBookings from "../components/UserBookings";
// import Entry from "../components/Entry";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/ProfilePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCircle } from "@fortawesome/free-solid-svg-icons";

//ability to edit user info to be implemented in next sprint

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  // const [values, setValues] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const set = (name) => {
  //   return ({ target: { value } }) => {
  //     setValues((oldValues) => ({ ...oldValues, [name]: value }));
  //   };
  // };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regexMessage, setRegexMessage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const { edit, login } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleClick = () => {
    if (showMenu === false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const regex = new RegExp(
      "^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"
    );

    if (password && !regex.test(password)) {
      setRegexMessage(
        "Your password must be at least 6 characters long, contain both upper- and lowercase and one special character."
      );
      setTimeout(() => {
        setRegexMessage(null);
      }, 5000);
      return;
    }

    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined,
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
          <div className={styles.editProfile}>
          <h1>
            Hi,{" "}
            {currentUser && (currentUser.name || currentUser.loggedInUser.name)}
            !
            <FontAwesomeIcon
              className={`${styles.navs} ${showMenu && styles.clickedMenu}`}
              icon={faEdit}
              onClick={handleClick}
            />
          </h1>
          <div
            className={`${styles.topfield} ${styles.topfield2} ${
              showMenu && styles.clickedMenu
            }`}
          >
            {/* <div className={`${styles.navs} ${showMenu && styles.clickedMenu}`}>
              <FontAwesomeIcon
                className="fa-lg"
                icon={faEdit}
                onClick={handleClick}
              />
            </div> */}

            <div className={styles.topnav}>
              <div className={styles.topnav2}>
                <FontAwesomeIcon
                  className={styles.fauser}
                  icon={faUserCircle}
                />
                <h5>
                  {" "}
                  {currentUser &&
                    (currentUser.email || currentUser.loggedInUser.email)}
                </h5>
              </div>
              <div>
                <form onSubmit={handleEdit}>
                  <label>Name:</label>
                  <input
                    placeholder="your full name"
                    type="text"
                    value={name}
                    // onChange={set("name")}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Email:</label>
                  <input
                    placeholder="enter your email"
                    type="email"
                    value={email}
                    // onChange={set("email")}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Password:</label>
                  <input
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    // onChange={set("password")}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className={styles.feedbackMessage}>
                    {feedbackMessage}
                    {regexMessage}
                  </div>
                  <div
                    className={`${styles.saveBtn} ${
                      showMenu && styles.clickedMenu
                    }`}
                  >
                    <button
                      className={`${styles.saveBtn} ${
                        showMenu && styles.clickedMenu
                      }`}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            </div>
          </div>
          <UserBookings />
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePage;

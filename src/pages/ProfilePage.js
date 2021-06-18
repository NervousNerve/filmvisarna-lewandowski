import UserBookings from "../components/UserBookings";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/ProfilePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [regexMessage, setRegexMessage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { edit } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    const timeout = setTimeout(() => setRegexMessage(null), 5000);
    return () => clearTimeout(timeout);
  }, [regexMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => setFeedbackMessage(null), 5000);
    return () => clearTimeout(timeout);
  }, [feedbackMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => setSuccessMessage(null), 5000);
    return () => clearTimeout(timeout);
  }, [successMessage]);

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

    if (newPassword && !regex.test(newPassword)) {
      setRegexMessage(
        "Your password must be at least 6 characters long, contain both upper- and lowercase and one special character."
      );
      return;
    }

    const user = {
      name: name || undefined,
      email: email || undefined,
      newPassword: newPassword || undefined,
      oldPassword: oldPassword,
    };

    let result = await edit(user);
    if (result.error) {
      setFeedbackMessage(result.error);
      return;
    }
    setNewPassword("");
    setOldPassword("");
    setSuccessMessage("Your information has been updated!");
  };

  return (
    <div>
      {currentUser ? (
        <div className={styles.profileContainer}>
          <div className={styles.editProfile}>
            <h1>
              Hi,{" "}
              {currentUser &&
                (currentUser.name || currentUser.loggedInUser.name)}
              !
              <button className={styles.navs}>
                <FontAwesomeIcon
                  icon={faEdit}
                  className={styles.editIcon}
                  onClick={handleClick}
                />
              </button>
            </h1>
            {showMenu && (
              <div className={styles.topfield}>
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

                  <form onSubmit={handleEdit}>
                    <label>Name:</label>
                    <input
                      placeholder="your full name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={"input"}
                    />

                    <label>Email:</label>
                    <input
                      placeholder="enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={"input"}
                    />

                    <label>New password:</label>
                    <input
                      // placeholder="••••••••"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={"input"}
                    />

                    <hr className={styles.formSpacer} />

                    <label>Current password:</label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className={"input"}
                    />

                    <div>
                      {feedbackMessage && (
                        <p className={styles.feedbackMessage}>
                          {feedbackMessage}
                        </p>
                      )}
                      {regexMessage && (
                        <p className={styles.feedbackMessage}>{regexMessage}</p>
                      )}
                      {successMessage && (
                        <p className={styles.successMessage}>
                          {successMessage}
                        </p>
                      )}
                    </div>

                    <div>
                      <button className={`button ${styles.saveButton}`}>
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          <UserBookings />
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePage;

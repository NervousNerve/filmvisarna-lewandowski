import UserBookings from "../components/UserBookings";
import Entry from "../components/Entry";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/ProfilePage.module.css";

//ability to edit user info to be implemented in next sprint

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser ? (
        <div className={styles.profileContainer}>
          <h1>
            Hi,{" "}
            {currentUser && (currentUser.name || currentUser.loggedInUser.name)}
            !
          </h1>
          <UserBookings />{" "}
        </div>
      ) : null
      }
    </div>
  );
};

export default ProfilePage;

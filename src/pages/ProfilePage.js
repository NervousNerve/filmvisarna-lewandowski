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
      ) : (
        <div>
          <h2 className={styles.centered}>You must log in to show your profile!</h2>
          <Entry />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

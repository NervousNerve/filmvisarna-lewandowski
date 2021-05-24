import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);
  const [displayUpcoming, setDisplayUpcoming] = useState(true);

  const toggleBookings = () => {
    if (displayUpcoming) {
      setDisplayUpcoming(false);
    } else {
      setDisplayUpcoming(true);
    }
  };

  return (
    <div className="profilepage">
      <h1>Hi user </h1>
      <h2>My bookings:</h2>
      <h3></h3>
    </div>
  );
};

export default ProfilePage;

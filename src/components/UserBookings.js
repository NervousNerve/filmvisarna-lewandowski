import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import UserBookingItem from "../components/UserBookingItem";
import styles from "../css/UserBookings.module.css";

const UserBookings = () => {
  const [showUpcomingBookings, setShowUpcomingBookings] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState(null);
  const [previousBookings, setPreviousBookings] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("showUpcomingBookings")) {
      setShowUpcomingBookings(localStorage.getItem("showUpcomingBookings"));
    }
  }, []);

  useEffect(async () => {
    localStorage.setItem("showUpcomingBookings", showUpcomingBookings);
    if (showUpcomingBookings) {
      let getUpcomingBookings = await fetch(`/api/v1/bookings/`);
      setUpcomingBookings(getUpcomingBookings);
    } else {
      let getPreviousBookings = await fetch(`/api/v1/bookings?previous=true`);
      setPreviousBookings(getPreviousBookings);
    }
  }, [showUpcomingBookings]);

  useEffect(() => {
    console.log(upcomingBookings, previousBookings);
  }, [upcomingBookings, previousBookings]);

  const renderUpcoming = () => {
    if (upcomingBookings) {
      return <div></div>;
    } else {
      return (
        <div>
          <p>No upcoming bookings to show</p>
        </div>
      );
    }
  };

  const renderPrevious = () => {
    if (previousBookings) {
      return <div></div>;
    } else {
      return (
        <div>
          <p>No previous bookings to show</p>
        </div>
      );
    }
  };

  const toggleBookings = () => {
    setShowUpcomingBookings(!showUpcomingBookings);
  };

  return (
    <div>
      <h2>My bookings:</h2>
      <label
        className={styles.switch}
        onClick={() => {
          toggleBookings();
        }}
      >
        <input type="checkbox" />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      {showUpcomingBookings ? renderUpcoming() : renderPrevious()}
    </div>
  );
};

export default UserBookings;

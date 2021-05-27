import { useEffect, useState } from "react";
import UserBookingItem from "../components/UserBookingItem";
import styles from "../css/UserBookings.module.css";

const UserBookings = () => {
  const [showUpcomingBookings, setShowUpcomingBookings] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState(null);
  const [previousBookings, setPreviousBookings] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("showUpcomingBookings")) {
      setShowUpcomingBookings(
        JSON.parse(localStorage.getItem("showUpcomingBookings"))
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showUpcomingBookings", showUpcomingBookings);
    async function fetchData() {
      if (showUpcomingBookings) {
        let getUpcomingBookings = await fetch(`/api/v1/bookings/`);
        getUpcomingBookings = await getUpcomingBookings.json();
        setUpcomingBookings(getUpcomingBookings);
      } else {
        let getPreviousBookings = await fetch(`/api/v1/bookings?previous=true`);
        getPreviousBookings = await getPreviousBookings.json();

        setPreviousBookings(getPreviousBookings);
      }
    }
    fetchData();
  }, [showUpcomingBookings]);

  const toggleBookings = () => {
    setShowUpcomingBookings(!showUpcomingBookings);
  };

  const renderTickets = () => {
    if (showUpcomingBookings && upcomingBookings) {
      return (
        <div>
          {upcomingBookings.map((booking, i) => (
            <UserBookingItem key={i} booking={booking} />
          ))}
        </div>
      );
    } else if (!showUpcomingBookings && previousBookings) {
      return (
        <div>
          <div>
            {previousBookings.map((booking, i) => (
              <UserBookingItem key={i} booking={booking} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>No upcoming bookings to show</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h2 className={styles.textAlign}>Your bookings:</h2>
      <label className={`${styles.switch}`}>
        <input
          onChange={() => {
            toggleBookings();
          }}
          className={styles.input}
          type="checkbox"
          checked={showUpcomingBookings ? true : false}
        />
        <span className={`${styles.slider} ${styles.round} slider`}></span>
        <span
          className={`${styles.activeState} ${styles.activeStatePrevious} ${styles.bold}`}
        >
          Previous
        </span>
        <span
          className={`${styles.activeState} ${styles.activeStateUpcoming} ${styles.bold}`}
        >
          Upcoming
        </span>
      </label>
      {renderTickets()}
    </div>
  );
};

export default UserBookings;

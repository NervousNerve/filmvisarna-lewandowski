import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import UserBookingItem from "../components/UserBookingItem";
import styles from "../css/UserBookings.module.css";

const UserBookings = () => {
  const location = useLocation();
  const [pageUrl] = useState(location);
  const [showUpcomingBookings, setShowUpcomingBookings] = useState(true);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    pageUrl.search.includes('?previous=true') ? setShowUpcomingBookings(false) : setShowUpcomingBookings(true)
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/v1/bookings/${showUpcomingBookings ? "" : "?previous=true"}`
        );
        setBookings(await response.json())
    }
    fetchData();
  }, [showUpcomingBookings]);

  const toggleBookings = () =>{
    const url = new URL(window.location);
    if(url.search.includes('?previous=true')){
      url.search = "";
    }else{
      url.searchParams.set('previous', 'true');
    }
    setShowUpcomingBookings(!showUpcomingBookings)
    window.history.pushState({}, '', url);
    setBookings([])
  }

  const renderTickets = () => {
    if (bookings?.length) {
      return (
        <div>
          {bookings.map((booking) => (
            <UserBookingItem key={booking._id} booking={booking} />
          ))}
        </div>
      );
     }else {
      return (
        <div>
          <p>No {showUpcomingBookings ? "upcoming" : "previous"} bookings to show</p>
        </div>
      );
    }
  };

  return (
    <div className={styles.bookingContainer}>
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
        <div className={styles.textContainer}>
          <span
            className={`${styles.activeState} ${styles.bold}`}
            >
              Previous
          </span>
          <span
            className={`${styles.activeState} ${styles.bold}`}
            >
              Upcoming
          </span>
        </div>
      </label>
      {renderTickets()}
    </div>
  );
};

export default UserBookings;

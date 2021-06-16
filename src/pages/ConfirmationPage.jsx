import { useHistory } from "react-router-dom";
import UserBookingItem from "../components/UserBookingItem";
import ErrorPage from "./ErrorPage";
import styles from "../css/ConfirmationPage.module.css";

const ConfirmationPage = (props) => {
  const history = useHistory();

  const booking = props.history.location.state?.booking;

  const handleClick = () => {
    history.push(`/`);
  };

  if (!booking) return <ErrorPage.NotFound />;

  return (
    <div className={styles.confirmation}>
      <img
        className={styles.confirm}
        src="/assets/icons/confirm.svg"
        alt="confirm icon"
      />
      <div className={styles.thanks}>
        <h1>Thank you for booking with us!</h1>
        <h2>Your reservation is confirmed.</h2>
      </div>
      <div className={styles.orderDetails1}>
        <UserBookingItem booking={booking} />
      </div>
      <div className={styles.homeButton}>
        <button className={`button ${styles.backhome}`} onClick={handleClick}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;

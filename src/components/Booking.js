import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Booking.module.css";

const Booking = () => {
  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.pricetypeWrapper}>
        <p>Adult</p>
        <div className={styles.addRemoveWrapper}>
          <div className={styles.addRemove}>
            <button>
              <FontAwesomeIcon icon={faMinus} className={styles.removebutton} />
            </button>
            <span>1</span>
            <button>
              <FontAwesomeIcon icon={faPlus} className={styles.addbtn} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

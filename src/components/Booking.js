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
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>1</span>
            <button>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Child</p>
        <div className={styles.addRemoveWrapper}>
          <div className={styles.addRemove}>
            <button>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>1</span>
            <button>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Oldie</p>
        <div className={styles.addRemoveWrapper}>
          <div className={styles.addRemove}>
            <button>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>1</span>
            <button>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.selectWrapper}>
        <select className="custom-select">
          <option>test</option>
          <option>test</option>
        </select>
      </div>
    </div>
  );
};

export default Booking;

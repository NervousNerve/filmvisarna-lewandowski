import styles from "../css/Footer.module.css";
// import backgroundImage from "/assets/icons/rainingPopcorn.png";
// public\assets\icons\rainingPopcorn.png

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.aboutAndContactWrapper}>
          <div className={styles.about}>
            <div className={styles.aboutText}>
              <h1>Our story</h1>
              <p>
                So much can be said about the movie industry, but we are not the
                ones to tell you the lot. But we can tell you this; it's a god
                damn dream to be part of it. We love movies, we eat, sleep,
                drink and shit movies. We. Are. Movies. For 250 years, Funky
                films have been entertaining every day folks like yourself, and
                we been doin' it good. Rachel van Grauenbach founded Funky Films
                in 1756, and she's been ever present since. It is her fire and
                devotion that powers our 65/70 projectors every day, from 15:00
                to 23:00, it is her tender smile that still calms us on a big
                premiere, it is her strong perfume that keeps the operator awake
                during long screenings. If it wasn't for her, ah shit I dont'
                care to come up with anything good here. That's it guys.
              </p>
            </div>
            <div className={styles.logoContainer}>
              <img
                className={styles.logo}
                src="/assets/icons/logo-02.png"
                alt="Logo"
              />
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.address}>
              <h3 className={styles.contactHeaders}>Stop by!</h3>
              <p>Hipstergatan 420b</p>
              <p>1312, Malmö</p>
            </div>
            <div className={styles.social}>
              <h3 className={styles.contactHeaders}>Say hi!</h3>
              <div className={styles.iconAndDesc}>
                <img
                  className={styles.socialIcon}
                  src="/assets/icons/instagramIcon.png"
                  alt="Logo"
                />
                <p>@funky_Films</p>
              </div>
              <div className={styles.iconAndDesc}>
                <img
                  className={styles.socialIcon}
                  src="/assets/icons/facebookIcon.png"
                  alt="Logo"
                />
                <p>Funky Films</p>
              </div>
              <div className={styles.iconAndDesc}>
                <img
                  className={styles.socialIcon}
                  src="/assets/icons/twitterIcon.png"
                  alt="Logo"
                />
                <p>@funkyfilms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyrightWrapper}>
        <p>&copy;2021</p>
      </div>
    </div>
  );
};

export default Footer;

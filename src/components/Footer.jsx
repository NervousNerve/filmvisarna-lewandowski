import styles from "../css/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src="/assets/icons/logo.png" alt="Logo" />
      </div>
      <div className={styles.headerAndLogoWrapper}>
        <h1>Our story</h1>
      </div>
      <div className={styles.aboutWrapper}>
        <p>
          So much can be said about the movie industry, but we are not the ones
          to tell you the lot. But we can tell you this; it's a god damn dream
          to be part of it. We love movies, we eat, sleep, drink and shit
          movies. We. Are. Movies. For 250 years, Funky films have been
          entertaining every day folks like yourself, and we been doin' it good.
          Rachel van Grauenbach founded Funky Films in 1756, and she's been ever
          present since. It is her fire and devotion that powers our 65/70
          projectors every day, from 15:00 to 23:00, it is her tender smile that
          stills calms us on a big premiere, it is her strong perfume that keeps
          the operator awake during long screenings. If it wasn't for her, ah
          shit I dont' care to come up with anything good here. That's it guys.
        </p>
      </div>

      <div className={styles.copyrightWrapper}>
        <h4>Funky Films 1756-2021&copy;</h4>
      </div>
    </div>
  );
};

export default Footer;

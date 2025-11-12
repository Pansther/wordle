import cx from "clsx";

import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={cx("font-main", styles.footer)}>
      <div className={styles.copy}>
        Copyright © {new Date().getFullYear()} wwDev
      </div>
      <div className={styles.nav}>
        <a target="_blank" href="https://github.com/Pansther/wordle">
          GitHub
        </a>
        |
        <a
          target="_blank"
          href="https://github.com/Pansther/wordle?tab=readme-ov-file#how-to-play"
        >
          How to Play
        </a>
        |
        <a
          target="_blank"
          href="https://github.com/Pansther/wordle?tab=readme-ov-file#%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%99"
        >
          วิธีเล่น
        </a>
      </div>
    </footer>
  );
};

export default Footer;

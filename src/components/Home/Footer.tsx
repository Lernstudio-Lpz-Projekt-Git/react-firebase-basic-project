import React, { FC } from "react";
import styles from "./Footer.module.scss";

interface FooterProps {
  Copyright: string;
}

const Footer: FC<FooterProps> = (props) => (
  <div className={styles.Footer}>
    <footer className={styles.HomeFooter}>
      <h4>FOOTER {props.Copyright}</h4>
    </footer>
  </div>
);

export default Footer;

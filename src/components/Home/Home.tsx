import { FC, useState } from "react";
import styles from "./Home.module.scss";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import WeekDropdown from "../WeekDropdown/WeekDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

interface HomeProps {}

const Home: FC<HomeProps> = () => {

  return (
    <>
    <div className={styles.Home}>
      <header className={styles.HomeHeader}>
        <h2>HOME des React+Firebase-Basic Project</h2>
        <div className='login'>
          <Button variant="success">
            <Link className={styles.loginBtn} to="/Login">Anmelden</Link>
          </Button>
        </div>
      </header>
      <div className={styles.menu}>
        <WeekDropdown />
      </div>
    </div>
    </>
  );
};

export default Home;

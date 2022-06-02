import { FC, useState } from "react";
import styles from "./Home.module.scss";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import WeekDropdown from "../WeekDropdown/WeekDropdown";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [getBoolean, setBoolean] = useState(true);
  function toggleShow(argBoolean) {
    setBoolean(() => !argBoolean);
    console.log(getBoolean);
  }

  return (
    <div className={styles.Home}>
      <header className={styles.HomeHeader}>
        <h2>HOME des React+Firebase-Basic Project</h2>
        <div className='login'>
          <Button variant="success">
            <Link className={styles.loginBtn} to="/Login">SignIn</Link>
          </Button>
        </div>
      </header>
      <div className={styles.menu}>
        <WeekDropdown />
      </div>
    </div>
  );
};

export default Home;

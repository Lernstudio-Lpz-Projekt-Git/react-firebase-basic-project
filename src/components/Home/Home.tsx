import { FC, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import WeekDropdown from "../WeekDropdown/WeekDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserAuth } from "../../services/UserAuthContext";
import Footer from "./Footer";
import moment, { now } from "moment";
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { user, appLogout } = useUserAuth();

  //STATE FOR WEEK NUMBER
  const [getKW, setKW] = useState(0);
  // WEEK NUMBER CALCULATE
  useEffect(() => {
    const getWeekNumber = () => {
      const nD = new Date(now());
      setKW(() => moment(nD).week()-1);
      console.log(getKW);
    };

    getWeekNumber();
  }, []);

  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await appLogout();
      navigate("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLogin = () => {
    try {
      navigate("/admin");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={styles.Home}>
        <header className={styles.HomeHeader}>
          <h2>HOME des React+Firebase-Basic Project (KW {getKW})</h2>
          <div className="login">
            <Button
              className={styles.loginBtn}
              variant="success"
              onClick={user && user.email ? handleLogOut : handleLogin}
            >
              {user && user.email ? "Abmelden" : "Anmelden"}
            </Button>
          </div>
        </header>
        <h4>
          Hallo,{" "}
          {user && user.email
            ? user.email.split("@", 1)
            : "Du bist nicht angemeldet."}
        </h4>
        <div className={styles.menu}>
          <WeekDropdown />
        </div>
        <Footer Copyright="- Steffen Balmer, Last Update: 5/2022" />
      </div>
    </>
  );
};

export default Home;

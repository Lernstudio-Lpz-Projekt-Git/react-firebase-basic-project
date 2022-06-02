import { collection, getDocs } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase-config";
import styles from "./Admin.module.scss";
import Home from "./components/Home/Home";

interface AdminProps {}

const Admin: FC<AdminProps> = () => {
  const [getWeeks, setWeeks] = useState([]);
  const weeksCollectionRef: object = collection(db, "week-days");
  const adminSignIn = true;

  useEffect(() => {
    const getWeeks = async () => {
      const weeksData = await getDocs(weeksCollectionRef);
      setWeeks(
        weeksData.docs.map((weeks) => {
          return { ...weeks.data(), id: weeks.id };
        })
      );
    };

    getWeeks();
  }, []);

  return (
    <div className={styles.Admin}>
      <header className={styles.HomeHeader}>
        <h2>ADMIN des React+Firebase-Basic Project</h2>
        <div className="login">
          <Button variant="success">
            <Link className={styles.loginBtn} to="/">
              {adminSignIn ? "Logout" : "SignIn"}
            </Link>
          </Button>
        </div>
      </header>
      <div className={styles.menuList}>
        <h2 className="menuListTitle">Verwaltung der Speisepläne</h2>
        <ul className={styles.menuItems}>
        {getWeeks.map((weekDate) => {
            return (
              <li className={styles.item} value={weekDate["id"]} key={weekDate["id"]}>
                <p>Speiseplan vom {weekDate["start-date"]} {"-"}{" "}
                {weekDate["end-date"]} <b> ID: {weekDate["id"]}</b></p>
                <i className="fa fa-trash-o deleteItem"></i>
                <i className="fa fa-refresh updateItem"></i>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Admin;

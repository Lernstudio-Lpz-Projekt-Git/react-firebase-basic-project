import { collection, getDocs } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firebasedb } from "../../services/firebase-config";
import "./Admin.scss";
//import Home from "./components/Home/Home";

interface AdminProps {}

const Admin: FC<AdminProps> = () => {
  const [getWeeks, setWeeks] = useState([]);
  const weeksCollectionRef = collection(firebasedb, "week-days");
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
    <div className="Admin">
      <header className="HomeHeader">
        <h2>ADMIN des React+Firebase-Basic Project</h2>
        <div className="login">
          <Button variant="success">
            <Link className="logoutBtn" to="/">
              {adminSignIn ? "Logout" : "SignIn"}
            </Link>
          </Button>
        </div>
      </header>
      <div className="menuList">
        <h2 className="menuListTitle">Verwaltung der Speisepläne</h2>
        <ul className="menuItems">
          {getWeeks.map((weekDate) => {
            return (
              <li className="item" value={weekDate["id"]} key={weekDate["id"]}>
                <p>
                  Speiseplan vom {weekDate["start-date"]} {"-"}{" "}
                  {weekDate["end-date"]} <b> (ID: {weekDate["id"]})</b>
                </p>
                <div className="editBtn">
                  <i className="fa fa-refresh updateItem"></i>
                  <i className="fa fa-trash-o deleteItem"></i>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="addMenu">
        <Button variant="success">
          <Link className="addMenuBtn" to="/new">
            Speiseplan hinzufügen
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Admin;

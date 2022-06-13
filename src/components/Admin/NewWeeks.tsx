import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import shortid from "shortid";
// https://react-icons.github.io/react-icons/icons?name=fa
import { FaPlusCircle } from "react-icons/fa";
import React, { FC, useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { firebasedb } from "../../services/firebase-config";
import "./NewWeeks.scss";
import { useUserAuth } from "../../services/UserAuthContext";
import { FaSearch } from "react-icons/fa";
import { NewMenuForm } from "./NewMenuForm";
import MenuItem from "./MenuItem";

interface NewWeeksProps {}

const NewWeeks: FC<NewWeeksProps> = () => {
  const [getMenus, setMenus] = useState([]);
  const menuCollectionRef = collection(firebasedb, "fb-menu-db");
  // Date Picker for Start / End of Week
  //const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const currStartDate = new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
  });

  const currEndDate = new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [getStartDate, setStartDate] = useState(currStartDate);
  const [getEndDate, setEndDate] = useState(currEndDate);

  const dbObjProps = [
    "montag",
    "dienstag",
    "mittwoch",
    "donnerstag",
    "freitag",
    "samstag",
    "sonnatg",
  ];

  useEffect(() => {
    const getMenus = async () => {
      const menusData = await getDocs(menuCollectionRef);
      setMenus(
        menusData.docs.map((menus) => {
          return { ...menus.data(), id: menus.id };
        })
      );
    };

    getMenus();
  }, []);

  const { user, appLogout } = useUserAuth();
  console.log("getCurrentUser:", user.uid);

  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await appLogout();
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const refreshListItem = async () => {
    const menusData = await getDocs(menuCollectionRef);
    setMenus(
      menusData.docs.map((menus) => {
        return { ...menus.data(), id: menus.id };
      })
    );
  };

  const showAddMenuForm = async (e: any) => {
    e.preventDefault();
    let showMenuElem = document.getElementById("addMenuForm");
    showMenuElem?.classList.toggle("showAddmenu");
    if (showMenuElem && !showMenuElem.classList.contains("showAddmenu")) {
      refreshListItem();
    }
  };

  const deletMenuItem = async (e) => {
    e.preventDefault();
    const getAuthConnection: any = collection(firebasedb, "users");
    const queryResult: any = query(
      getAuthConnection,
      where("uid", "==", user.uid)
    );
    console.log("deletMenuItem", e.currentTarget.id);
    let itemID = e.currentTarget.id;
    await deleteDoc(doc(firebasedb, "fb-menu-db", itemID));
    refreshListItem();
  };

  return (
    <div className="Admin">
      <header className="HomeHeader">
        <h2>ADMIN: Neuen Speiseplan anlegen</h2>
        <div className="login">
          <Button
            className="logoutBtn"
            variant="success"
            onClick={handleLogOut}
          >
            Abmelden
          </Button>
        </div>
      </header>
      <div
        className="NewWeeks"
        key={shortid.generate()}
        id={shortid.generate()}
      >
        <h4>Hallo {user.email.split("@", 1)}</h4>
        <div className="weekGenerator">
          <div className="showWeekForm">
            <div className="dateForm">
              <Form.Group controlId="startDate">
                <span className="dateTitle">Anfang der Woche:</span>
                <Form.Control
                  type="date"
                  pattern="\d{2}-\d{2}-\d{4}"
                  name="startdate"
                  placeholder="Startdatum"
                  value={getStartDate.toLocaleString()}
                  onChange={(e) =>
                    setStartDate(
                      new Date(e.target.value).toLocaleString("de-DE", {
                        timeZone: "Europe/Berlin",
                        day: "2-digit",
                        month: "2-digit",
                      })
                    )
                  }
                />
              </Form.Group>
              <Form.Group controlId="endDate">
                <span className="dateTitle">Ende der Woche:</span>
                <Form.Control
                  type="date"
                  pattern="\d{2}-\d{2}-\d{4}"
                  name="enddate"
                  placeholder="Enddatum"
                  value={getEndDate}
                  onChange={(e) =>
                    setEndDate(
                      new Date(e.target.value).toLocaleString("de-DE", {
                        timeZone: "Europe/Berlin",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    )
                  }
                />
              </Form.Group>
            </div>
            <div className="menuListTitle">
              <span>Neuer Wochenplan vom</span>{" "}
              <span>
                {getStartDate}-{getEndDate}
              </span>
            </div>
            <ul className="weekList">
              {dbObjProps.map((prop, index) => {
                return (
                  <li
                    className="weekDropzone"
                    key={shortid.generate()}
                    id={shortid.generate()}
                  >
                    <div className="day">{prop.toLocaleUpperCase()}</div>
                    <div className="DropData">Drop-Zone</div>
                  </li>
                );
              })}
            </ul>
            {/* Save Button */}
            <div className="saveWeek">
              <Button size="lg" variant="success">
                <Link className="saveBtn" to="/admin">
                  Speichern
                </Link>
              </Button>
            </div>
          </div>
          <div className="mealContainer">
            <div className="menuFilter">
              <p className="filterTitle">Menüs Filtern:{""}</p>
              <input type="text" placeholder="Suche" className="filterInput" />
              <FaSearch className="filterIcon" />
            </div>
            <div className="mealListTitle">
              <span className="t">
                {getMenus.length} Gespeicherte Speisen:
                <FaPlusCircle
                  className="FaPlusCircle"
                  onClick={showAddMenuForm}
                />
              </span>
            </div>
            <div className="addMenuForm" id="addMenuForm">
              <NewMenuForm />
            </div>
            <div className="mealContent">
              <ul className="mealItems">
                {getMenus.map((menuValues) => {
                  return (
                    <>
                      <MenuItem
                        itemId={menuValues["id"]}
                        title={menuValues["title"]}
                        descr={menuValues["descr"]}
                        veg={menuValues["veg"]}
                        deletMenuItem={deletMenuItem}
                      />
                    </>
                  );
                })}
                ;
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWeeks;

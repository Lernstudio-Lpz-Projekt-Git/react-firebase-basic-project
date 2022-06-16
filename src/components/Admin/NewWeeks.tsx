import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
  getDoc,
  //DocumentSnapshot,
} from "firebase/firestore";
import shortid from "shortid";
// https://react-icons.github.io/react-icons/icons?name=fa
import { FaPlusCircle } from "react-icons/fa";
import { FC, SetStateAction, useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { firebasedb } from "../../services/firebase-config";
import "./NewWeeks.scss";
import { useUserAuth } from "../../services/UserAuthContext";
import { FaSearch } from "react-icons/fa";
import { NewMenuForm } from "./NewMenuForm";
import MenuItem from "./MenuItem";
//import { useDrop } from "react-dnd";
import { DropBoxs } from "./DropBoxs";

interface NewWeeksProps {}

const NewWeeks: FC<NewWeeksProps> = () => {
  const menuCollectionRef = collection(firebasedb, "fb-menu-db");

  // Get All MENU-ITEMS
  const [getMenus, setMenus] = useState([]);
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

  // MANAGE DATE FORMAT
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

  const interfaceNewWeeksList = {
    montag: { title: "", descr: "", id: "", veg: false },
    dienstag: { title: "", descr: "", id: "", veg: false },
    mittwoch: { title: "", descr: "", id: "", veg: false },
    donnerstag: { title: "", descr: "", id: "", veg: false },
    freitag: { title: "", descr: "", id: "", veg: false },
    samstag: { title: "", descr: "", id: "", veg: false },
    sonnatg: { title: "", descr: "", id: "", veg: false },
  };

  const [dbNewWeeksList, setDBNewWeeksList] = useState(interfaceNewWeeksList);
  const addValuesTodbNewWeeksList = (
    title: string,
    descr: string,
    veg: boolean,
    id: string,
    DAY: string
  ) => {
    let copyStateList = { ...dbNewWeeksList };
    let getDay = copyStateList[DAY];
    //console.log(getDay);
    copyStateList[DAY]["title"] = title;
    copyStateList[DAY]["descr"] = descr;
    copyStateList[DAY]["veg"] = veg;
    copyStateList[DAY]["id"] = id;
    setDBNewWeeksList(() => ({ ...copyStateList }));
    //console.log("NewWeek-List", dbNewWeeksList);
    setSaveBtnDisabled(false);
    setResetBtnDisabled(false);
  };

  const { user, appLogout } = useUserAuth();
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

  // DELET MENU ITEM
  const deletMenuItem = async (e: any) => {
    e.preventDefault();
    const getAuthConnection: any = collection(firebasedb, "users");
    const queryResult: any = query(
      getAuthConnection,
      where("uid", "==", user.uid)
    );
    //console.log("deletMenuItem", e.currentTarget.id);
    let itemID = e.currentTarget.id;
    await deleteDoc(doc(firebasedb, "fb-menu-db", itemID));
    refreshListItem();
  };

  /// GET BY ID : [getWeekById, setWeekById]
  const [getMenuById, setMenuById] = useState([]);
  const getMenuByIdFunc = async (ID: any, DAY: any): Promise<any> => {
    console.log(ID);
    if (ID != 0) {
      const docRef = doc(firebasedb, "fb-menu-db", ID);
      const menuIDRef = await getDoc(docRef);
      const menuData: any = menuIDRef.data();
      menuData.id = ID;
      console.log("Document data:", menuData);
      //console.log("Day name:", DAY);
      setMenuById((): any => menuData);
      addValuesTodbNewWeeksList(
        menuData.title,
        menuData.descr,
        menuData.veg,
        menuData.id,
        DAY
      );
    } else {
      setMenuById((): any => [{ title: "", descr: "", id: "0", veg: false }]);
    }
  };

  // SAVE BUTTON DISABLED / ENABLED
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [resetBtnDisabled, setResetBtnDisabled] = useState(false);

  const resetWeekMenu = () => {
    dbObjProps.forEach((day) => {
      addValuesTodbNewWeeksList("", "", false, "", day);
    });
    setSaveBtnDisabled(true);
    setResetBtnDisabled(true);
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
              {dbObjProps.map((day, index) => {
                return (
                  <>
                    <DropBoxs
                      index={index}
                      day={day}
                      title={
                        dbNewWeeksList && dbNewWeeksList[day]["title"]
                          ? dbNewWeeksList[day]["title"]
                          : ""
                      }
                      descr={
                        dbNewWeeksList && dbNewWeeksList[day]["descr"]
                          ? dbNewWeeksList[day]["descr"]
                          : "Speise hier ablegen."
                      }
                      key={shortid.generate()}
                      getMenuByIdFunc={getMenuByIdFunc}
                    />
                  </>
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
            <div className="resetWeek">
              <Button
                size="lg"
                variant="secondary"
                disabled={resetBtnDisabled}
                onClick={resetWeekMenu}
              >
                Löschen
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
                        id={menuValues["id"]}
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

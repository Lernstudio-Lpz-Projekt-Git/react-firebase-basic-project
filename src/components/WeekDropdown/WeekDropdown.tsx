import React, { FC } from "react";
import shortid from "shortid";
import { useState, useEffect, useRef } from "react";
import styles from "./WeekDropdown.module.scss";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  Firestore,
  query,
  where,
} from "firebase/firestore";
import { firebasedb } from "../../services/firebase-config";
import GetRefById from "./../GetRefById/GetRefById";

interface Review {
  id?: string;
  title: string;
  subtitle: string;
  startdate: string;
  enddate: string;
  fkref: object;
  montag: string;
  dienstag: string;
  mittwoch: string;
  donnerstag: string;
  freitag: string;
  samstag: string;
  sonnatg: string;
}

interface WeekDropdownProps {}

const WeekDropdown: FC<WeekDropdownProps> = () => {
  const [getWeekById, setWeekById] = useState([]);
  const [getWeeks, setWeeks] = useState([]);
  const weeksCollectionRef: object = collection(
    firebasedb,
    "week-days"
  ).withConverter(null);
  // Einzelne Speisen / Menus
  const [getMenuRef, setMenuRef] = useState([]);
  const menuRefCollection: object = collection(firebasedb, "fb-menu-db");
  const dbObjProps = [
    "montag",
    "dienstag",
    "mittwoch",
    "donnerstag",
    "freitag",
    "samstag",
    "sonnatg",
  ];
  const dbSimpleProps = [
    "title",
    "sub-title",
    "start-date",
    "end-date",
    "fkref",
  ];

  /// GET BY ID : [getWeekById, setWeekById]
  const getWeekByIdFunc = async (ID: any) => {
    console.log(ID);
    if (ID != 0) {
      const docRef = doc(firebasedb, "week-days", ID);
      const weekIDRef = await getDoc(docRef);
      console.log("Document data:", weekIDRef.data());
      setWeekById(() => weekIDRef.data());
    } else {
      setWeekById(() => {
        [];
      });
    }
  };

  const getDataByMenuChange = (e: any) => {
    const ID = e.target.value;
    getWeekByIdFunc(ID);
  };

  // GET ALL WEEKS : [getWeeks, setWeeks]
  useEffect(() => {
    const getWeeksFunc = async () => {
      const weeksData = await getDocs(weeksCollectionRef);
      setWeeks(
        weeksData?.docs.map((weeks) => {
          return { ...weeks.data(), id: weeks.id };
        })
      );
    };

    getWeeksFunc();
  }, []);

  // GET ALL MENUS  [getMenuRef, setMenuRef]
  useEffect(() => {
    const getMenuRef = async () => {
      const menuRefData = await getDocs(menuRefCollection);
      setMenuRef(
        menuRefData.docs.map((menus) => {
          return { ...menus.data(), id: menus.id };
        })
      );
    };

    getMenuRef();
  }, []);

  /// Render Ausgabe:
  return (
    <div className={styles.WeekDropdown}>
      <div className={styles.selectMenu}>
        <select
          className="selectBox classic"
          id="selectBoxId"
          name="weeksMenu"
          onChange={getDataByMenuChange}
        >
          <option key="optioan_list_key" value="0">
            Woche auswählen ...
          </option>
          {getWeeks.map((weekDate) => {
            return (
              <option value={weekDate["id"]} key={weekDate["id"]}>
                Speiseplan vom {weekDate["start-date"]} {"-"}{" "}
                {weekDate["end-date"]}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.weeks} key="WEEKS">
        {Array(getWeekById).map((week, i) => {
          if (week === undefined || week.length === 0) {
            return <div key={i}>Bitte eine Woche auswählen.</div>;
          } else {
            return (
              <>
                <div
                  className="ausgabe"
                  key={shortid.generate()}
                  id={shortid.generate()}
                >
                  <h2 className="ausg-title">{getWeekById["title"]}</h2>
                  <h3 className="ausg-subt">
                    {getWeekById["sub-title"]} {getWeekById["start-date"]} -{" "}
                    {getWeekById["end-date"]}
                  </h3>
                </div>
                <div className="main" key={shortid.generate()}>
                  <div className="menu">
                    {dbObjProps.map((prop, index) => {
                      return (
                        <div
                          className="menu-ausg"
                          key={shortid.generate()}
                          id={shortid.generate()}
                        >
                          <div
                            className="menu-title"
                            key={shortid.generate()}
                            id={shortid.generate()}
                          >
                            {prop.toLocaleUpperCase()}
                          </div>
                          <div
                            className="menu-content"
                            key={shortid.generate()}
                            id={shortid.generate()}
                          >
                            <h4>{week[prop][0]}</h4>
                            <i>{week[prop][1]}</i>
                          </div>
                          <p
                            className="menu-img"
                            key={shortid.generate()}
                            id={shortid.generate()}
                          >
                            {week[prop][2] ? (
                              <img
                                src="../src/assets/images/vegan.png"
                                alt="Vegatarisch"
                              />
                            ) : (
                              <img
                                src="../src/assets/images/not-vegan.png"
                                alt="Vegatarisch"
                              />
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      <div className="ref">
        <GetRefById />
      </div>
    </div>
  );
};

export default WeekDropdown;

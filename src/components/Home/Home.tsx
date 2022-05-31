import React, { FC } from "react";
import { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  Firestore,
} from "firebase/firestore";
import { db } from "../../services/firebase-config";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [getWeekById, setWeekById] = useState([]);
  const [getWeeks, setWeeks] = useState([]);
  const weeksCollectionRef: object = collection(db, "week-days");

  const getWeekByIdFunc = async (ID: any) => {
    console.log(ID);
    if (ID != 0) {
      const docRef = doc(db, "week-days", ID);
      const weekIDRef = await getDoc(docRef);
      //console.log("Document data:", weekIDRef.data());
      setWeekById(() => weekIDRef.data());
    } else {
      setWeekById(() => {
        {
        }
      });
    }
  };

  const getDataByMenuChange = (e: any) => {
    const ID = e.target.value;
    getWeekByIdFunc(ID);
  };

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
    <div className={styles.Home}>
      Home Component
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
    </div>
  );
};
export default Home;

import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { firebasedb } from "../../services/firebase-config";
import styles from "./GetRefById.module.scss";
import { getDatabase, onValue, ref } from "firebase/database";

interface GetRefByIdProps {}

const GetRefById: FC<GetRefByIdProps> = () => {
  const [getWeekById, setWeekById] = useState([]);

  // Get Firebase Firestore 'Reference' data type
  const getDataRefListener = () => {
    const database = getDatabase();
    const menuRef = ref(database, "/week-days/Ng3OfuTVKWcXSXSCTA9l/fkref");
    console.log("starCountRef: ", menuRef);
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      console.log("getData: ", data);
      return data;
    });
  };
  const myData = getDataRefListener();
  // END GETTING

  useEffect(() => {
    const getWeekByIdFunc = async (ID: string | number) => {
      console.log(ID);
      if (ID != 0) {
        const docRef = doc(firebasedb, "week-days", ID);
        const weekIDRef = await getDoc(docRef);
        console.log("GetRefById data:", weekIDRef.data());
        setWeekById((): any => weekIDRef.data());
      } else {
        setWeekById((): any => {
          [];
        });
      }
    };
    getWeekByIdFunc("Ng3OfuTVKWcXSXSCTA9l");
  }, []);

  return (
    <div className={styles.GetRefById}>
      <>
        <p className="data">Title: {Array(getWeekById["title"])} </p>
      </>
    </div>
  );
};

export default GetRefById;

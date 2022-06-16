import { FC, useEffect, useRef, useState } from "react";
import styles from "./NewMenuForm.module.scss";
import shortid from "shortid";
import { db, firebasedb } from "../../services/firebase-config";
import { set, ref, query } from "firebase/database";
import { Button, Form, FormGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useUserAuth } from "../../services/UserAuthContext";
import { collection, doc, getDocs, setDoc, where } from "firebase/firestore";

interface NewMenuFormProps {}

export const NewMenuForm: FC<NewMenuFormProps> =  () => {
  // show add menu form
  const [menuTitle, setMenuTitle] = useState("");
  const [menuDescr, setMenuDescr] = useState("");
  const [menuVeg, setMenuVeg] = useState(true);

  const handleTitleChange = (e: any) => {
    e.preventDefault();
    setMenuTitle(e.target.value);
    console.log("Title", e.target.value);
  };

  const handleDescrChang = (e: any) => {
    e.preventDefault();
    setMenuDescr(e.target.value);
    console.log("Descr", e.target.value);
  };
  const handleVegChange = (e: any) => {
    //e.preventDefault();
    setMenuVeg(menuVeg);
    if (e.target.checked) {
      e.target.removeAttribute("checked");
    } else {
      e.target.setAttribute("checked", true);
    }
    console.log("Veg", menuVeg);
  };

  const { user } = useUserAuth();
  const writeToDatabase = async (e: any) => {
    e.preventDefault();
    console.log("newMenuCurrentUser:", user.uid);
    const uID = uuidv4().replaceAll("-", "").substr(0, 20);
    const getAuthConnection: any = collection(firebasedb, "users");
    const queryResult: any = query(
      getAuthConnection,
      where("uid", "==", user.uid)
    );
    const setDocData = {
      title: menuTitle,
      descr: menuDescr,
      veg: menuVeg,
    };
    setDoc(doc(firebasedb, `/fb-menu-db/${uID}`), setDocData);
    setMenuDescr("");
    setMenuTitle("");
    setMenuVeg(false);
  };

  const onSubmitHandle = () => {
    console.log("Hallo onSubmitHandle");
  };

  return (
    <div className={styles.NewMenuForm}>
      <>
        <Form onSubmit={onSubmitHandle} className="addFormComp">
          <div className="form-group">
            <input
              required
              type="text"
              id="addTitleField"
              className="addTitle"
              placeholder="Titel der Speise"
              value={menuTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              type="text"
              id="addDescrField"
              className="addDescr"
              placeholder="Kurze Beschreibung"
              value={menuDescr}
              onChange={handleDescrChang}
            />
          </div>
          <div className="form-group checkBox">
            <input
              type="checkbox"
              //ref={checkBoxRef}
              //value={menuVeg}
              id="addVeg"
              className="addVeg"
              onChange={handleVegChange}
            />
            <label className="checkBox-label" htmlFor="addVeg">
              Vegetarisch
            </label>
          </div>

          <Button
            className="addSubmit"
            variant="success"
            onClick={writeToDatabase}
          >
            Speichern
          </Button>
        </Form>
      </>
    </div>
  );
};

//export default NewMenuForm;

import { FC, useEffect, useRef, useState } from "react";
import styles from "./NewMenuForm.module.scss";
import shortid from "shortid";
import { db } from "../../services/firebase-config";
import { set, ref } from "firebase/database";
import { Button, Form, FormGroup } from "react-bootstrap";
import React from "react";
import { FaPassport } from "react-icons/fa";

interface NewMenuFormProps {}

export const NewMenuForm: FC<NewMenuFormProps> = () => {
  // show add menu form
  const [menuTitle, setMenuTitle] = useState("");
  const [menuDescr, setMenuDescr] = useState("");
  const [menuVeg, setMenuVeg] = useState(true);
  //const checkBoxRef = useRef(null);

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
    setMenuVeg(!menuVeg);
    if (e.target.checked){
      e.target.removeAttribute('checked');
   } else {
      e.target.setAttribute('checked', true);
   }
    console.log("Veg", menuVeg);
  };

  const writeToDatabase = (e: any) => {
    e.preventDefault();
    const uID = shortid.generate();
    set(ref(db, `/fb-menu-db`), { menuTitle, menuDescr, menuVeg });
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

import React, { FC } from "react";
import shortid from "shortid";
import styles from "./MenuItem.module.scss";
import { useDrag } from "react-dnd";

interface MenuItemProps {
  itemId: string;
  title: string;
  descr: string;
  veg: boolean;
  deletMenuItem;
}

const MenuItem: FC<MenuItemProps> = ({
  itemId,
  title,
  descr,
  veg,
  deletMenuItem,
}) => {
  // CODE HERE
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "images",
    item: {id:itemId},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <li className="mealItem" value={itemId} key={itemId} id={itemId} ref={drag} style={{border: isDragging ? "1px solid #00f": "1px dotted #282c34"}}>
      <>
        <p className="t" key={shortid.generate()} id={shortid.generate()}>
          {" "}
          <b>{title}:</b>
        </p>
        <p className="d">{descr.split(" ", 3).map((e) => e + " ")} ...</p>
        <p className="veg">
          {veg ? (
            <img src="../src/assets/images/vegan.png" alt="Vegatarisch" />
          ) : (
            <img src="../src/assets/images/not-vegan.png" alt="Vegatarisch" />
          )}
        </p>
        <p onClick={deletMenuItem} id={itemId}>
          <i className="fa fa-trash-o deleteItem"></i>
        </p>
      </>
    </li>
  );
};

export default MenuItem;

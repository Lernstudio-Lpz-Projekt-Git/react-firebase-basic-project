import React, { CSSProperties, FC } from "react";
import shortid from "shortid";
//import styles from "./MenuItem.module.scss";
import { useDrag } from "react-dnd";
import MenuTypes from "./MenuTypes";

interface MenuItemProps {
  id: string;
  title: string;
  descr: string;
  veg: boolean;
  deletMenuItem: any;
}

// const style: CSSProperties = {
//   cursor: "move",
// };

const MenuItem: FC<MenuItemProps> = (props) => {
  // CODE HERE
  const [{ isDragging }, drag] = useDrag({
    type: MenuTypes.MENU,
    item: { id: props.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const style = {
    border: isDragging ? "1px solid #000" : "1px dotted #282c34",
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <li
      className="mealItem"
      style={{ ...style }}
      key={props.id}
      id={props.id}
      ref={drag}
    >
      <>
        <p className="t" key={shortid.generate()} id={shortid.generate()}>
          {" "}
          <b>
            {props.title}
          </b>
        </p>
        <p className="d">{props.descr.split(" ", 3).map((e) => e + " ")} ...</p>
        <p className="veg">
          {props.veg ? (
            <img src="../src/assets/images/vegan.png" alt="Vegatarisch" />
          ) : (
            <img src="../src/assets/images/not-vegan.png" alt="Vegatarisch" />
          )}
        </p>
        <p onClick={props.deletMenuItem} id={props.id}>
          <i className="fa fa-trash-o deleteItem"></i>
        </p>
      </>
    </li>
  );
};

export default MenuItem;

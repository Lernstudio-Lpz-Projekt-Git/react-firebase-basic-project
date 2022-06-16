import React, { FC } from "react";
import styles from "./DropBoxs.module.scss";
import { useDrop } from "react-dnd";
import MenuTypes from "./MenuTypes";

interface DropBoxsProps {
  index: any;
  day: string;
  id: any;
  title: string;
  descr: string;
  getMenuByIdFunc;
}

export const DropBoxs = (props) => {
  //console.log("Alle Props: ", props);

  const [{ isOver }, drop] = useDrop({
    accept: MenuTypes.MENU,
    drop: (item: any) => props.getMenuByIdFunc(item.id, props.day),
    //drop: (item: any) => console.log(props.index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  let backgroundColor = isOver ? "#a6ffbe" : "#fff";
  const style = {
    border: isOver ? "1px solid #000" : "1px dotted #282c34",
  };
  return (
    <li
      ref={drop}
      className="weekDropzone"
      style={{ ...style, backgroundColor }}
      key={props.shortId}
    >
      <div className="day">{props.day.toUpperCase()}</div>
      <div className="DropData">
        {props.title ? (
          <div className="DropData">
            <p>
              <b>{props.title} </b>
              {props.veg ? (
                <img
                  src="../src/assets/images/vegan.png"
                  className="vegInWeek"
                  alt="Vegatarisch"
                />
              ) : (
                <img
                  src="../src/assets/images/not-vegan.png"
                  className="vegInWeek"
                  alt="Nicht Vegatarisch"
                />
              )}
            </p>
            <p>{props.descr}</p>
          </div>
        ) : (
          "Speise hier hineinziehen."
        )}
      </div>
    </li>
  );
};

//export default DropBoxs;

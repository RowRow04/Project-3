import React from "react";
import crankUp from "../assets/img/boards/crankUp.png";
import exitTest from "../assets/img/boards/exitTest.png";
import gearUp from "../assets/img/boards/gearUp.png";
import openUp from "../assets/img/boards/openUp.png";
import putUp from "../assets/img/boards/putUp.png";
import stepUp from "../assets/img/boards/stepUp.png";
import tuneUp from "../assets/img/boards/tuneUp.png";
import windUp from "../assets/img/boards/windUp.png";
import catchUp from "../assets/img/boards/catchUp.png";
import sparkUp from "../assets/img/boards/sparkUp.png";
import performanceTask from "../assets/img/boards/performanceTask.png";

const boards = {
  "CRANK UP": crankUp,
  "EXIT TEST": exitTest,
  "GEAR UP": gearUp,
  "OPEN UP": openUp,
  "PUT UP": putUp,
  "STEP UP": stepUp,
  "TUNE UP": tuneUp,
  "WIND UP": windUp,
  "CATCH UP": catchUp,
  "SPARK UP": sparkUp,
  "PERFORMANCE TASK": performanceTask,
};

const ItemBoard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" relative  hover:scale-105 duration-150 cursor-pointer"
    >
      <img className="w-full" alt={item.type} src={boards[item.type]} />
    </div>
  );
};

export default ItemBoard;

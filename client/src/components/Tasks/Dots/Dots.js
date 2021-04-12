import React, { useState, useEffect } from "react";
import { generateYearArray } from "../../../utils/utils";
import "./Dots.css";

function Dots(props) {
  const submits = props.submits;
  const taskId = props.taskId;

  useEffect(() => {
    submits
      .map((e) => e.date.split("T")[0])
      .forEach((e) => {
        document.getElementById(`${e}-${taskId}`).style.backgroundColor =
          "#30a14e";
      });

    return () => {};
  }, []);
  return (
    <div className="dots-container">
      {generateYearArray().map((e) => (
        <div className="rect" id={`${e}-${taskId}`}></div>
      ))}
    </div>
  );
}

export default Dots;

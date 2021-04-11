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

    const dummy = () => {
      let dummyArray = [];
      for (let i = 0; i < 30; i++) {
        let date = new Date();
        date.setFullYear(
          2021,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 29)
        );
        date.setHours(0, 0, 0, 0);
        const newDate = date.toISOString().split("T")[0];
        dummyArray.push(newDate);
        dummyArray.forEach((e) => {
          document.getElementById(`${e}-${taskId}`).style.backgroundColor =
            "#30a14e";
        });
      }
    };
    dummy();

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

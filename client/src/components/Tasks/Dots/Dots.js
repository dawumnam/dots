import React, { useState, useEffect, useLayoutEffect } from "react";
import { generateYearArray } from "../../../utils/utils";
import "./Dots.css";

function Dots(props) {
  const taskId = props.taskId;
  const [submits, setSubmits] = useState(props.submits);
  const [yearArray, setYearArray] = useState(generateYearArray());

  const handleClick = (e) => {
    let a = document.getElementById(`${e.target.id}-dropdown`);
    if (a.style.display == "block") {
      a.style.display = "none";
      e.target.style.border = "none";
    } else {
      a.style.display = "block";
      e.target.style.border = "1px solid lightgray";
      e.target.style.borderRadius = "1px";
    }
  };

  useEffect(() => {
    submits.forEach((e) => {
      const parsedDate = e.date.split("T")[0];
      document.getElementById(`${parsedDate}-${taskId}`).style.backgroundColor =
        "#30a14e";
      document.getElementById(`${parsedDate}-${taskId}-dropdown`).innerHTML =
        e.message;
    });
    return () => {};
  }, [submits]);

  return (
    <div className="dots-container">
      {yearArray.map((date) => (
        <div
          className="rect"
          onClick={(e) => handleClick(e)}
          id={`${date}-${taskId}`}
        >
          <div className="dropdown-wrapper">
            <div
              class="dropdown-content"
              id={`${date}-${taskId}-dropdown`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dots;

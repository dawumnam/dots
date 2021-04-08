import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

import "./App.css";
const getWeek = (props) => {
  var date = props;
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// Returns the four-digit year corresponding to the ISO week of the date.

function App() {
  const [year, setYear] = useState(2021);

  useEffect(() => {
    let twentyOne = [];
    let date = new Date();
    date.setFullYear(year, 0, 10);
    date.setHours(0, 0, 0, 0);

    console.log(getWeek(date));
    return () => {};
  }, [year]);

  const style = {
    top: `${date.getDay() * 12}px`,
    left: `${getWeek(date) === 53 ? 1 : getWeek(date) * 12}px`,
  };

  let twentyOne = [];
  let date = new Date();

  return (
    <>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
      <div className="rect"></div>
    </>
  );
}

export default App;

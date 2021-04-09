import logo from "./logo.svg";
import React, { useState, useEffect, useRef } from "react";
import Tasks from "./components/Tasks/Tasks";

import "./App.css";

function App() {
  /* let array = [];
  for (let i = 0; i < 365; i++) {
    let date = new Date();
    date.setFullYear(2021, 0, 1);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + i);
    const newDate = date.toISOString().split("T")[0];
    array.push(newDate);
  }
 */
  /*   let dummyArray = [];
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
  } */
  /*   const [year, setYear] = useState(array);

  const styles = { "background-color": "green" };
 */
  /*   useEffect(() => {
    dummyArray.forEach((element) => {
      document.getElementById(element).style.backgroundColor = "#30a14e";
    });
    render.current++;
    return () => {};
  }, []); */

  return (
    <div>
      <Tasks />
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import Tasks from "./components/Tasks/Tasks";
import NavBar from "./components/NavBar/NavBar";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");
  return (
    <div className="body">
      <NavBar
        title={title}
        setTitle={setTitle}
        setTasks={setTasks}
        tasks={tasks}
      />
      <div className="content">
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;

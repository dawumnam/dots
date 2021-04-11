import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <BrowserRouter>
      <div className="body">
        <div className="content">
          <NavBar
            title={title}
            setTitle={setTitle}
            setTasks={setTasks}
            tasks={tasks}
            currentUser={currentUser}
          />
          <Switch>
            <Route exact path="/">
              <Tasks tasks={tasks} setTasks={setTasks} />
            </Route>
            <Route exact path="/auth">
              <Auth setCurrentUser={setCurrentUser} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

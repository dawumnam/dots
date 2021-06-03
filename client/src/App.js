import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import Forgot from "./components/ForgotPassword/ForgotPassword";

import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = localStorage?.getItem("user");
    if (user) setCurrentUser(JSON.parse(user));
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
            setCurrentUser={setCurrentUser}
          />
          <Switch>
            <Route exact path="/">
              <Tasks tasks={tasks} setTasks={setTasks} />
            </Route>
            <Route exact path="/auth">
              <Auth setCurrentUser={setCurrentUser} />
            </Route>
            <Route exact path="/forgot">
              <ForgotPassword />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

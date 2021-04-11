import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createTask } from "../../api/task";

import "./NavBar.css";

function NavBar(props) {
  const { title, setTitle, setTasks, tasks, currentUser } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: newTask } = await createTask({ title });
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  return (
    <div className="nav-wrapper">
      <div className="logo">
        <i class="fas fa-braille fa-2x"></i>
        <Link to="/">
          <h1>Dots</h1>
        </Link>
      </div>
      {currentUser?._id ? (
        <>
          <form className="newtitle-form" onSubmit={handleSubmit}>
            <label>
              <input
                className="newtitle-form-input"
                placeholder="  More tasks..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <input
              className="newtitle-form-submit-button"
              type="submit"
              value="Submit"
            />
          </form>
        </>
      ) : (
        <Link to="/auth">
          <button className="signin-button">Sign in</button>
        </Link>
      )}
    </div>
  );
}

export default NavBar;

import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createTask } from "../../api/task";
import { signout } from "../../api/auth";
import "./NavBar.css";

function NavBar(props) {
  const { title, setTitle, setTasks, tasks, currentUser, setCurrentUser } =
    props;
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: newTask } = await createTask({ title });
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    signout(currentUser);
    setTasks({});
    setCurrentUser({});
    localStorage.clear();
    history.push("/auth");
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
          <div className="signout-button" onClick={handleSignout}>
            Signout
          </div>
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

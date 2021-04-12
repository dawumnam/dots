import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../api/auth";

import "./Auth.css";

function Auth(props) {
  const history = useHistory();
  const { setCurrentUser } = props;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [isSignin, setIsSignin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignin) {
      const response = await signin(user);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
    }

    if (!isSignin) {
      const response = await signup(user);
      localStorage.setItem("user", JSON.stringify(response.data));

      setCurrentUser(response.data);
    }
    history.push("/");
  };

  const handleClick = () => {
    setIsSignin((prev) => !prev);
  };
  return (
    <div className="auth-wrapper">
      <form className="auth-content" onSubmit={handleSubmit}>
        {!isSignin && (
          <>
            <input
              placeholder=" First Name"
              type="text"
              name="firstName"
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
            <input
              placeholder=" Last Name"
              type="text"
              name="lastName"
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          </>
        )}
        <input
          placeholder=" Email"
          type="email"
          name="email"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          placeholder=" Password"
          type="password"
          name="password"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input className="button" type="submit" value="Submit" />
      </form>
      {isSignin ? (
        <button className="sign button" onClick={handleClick}>
          Sign up
        </button>
      ) : (
        <button className="sign button" onClick={handleClick}>
          Sign in
        </button>
      )}
    </div>
  );
}

export default Auth;

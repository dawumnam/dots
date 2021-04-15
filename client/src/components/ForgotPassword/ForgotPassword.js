import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.css";
import * as auth from "../../api/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isForgot, setIsForgot] = useState(true);
  const [newAuthInfo, setNewAuthInfo] = useState({});

  const history = useHistory();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await auth.requestRecoveryCode({ email: newAuthInfo.email });
      const msg = res.data.message;
      setMsg(msg);
      setIsForgot((prev) => !prev);
    } catch (error) {
      const errorMsg = error.response.data.message;
      setMsg(errorMsg);
    }
  };
  const handleNewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.verifyRecoveryCode(newAuthInfo);
      alert("Please sign in with your new password");
      history.push("/signin");
    } catch (error) {
      const errorMsg = error.response.data.message;
      setMsg(errorMsg);
    }
  };
  return (
    <>
      {isForgot ? (
        <div className="forgot-wrapper">
          <form className="forgot-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              name="email"
              onChange={(e) =>
                setNewAuthInfo({
                  ...newAuthInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input className="button" type="submit" value="submit" />
          </form>
        </div>
      ) : (
        <>
          <div className="new-wrapper">
            <form className="new-form" onSubmit={handleNewSubmit}>
              <input
                type="password"
                className="input"
                name="newPassword"
                placeholder="new password"
                onChange={(e) =>
                  setNewAuthInfo({
                    ...newAuthInfo,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="input"
                name="recoveryCode"
                placeholder="recovery code"
                onChange={(e) =>
                  setNewAuthInfo({
                    ...newAuthInfo,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input className="button" type="submit" value="submit" />
            </form>
          </div>
        </>
      )}
      <div>{msg}</div>
    </>
  );
}

export default ForgotPassword;

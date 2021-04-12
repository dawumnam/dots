import axios from "axios";

export const signin = (authInfo) =>
  axios.post("http://localhost:5000/auth/signin", authInfo, {
    withCredentials: true,
  });

export const signup = (authInfo) =>
  axios.post("http://localhost:5000/auth/signup", authInfo, {
    withCredentials: true,
  });

export const signout = () => {
  axios.delete("http://localhost:5000/auth/signout", {
    withCredentials: true,
  });
};

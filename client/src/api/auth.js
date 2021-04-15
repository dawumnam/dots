import axios from "axios";

export const signin = (authInfo) =>
  axios.post("http://localhost:5000/auth/signin", authInfo, {
    withCredentials: true,
  });

export const signup = (authInfo) =>
  axios.post("http://localhost:5000/auth/signup", authInfo, {
    withCredentials: true,
  });

export const signout = (authInfo) => {
  axios.post("http://localhost:5000/auth/signout", authInfo, {
    withCredentials: true,
  });
};

export const requestRecoveryCode = async (email) => {
  const response = await axios.post(
    "http://localhost:5000/auth/passwordrecovery",
    email,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const verifyRecoveryCode = async (authInfo) => {
  const { recoveryCode, email, newPassword } = authInfo;
  const response = await axios.patch(
    "http://localhost:5000/auth/changepassword",
    {
      recoveryCode,
      email,
      newPassword,
    },
    { withCredentials: true }
  );
  return response;
};

import axios from "axios";

export const getTasks = () =>
  axios.get("http://localhost:5000/task", { withCredentials: true });
export const createTask = (title) =>
  axios.post("http://localhost:5000/task", title, { withCredentials: true });
export const submitToTask = (id, comment) =>
  axios.post(`http://localhost:5000/task/${id}`, comment, {
    withCredentials: true,
  });
export const deleteTask = (id) =>
  axios.delete(`http://localhost:5000/task/${id}`, { withCredentials: true });

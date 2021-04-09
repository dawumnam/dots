import axios from "axios";

export const getTasks = () => axios.get("http://localhost:5000/task");
export const creteTask = (title) =>
  axios.post("http://localhost:5000/task", title);
export const submitToTask = (id, comment) =>
  axios.post(`http://localhost:5000/task/${id}`, comment);
export const deleteTask = (id) =>
  axios.delete(`http://localhost:5000/task/${id}`);

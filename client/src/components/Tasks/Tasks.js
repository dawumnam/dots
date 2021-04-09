import React, { useState, useEffect } from "react";
import Dots from "./Dots/Dots";
import { createTask, creteTask, deleteTask, getTasks } from "../../api/task";

function Tasks() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getTasks();
      setTasks(response.data);
      // ...
    }
    fetchData();
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await creteTask({ title });
    setTitle("");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTask(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Dots />
      {tasks.map((e) => (
        <>
          <div>{`${e.title} ${e._id} ${e?.submits}`}</div>
          <button onClick={handleDelete} value={e._id}>
            button
          </button>
        </>
      ))}
    </div>
  );
}

export default Tasks;

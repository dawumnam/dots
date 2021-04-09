import React, { useState, useEffect } from "react";
import Dots from "./Dots/Dots";
import { submitToTask, createTask, deleteTask, getTasks } from "../../api/task";

function Tasks() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [commentObj, setCommentObj] = useState({ comment: "", id: "" });
  const [currentTask, setCurrentTask] = useState({});

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
    const { data: newTask } = await createTask({ title });
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTask(e.target.value);
    setTasks(tasks.filter((element) => element._id !== e.target.value));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { data: newTask } = await submitToTask(commentObj.id, {
      comment: commentObj.comment,
    });
    console.log(newTask);
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

      {tasks.length &&
        tasks.map((e) => (
          <>
            <Dots submits={e.submits} taskId={e._id} />
            <div>{`${e.title} ${e._id} ${e.submits.map((t) => t._id)}`}</div>
            <button onClick={handleDelete} value={e._id}>
              delete
            </button>
            <form onSubmit={handleCommentSubmit}>
              <label>
                comment
                <input
                  type="text"
                  value={commentObj.comment}
                  onChange={(element) =>
                    setCommentObj({
                      ...commentObj,
                      comment: element.target.value,
                      id: e._id,
                    })
                  }
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </>
        ))}
    </div>
  );
}

export default Tasks;

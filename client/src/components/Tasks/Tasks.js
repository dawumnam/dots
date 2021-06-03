import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dots from "./Dots/Dots";
import { submitToTask, createTask, deleteTask, getTasks } from "../../api/task";

import "./Tasks.css";

function Tasks(props) {
  const { setTasks, tasks } = props;
  const [commentObj, setCommentObj] = useState({ comment: "", id: "" });
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getTasks();
      setTasks(response.data);
      // ...
    }
    if (!localStorage.getItem("user")) history.push("/auth");
    fetchData();
    return () => {};
  }, []);

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

  const handleEnter = (e) => {};

  const handleLeave = (e) => {};

  return (
    <div className="tasks-container">
      {tasks?.length &&
        tasks.map((e) => (
          <div
            className="task-container"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            value={e}
          >
            <h2 className="task-title">{e.title}</h2>
            <Dots submits={e.submits} taskId={e._id} />
            <div className="dots-forms-wrapper">
              <form onSubmit={handleCommentSubmit} class="task-comment-form">
                <label>
                  <input
                    type="text"
                    placeholder="More dots..."
                    className="comment-submit-input"
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
                <input
                  className="comment-submit-button"
                  type="submit"
                  value="Submit"
                />
              </form>
              <button
                onClick={handleDelete}
                value={e._id}
                className="delete-button"
              >
                delete
              </button>
            </div>
            <div className="bottom-border"></div>
          </div>
        ))}
    </div>
  );
}

export default Tasks;

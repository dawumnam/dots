import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  creator: String,
  creatorId: String,
  color: String,
  submits: {
    type: [{ message: String, date: { type: Date, default: new Date() } }],
    default: [],
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

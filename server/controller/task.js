import mongoose from "mongoose";

import Task from "../model/task.js";

export const createTask = async (req, res) => {
  try {
    const creatorId = req.id;
    let task = req.body;
    const newTask = new Task({ ...task, creatorId });
    await newTask.save();
    return res.json(newTask);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const submitToTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { comment } = req.body;
    let existingTask = await Task.findById(id);
    await existingTask.submits.push({
      message: comment,
      date: new Date().toISOString,
    });
    const updatedTask = await Task.findByIdAndUpdate(id, existingTask, {
      new: true,
      useFindAndModify: false,
    });
    return res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const existingTask = await Task.findById(id);
    if (!existingTask)
      return res
        .status(400)
        .json({ message: "Task you requested to delete does not exist." });
    await Task.findByIdAndDelete(id);
    return res.status(200).json("Successfully Deleted Task.");
  } catch (error) {
    res.status(500).json(error.messsage);
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error.messsage);
  }
};

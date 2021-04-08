import express from "express";
import {
  createTask,
  submitToTask,
  deleteTask,
  getTasks,
} from "../controller/task.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.post("/:id", submitToTask);
//router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

import express from "express";
import {
  createTask,
  submitToTask,
  deleteTask,
  getTasks,
} from "../controller/task.js";

import { authMiddleware, checkOwner } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.post("/:id", authMiddleware, checkOwner, submitToTask);
//router.patch("/:id", updateTask);
router.delete("/:id", authMiddleware, checkOwner, deleteTask);

export default router;

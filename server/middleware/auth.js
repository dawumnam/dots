import jwt from "jsonwebtoken";
import Task from "../model/task.js";

export const authMiddleware = async (req, res, next) => {
  const cookie = req.headers.cookie?.split("=")[1];
  if (!cookie) return res.status(400).json({ message: "Unauthorized request" });

  const { id } = jwt?.verify(cookie, process.env.PHRASE);
  if (!id) return res.status(400).json({ message: "Unauthorized request" });

  req.id = id;

  next();
};

export const checkOwner = async (req, res, next) => {
  const idFromToken = String(req.id);
  const taskId = String(req.params.id);
  const { creatorId } = await Task.findById(taskId);
  if (creatorId !== idFromToken)
    return res.status(400).json({ message: "Unauthorized request" });

  next();
};

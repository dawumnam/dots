import express from "express";
import { signin, signup, signout } from "../controller/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", authMiddleware, signout);

export default router;

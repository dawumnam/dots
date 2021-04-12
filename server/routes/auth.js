import express from "express";
import { signin, signup, signout } from "../controller/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.delete("/signout", signout);

export default router;

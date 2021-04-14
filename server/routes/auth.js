import express from "express";
import {
  signin,
  signup,
  signout,
  sendPasswordRecoveryCode,
  changePassword,
} from "../controller/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", authMiddleware, signout);
router.get("/passwordrecovery", sendPasswordRecoveryCode);
router.patch("/changepassword", changePassword);

export default router;

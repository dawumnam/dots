import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Auth from "../model/auth.js";
import { authMiddleware } from "../middleware/auth.js";
import { createMailTransporter } from "../utils/mail.js";
import { makeid } from "../utils/utils.js";
import nodemailer from "nodemailer";

const ONE_HOUR_IN_MILISECONDS = 1000 * 60 * 60;

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      throw new Error("Please fill all fields");

    const existingUser = await Auth.findOne({ email });
    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = bcrypt.hashSync(String(password), 12);
    const name = `${firstName} ${lastName}`;
    const user = new Auth({ name, email, password: hashedPassword });

    const savedUser = await user.save();

    const cookie = jwt.sign(
      { name: savedUser.name, email: savedUser.email },
      process.env.PHRASE,
      { expiresIn: "1h" }
    );
    return res
      .cookie("cookie", cookie, {
        maxAge: ONE_HOUR_IN_MILISECONDS,
      })
      .json({
        name: savedUser.name,
        _id: savedUser._id,
        email: savedUser.email,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("Please fill all fields");

    const existingUser = await Auth.findOne({ email });

    if (!existingUser) throw new Error("User does not exist");
    if (!bcrypt.compareSync(String(password), existingUser.password))
      throw new Error("Wrong Password");

    const cookie = jwt.sign(
      { name: existingUser.name, id: existingUser._id },
      process.env.PHRASE,
      { expiresIn: "1h" }
    );
    return res
      .cookie("cookie", cookie, {
        maxAge: ONE_HOUR_IN_MILISECONDS,
        httpOnly: true,
      })
      .json({
        name: existingUser.name,
        _id: existingUser._id,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const signout = (req, res) => {
  try {
    const cookie = req.headers.cookie.split("=")[1];
    const result = jwt.verify(cookie, process.env.PHRASE);
    const id = req.body._id;
    const _id = result.id;

    if (_id !== id)
      return res
        .status(400)
        .json({ success: false, message: "signin auth failed" });

    return res
      .clearCookie("cookie")
      .json({ success: true, message: "successfully signed out" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const sendPasswordRecoveryCode = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Auth.findOne({ email });
    if (!existing)
      return res.status(400).json({ message: "No such user exists" });
    const recoveryCode = makeid(10).toUpperCase();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ID, // generated ethereal user
        pass: process.env.PW, // generated ethereal password
      },
    });
    await transporter.sendMail({
      from: '"dawum nam" <dawumnam@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "password recovery", // subject line
      text: recoveryCode, // plain text body
      html: `<b>${recoveryCode}</b>`, // html body
    });
    await Auth.findOneAndUpdate(
      { email },
      { passwordRecovery: recoveryCode },
      { useFindAndModify: false }
    );

    return res
      .status(200)
      .json({ message: "successfully sent code via email", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "unsuccessful", success: false });
  }
};

export const changePassword = async (req, res) => {
  try {
    const body = req.body;
    const { recoveryCode, email, newPassword } = body;
    console.log(req.body);
    if (!recoveryCode || !email || !newPassword)
      return res
        .status(400)
        .json({ message: "Missing code or email", success: false });
    const { passwordRecovery } = await Auth.findOne(
      { email },
      { useFindAndModify: false }
    );
    console.log(passwordRecovery);
    if (recoveryCode !== passwordRecovery)
      return res
        .status(400)
        .json({ message: "Invalid recovery code", success: false });
    const encryptedNewPassword = bcrypt.hashSync(String(newPassword), 12);

    await Auth.findOneAndUpdate(
      { email },
      { password: encryptedNewPassword, passwordRecovery: "" }
    );
    return res.json({
      message: "Password successfully changed",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ mesage: "Failed to change password", success: false });
  }
};

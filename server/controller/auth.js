import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Auth from "../model/auth.js";

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

export const signout = async (req, res) => {
  try {
    const cookie = req.headers.cookie.split("=")[1];
    const result = jwt.verify(cookie, process.env.PHRASE);
    if (!result?.id)
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

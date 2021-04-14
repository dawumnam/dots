import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/task.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import { createMailTransporter } from "./utils/mail.js";
import { createTestAccount } from "nodemailer";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/task", taskRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server started at Port:${PORT}`))
  )
  .catch((error) => console.log(error));

//createMailTransporter();

//client send password recovery request with email data and redirect user to enter the recovery key
//server receives email and checks if such account exists. if it does send email with randomly generated recovery key
// user checks email and enters the key
//client receives the recovery key and send to the server
// server verifies the key and send ok request and sends token
// client gets new password from user and sends it to the server
// server changes the password and removes token.
// client redirects user to main page

//get tasks filtered by id

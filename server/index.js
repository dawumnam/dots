import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/task.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/task", taskRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server started at Port:${PORT}`))
  )
  .catch((error) => console.log(error));

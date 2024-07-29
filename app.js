import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDb from "./db.js";

const PORT = process.env.PORT || 8000;

import UserRouter from "./routes/UserRouter.js";
import TaskRouter from "./routes/TaskRoutes.js";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API is working..." });
});

app.use("/api/users", UserRouter);
app.use("/api/tasks", TaskRouter);

connectDb()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((error) => console.error(error));


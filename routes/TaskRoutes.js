import express from "express";
import { FetchTaskById, FetchTasks } from "../controllers/Tasks/FetchTask.js";
import DeleteTask from "../controllers/Tasks/DeleteTask.js";
import CreateTask from "../controllers/Tasks/CreateTask.js";
import EditTask from "../controllers/Tasks/EditTask.js";
import authMiddleware from "../authMiddleware.js";

const TaskRouter = express.Router();

TaskRouter.get("/", authMiddleware, FetchTasks);
TaskRouter.get("/:taskId", authMiddleware, FetchTaskById);
TaskRouter.delete("/:taskId", authMiddleware, DeleteTask);
TaskRouter.post("/", authMiddleware, CreateTask);
TaskRouter.put("/:taskId", authMiddleware, EditTask);

export default TaskRouter;

import Task from "../../models/Task.js";
import User from "../../models/User.js";

const FetchTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    res.status(200).json({ task, success: true });
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const FetchTasks = async (req, res) => {
  try {
    console.log(req.user,"User");
    const userId = req.user._id;
    const user = await User.findById(userId).populate("tasks");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({ tasks: user.tasks, success: true });
  } catch (error) {
    console.error("Error fetching tasks for user:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export { FetchTaskById, FetchTasks };

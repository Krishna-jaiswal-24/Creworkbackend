import Task from "../../models/Task.js";
import User from "../../models/User.js";

const CreateTask = async (req, res) => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const userId = req.user._id;

    if (!title || !status || !userId) {
      return res.status(400).json({
        message: "Title, status, and userId are required",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: userId,
    });

    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
      success: true,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export default CreateTask;

import Task from "../../models/Task.js";

const EditTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, deadline } = req.body;

    if (!taskId) {
      return res.status(400).json({
        message: "Task ID is required",
        success: false,
      });
    }

    // Check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    // Update task details
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (deadline) task.deadline = deadline;

    // Save the updated task
    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
      success: true,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export default EditTask;

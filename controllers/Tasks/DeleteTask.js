import Task from "../../models/Task.js";

const DeleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    await Task.deleteOne({ _id: taskId });

    res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export default DeleteTask;

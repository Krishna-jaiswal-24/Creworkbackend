import mongoose, { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Under Review", "Finished"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["None", "Low", "Medium", "High"],
      default: "None",
    },

    deadline: {
      type: Date,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = model("Task", TaskSchema);
export default Task;

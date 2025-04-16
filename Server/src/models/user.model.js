import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userTaskSchema = new mongoose.Schema({
  user_id: { type: String, default: () => uuidv4(), unique: true },
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  passwordAuthetication: { type: Boolean, default: false },
  tasks: [
    {
      task_id: { type: String, default: () => uuidv4(), unique: true },
      todo: { type: String, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("User", userTaskSchema);
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  task: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);

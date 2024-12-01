const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};

exports.createTask = async (req, res) => {
  const { task } = req.body;
  try {
    const newTask = new Task({ userId: req.user.id, task });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, isComplete } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { task, isComplete }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err });
  }
};

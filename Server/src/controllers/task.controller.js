import User from "../models/user.model.js";

export const getTasks = async (req, res) => {
  try {
    const { user_id } = req.query;
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user.tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { user_id, todo } = req.body;

    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.tasks.push({ todo });
    await user.save();

    res.json({ message: "Task created successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { user_id, todo, isCompleted } = req.body;

    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const task = user.tasks.find((task) => task.task_id === task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (todo !== undefined) task.todo = todo;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    await user.save();
    res.status(200).json({ message: "Task updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { user_id } = req.body;

    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.tasks = user.tasks.filter((task) => task.task_id !== task_id);
    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
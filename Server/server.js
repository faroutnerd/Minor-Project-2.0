const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const taskSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  dueDate: { type: Date, default: null }, // Date format
});


const Task = mongoose.model("Task", taskSchema);

// API Routes

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new task
app.post("/tasks", async (req, res) => {
  try {
    const { todo, isCompleted, dueDate } = req.body;
    const newTask = new Task({
      todo,
      isCompleted,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a task (edit or toggle completion)
app.put("/tasks/:id", async (req, res) => {
  try {
    const { todo, isCompleted, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        todo,
        isCompleted,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

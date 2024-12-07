const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/todo_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const taskSchema = new mongoose.Schema({
  task_id: { type: String, default: () => uuidv4(), unique: true },
  user_id : {type: String, require: true },
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

// User Schema
const userSchema = new mongoose.Schema({
  user_id: {type: String, default: () => uuidv4(), unique: true },
  name: {type: String, require: true},
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
});

const Users = mongoose.model("User", userSchema);
const Tasks = mongoose.model("Task", taskSchema);


// User Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, securityQuestion, securityAnswer } = req.body;
    
    const existingUser = await Users.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    
    const newUser = new Users({
      name,
      phone,
      password,
      securityQuestion,
      securityAnswer
    });
    console.log(req.body);
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await Users.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ userId: user.user_id, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// User Authentication
app.post("/authenticate-user", async (req, res) => {
  try {
    const { phone, securityQuestion, securityAnswer } = req.body;

    const user = await Users.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (
      user.securityQuestion !== securityQuestion ||
      user.securityAnswer !== securityAnswer
    ) {
      return res.status(400).json({ message: "Security question or answer is incorrect" });
    }

    // user.password = newPassword;
    // await user.save();

    res.status(200).json({ message: "You can change your password" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// changing password

// yahan dikkat
app.post("/change-password", async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    const user = await Users.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.updateOne();

    res.status(200).json({ message: "Password changed successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// Getting all the tasks
app.get("/tasks/", async (req, res) => {
  try {
    const user = await Tasks.find(req.query);
    // if (!user) {
    //   res.json(user);
    //   // return res.status(404).json({ message: "User not found" });
    // }
    res.json({user});
    console.log("Hello");
    // res.json(user.tasks);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add task
app.post("/tasks", async (req, res) => {
  try {
    const { todo, user_id } = req.body;
    // const user = await Tasks.find(req.body);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // const newTask = { todo, isCompleted: false }; // Create a plain task object
    // user.tasks.push(newTask); // Add the task to the user's task list

    // const newTask = new Task({ todo });
    // user.tasks.push(newTask);
    const newUser = new Tasks ({
      todo,
      user_id
    });
    
    await newUser.save();

    // res.json(newTask);
    res.json({message: "Task created successfully."});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task
app.put("/tasks/:user_id", async (req, res) => {
  try {
    const { todo, isCompleted } = req.body;
    const user = await Users.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = user.tasks.id(req.params.task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.todo = todo;
    task.isCompleted = isCompleted;
    await user.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
app.delete("/tasks/:user_id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = user.tasks.id(req.params.task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.remove();
    await user.save();

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

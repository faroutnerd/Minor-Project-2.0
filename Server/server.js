const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/todo_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Task schema
const taskSchema = new mongoose.Schema({
  task_id: { type: String, default: () => uuidv4(), unique: true },
  user_id: { type: String, require: true },
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

// User schema
const userSchema = new mongoose.Schema({
  user_id: { type: String, default: () => uuidv4(), unique: true },
  name: { type: String, require: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  passwordAuthetication: { type: Boolean, default: false },
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

    const hashedPassword = await bcrypt.hash(password, 10); // SaltRound = 10 
    const hashedSecurityQuestion = await bcrypt.hash(securityQuestion, 10);
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

    const newUser = new Users({
      name,
      phone,
      password: hashedPassword,
      securityQuestion: hashedSecurityQuestion,
      securityAnswer: hashedSecurityAnswer,
    });

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

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    res.status(200).json({ userId: user.user_id, userName: user.name, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Authenticate User
app.post("/authuser", async (req, res) => {
  try {
    const { phone, securityQuestion, securityAnswer } = req.body;

    const user = await Users.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isQuestionValid = await bcrypt.compare(securityQuestion, user.securityQuestion);
    const isAnswerValid = await bcrypt.compare(securityAnswer, user.securityAnswer);

    if (!isQuestionValid || !isAnswerValid) {
      return res.status(400).json({ message: "Incorrect security question or answer." });
    }

    user.passwordAuthetication = true;
    await user.save();

    res.status(200).json({
      message: "Authentication successful",
      user_id: user.user_id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// Change Password
app.post("/change-password", async (req, res) => {
  try {
    const { phone, newPassword, confirmPassword } = req.body;

    if (!phone || !newPassword) {
      return res.status(400).json({ message: "Phone number and new password are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Your passwords should match." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const user = await Users.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.passwordAuthetication) {
      return res.status(400).json({
        message: "You need to authenticate before changing the password.",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    user.passwordAuthetication = false;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("Error in change-password:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Load Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find(req.query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Task
app.post("/tasks", async (req, res) => {
  try {
    const { todo, user_id } = req.body;
    const newTask = new Tasks({
      todo,
      user_id,
    });

    await newTask.save();
    res.json({ message: "Task created successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit Task
app.put("/tasks/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const updatedTask = req.body;

    const task = await Tasks.findOneAndUpdate({ task_id }, updatedTask, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Task
app.delete("/tasks/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const task = await Tasks.findOneAndDelete({ task_id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

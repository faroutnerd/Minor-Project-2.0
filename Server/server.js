// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/todo-app", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// // Task Schema
// const taskSchema = new mongoose.Schema({
//   todo: { type: String, required: true },
//   isCompleted: { type: Boolean, default: false },
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   phone: { type: String, unique: true, required: true },
//   password: { type: String, required: true }, // Plain password
//   securityQuestion: { type: String, required: true },
//   securityAnswer: { type: String, required: true },
//   tasks: [taskSchema], // Each user has their own set of tasks
// });

// // Models
// const Task = mongoose.model("Task", taskSchema);
// const User = mongoose.model("User", userSchema);

// // API Routes

// // User Signup
// app.post("/signup", async (req, res) => {
//   try {
//     const { phone, password, securityQuestion, securityAnswer } = req.body;

//     // Check if phone number is unique
//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(400).json({ message: "Phone number already exists" });
//     }

//     // Create new user
//     const newUser = new User({
//       phone,
//       password, // Save plain password
//       securityQuestion,
//       securityAnswer,
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User signed up successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // User Login
// app.post("/login", async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     // Find user
//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare passwords
//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({ userId: user._id, message: "Login successful" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Change Password
// app.post("/change-password", async (req, res) => {
//   try {
//     const { phone, securityQuestion, securityAnswer, newPassword } = req.body;

//     // Find user
//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Validate security question and answer
//     if (
//       user.securityQuestion !== securityQuestion ||
//       user.securityAnswer !== securityAnswer
//     ) {
//       return res.status(400).json({ message: "Security question or answer is incorrect" });
//     }

//     // Update password
//     user.password = newPassword; // Save new plain password
//     await user.save();

//     res.status(200).json({ message: "Password changed successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get all tasks for a user
// app.get("/tasks/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user.tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a task for a user
// app.post("/tasks/:userId", async (req, res) => {
//   try {
//     const { todo } = req.body;
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const newTask = new Task({ todo });
//     user.tasks.push(newTask);
//     await user.save();

//     res.json(newTask);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update a task for a user
// app.put("/tasks/:userId/:taskId", async (req, res) => {
//   try {
//     const { todo, isCompleted } = req.body;
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const task = user.tasks.id(req.params.taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     task.todo = todo;
//     task.isCompleted = isCompleted;
//     await user.save();

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete a task for a user
// app.delete("/tasks/:userId/:taskId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const task = user.tasks.id(req.params.taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     task.remove();
//     await user.save();

//     res.sendStatus(204);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



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
  .connect("mongodb://127.0.0.1:27017/Task-Manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const taskSchema = new mongoose.Schema({
  task_id: { type: String, default: () => uuidv4(), unique: true },
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

// User Schema
const userSchema = new mongoose.Schema({
  user_id: {type: String, default: () => uuidv4(), unique: true },
  name: {type: String, require: true},
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  tasks: [taskSchema], 
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// User Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, securityQuestion, securityAnswer, tasks } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const newUser = new User({
      name,
      phone,
      password,
      securityQuestion,
      securityAnswer
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

    const user = await User.findOne({ phone });
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
    const { phone, securityQuestion, securityAnswer, newPassword } = req.body;

    const user = await User.findOne({ phone });
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

// chnaging password
app.post("/change-password", async (req, res) => {
  try {
    const { phone, password, newPassword } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// Getting all the tasks
app.get("/tasks/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add task
app.post("/tasks/:user_id", async (req, res) => {
  try {
    const { todo } = req.body;
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = { todo, isCompleted: false }; // Create a plain task object
    user.tasks.push(newTask); // Add the task to the user's task list

    // const newTask = new Task({ todo });
    // user.tasks.push(newTask);
    await user.save();

    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task
app.put("/tasks/:user_id/:task_id", async (req, res) => {
  try {
    const { todo, isCompleted } = req.body;
    const user = await User.findById(req.params.user_id);
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
app.delete("/tasks/:user_id/:task_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
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

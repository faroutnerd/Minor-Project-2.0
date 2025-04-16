import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import authRoutes from "./src/routes/auth.route.js";
import taskRoutes from "./src/routes/task.route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
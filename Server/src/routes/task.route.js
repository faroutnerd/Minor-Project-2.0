import express from "express";
import { getTasks, addTask, editTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:task_id", editTask);
router.delete("/:task_id", deleteTask);

export default router;
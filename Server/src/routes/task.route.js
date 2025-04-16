import express from "express";
import { getTasks, addTask, editTask, deleteTask } from "../controllers/taskController.js";
import router from "express.Router";


router.get("/", getTasks);
router.post("/", addTask);
router.put("/:task_id", editTask);
router.delete("/:task_id", deleteTask);

module.exports = router;

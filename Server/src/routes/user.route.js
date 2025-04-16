import express from "express";
import { signup, login } from "../controllers/userController.js";
import router from "express.Router";

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

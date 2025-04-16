import express from "express";
import { signup, login, authUser, changePassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/authuser", authUser);
router.post("/change-password", changePassword);

export default router;
import express from "express";
import { authenticate, changePassword } from "../controllers/authController.js";
import router from "express.Router";

router.post("/authuser", authenticate);
router.post("/change-password", changePassword);

module.exports = router;

const express = require("express");
// why we imported express here only not in other files?
// cause router is a part of express
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

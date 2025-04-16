import User from "../models/user.model.js";

exports.signup = async (req, res) => {
  try {
    const { name, phone, password, securityQuestion, securityAnswer } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: "Phone number already exists" });

    const newUser = new User({ name, phone, password, securityQuestion, securityAnswer });
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (password !== user.password) return res.status(400).json({ message: "Incorrect Password" });

    res.status(200).json({ userId: user.user_id, userName: user.name, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

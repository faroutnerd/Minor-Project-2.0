import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, phone, password, securityQuestion, securityAnswer } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const newUser = new User({
      name,
      phone,
      password,
      securityQuestion,
      securityAnswer,
    });

    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    res.status(200).json({ userId: user.user_id, userName: user.name, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const authUser = async (req, res) => {
  try {
    const { phone, securityQuestion, securityAnswer } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (securityQuestion !== user.securityQuestion || securityAnswer !== user.securityAnswer) {
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
};

export const changePassword = async (req, res) => {
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

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.passwordAuthetication) {
      return res.status(400).json({
        message: "You need to authenticate before changing the password.",
      });
    }

    user.password = newPassword;
    user.passwordAuthetication = false;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("Error in change-password:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
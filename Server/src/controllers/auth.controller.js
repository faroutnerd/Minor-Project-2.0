import User from "../models/user.model.js";

exports.authenticate = async (req, res) => {
  try {
    const { phone, securityQuestion, securityAnswer } = req.body;
    const user = await User.findOne({ phone });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (securityQuestion !== user.securityQuestion || securityAnswer !== user.securityAnswer) {
      return res.status(400).json({ message: "Incorrect security question or answer." });
    }

    user.passwordAuthetication = true;
    await user.save();

    res.status(200).json({ message: "Authentication successful", user_id: user.user_id });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { phone, newPassword, confirmPassword } = req.body;
    if (!phone || !newPassword) return res.status(400).json({ message: "Phone and new password required" });
    if (newPassword !== confirmPassword) return res.status(400).json({ message: "Passwords must match" });
    if (newPassword.length < 6) return res.status(400).json({ message: "Password too short" });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.passwordAuthetication) return res.status(400).json({ message: "Authenticate first" });

    user.password = newPassword;
    user.passwordAuthetication = false;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

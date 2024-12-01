import React, { useState, useContext } from "react";
import { changePassword } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const ChangePassword = () => {
  const { auth } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(auth.token, password);
      setMessage("Password changed successfully!");
    } catch (err) {
      setMessage(err.response.data.message || "Failed to change password.");
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;

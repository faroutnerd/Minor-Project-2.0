import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        phone,
        password,
      });
      const user_id = response.data.userId;
      const userName = response.data.UserName;
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("userName", userName);
      console.log(userName)
      navigate(`/task`);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/authuser")}
          className="w-full text-blue-600 mt-4 text-sm hover:underline"
        >
          Forgot Password?
        </button>

        <div className="flex items-center justify-center my-6">
          <span className="border-t w-1/4 border-gray-300"></span>
          <span className="text-gray-500 mx-2">or</span>
          <span className="border-t w-1/4 border-gray-300"></span>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm mb-4">
            Don’t have an account?{" "}
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

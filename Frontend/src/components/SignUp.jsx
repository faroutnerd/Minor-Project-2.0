import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInput = () => {
    const { name, phone, password, confirmPassword, securityAnswer } = formData;

    if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
      return "Name must be at least 3 characters long and contain only letters.";
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return "Invalid Phone number";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match. Please try again.";
    }

    if (securityAnswer.length < 3) {
      return "Security answer must be at least 3 characters long.";
    }

    return;
  };

  const handleSignUp = async () => {
    const error = validateInput();
    if (error) {
      setError(error);
      return;
    }
console.log(formData);
    try {
      await axios.post("http://localhost:5000/signup", formData);
      navigate("/login");
    } catch (err) {
      setError("Error signing up. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <select
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select a Security Question</option>
            <option value="What is the name of your first school?">
              What is the name of your first school?
            </option>
            <option value="What is your pet's name?">
              What is your pet's name?
            </option>
            <option value="What is your date of birth?">
              Which country do you want to visit?
            </option>
          </select>
          <input
            type="text"
            name="securityAnswer"
            placeholder="Security Answer"
            value={formData.securityAnswer}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
      <div className="mb-6">
       <Logo />
      </div>

      <p className="text-center text-lg max-w-md mb-8">
        Simplify your life with our app. Manage your tasks, stay organized, and
        never miss a deadline. Taskly is here to help you achieve your goals.
      </p>
      <div className="space-y-4 px-4 mx-4">
        <button
          onClick={() => navigate("/signup")}
          className="w-48 bg-white text-blue-600 py-3 rounded-lg font-medium shadow-md hover:bg-gray-100 transition duration-300"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-48 bg-blue-700 border border-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-800 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;

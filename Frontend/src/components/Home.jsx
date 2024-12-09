import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8">
      <div className="w-full flex items-center justify-between max-w-4xl mx-auto">
        <Logo />
        <nav className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-indigo-600 py-2 px-6 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-700 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:bg-indigo-800 transition duration-300"
          >
            Sign Up
          </button>
        </nav>
      </div>

      <div className="flex flex-col items-center text-center max-w-2xl mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Organize Your Life, Effortlessly
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Manage your tasks, stay organized, and achieve your goals with Taskly.
          Your productivity companion.
        </p>
      </div>

      <div className="text-sm mt-16">
        &copy; 2024 TaskManager. All rights reserved.
      </div>
    </div>
  );
};

export default Home;

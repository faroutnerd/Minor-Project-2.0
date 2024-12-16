import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50">
      <div className="w-full bg-white shadow fixed top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
          <Logo />
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center text-center max-w-3xl mt-24 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Organize Your Life, Effortlessly
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-700">
          Manage your tasks, stay organized, and achieve your goals with Taskly.
          Your productivity companion.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
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
        </div>
      </div>

      <Footer />
     
    </div>
  );
};

export default Home;

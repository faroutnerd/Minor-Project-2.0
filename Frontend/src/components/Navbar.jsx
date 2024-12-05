import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const time = now.toLocaleTimeString();
      setCurrentDateTime(`${month} ${day}, ${year} | ${time}`);
    };

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav
      style={{ backgroundColor: "#0C356A" }}
      className="flex justify-between items-center p-4 text-white shadow-lg"
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <Logo />
        <span className="ml-4 text-lg font-semibold">My Application</span>
      </div>

      {/* Current Date and Time */}
      <div className="text-sm">{currentDateTime}</div>

      {/* Login Button */}
      <div>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md shadow-lg transition duration-300"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

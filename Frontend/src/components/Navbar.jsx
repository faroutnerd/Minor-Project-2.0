


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiClock } from "react-icons/fi"; 
import { MdAccountCircle } from "react-icons/md"; 
import Logo from "./Logo";

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [userName, setUserName] = useState("");


  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    
    if (storedUserName) {
      // setUserName(storedUserName);
      const firstName = storedUserName.split(" ")[0];
      setUserName(firstName);
    }

    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDateTime(now.toLocaleString("en-US", options));
    };

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-lg bg-white text-gray-800 border-b">
      <div className="flex items-center space-x-4">
        <Logo />
        {userName && (
          <div className="flex items-center space-x-2 text-lg font-medium">
            <span>Welcome, {userName}</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <FiClock size={18} className="text-blue-600" />
        <span>{currentDateTime}</span>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

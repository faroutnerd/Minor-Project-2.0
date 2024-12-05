import { useState, useEffect } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];;
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const time = now.toLocaleTimeString();
      setCurrentDateTime(`${month} ${day} ${year} ${time}`);
    };

    // Update time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav
      style={{ backgroundColor: "#0C356A" }}
      className="text-white p-4 text-center"
    >
      <Logo />
      <div className="mt-2 text-sm">{currentDateTime}</div>
    </nav>
  );
};

export default Navbar;
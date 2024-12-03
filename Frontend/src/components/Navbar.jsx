import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={{ backgroundColor: "#0C356A" }} className="text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="/">
            <div className="logo font-bold text-2xl">
              <span style={{ color: "#40F8FF" }}>&lt;</span>
              Todo
              <span style={{ color: "#40F8FF" }}>List/&gt;</span>
            </div>
          </a>
        </div>

        {/* For bigger screen */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="">
            Data-1
          </a>
          <a href="/" className="">
            Data-2
          </a>
          <a href="/" className="">
            Data-3
          </a>
        </div>

        {/* Hamburger menu for mobile */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="w-6 h-6"
          />
          
        </button>
      </div>

      {/* For small screens */}
      {isOpen && (
        <div style={{backgroundColor: '#279EFF'}} className="md:hidden">
          <a href="/" className="block px-4 py-2">
            Data-1
          </a>
          <a href="/" className="block px-4 py-2">
            Data-2
          </a>
          <a href="/" className="block px-4 py-2">
            Data-3
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
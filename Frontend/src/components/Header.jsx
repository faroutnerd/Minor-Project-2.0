import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        {auth.token ? (
          <>
            <Link to="/tasks">Tasks</Link>
            <Link to="/change-password">Change Password</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

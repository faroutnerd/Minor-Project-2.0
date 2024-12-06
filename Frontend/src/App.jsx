import React from "react";
import TodoList from "./components/TodoList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import UserAuthentication from "./components/UserAuthentication";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:user_id" element={<TodoList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword/user_id" element={<ChangePassword />} />
        <Route path="/authuser" element={<UserAuthentication />} />
      </Routes>
    </Router>
  );
}

export default App;

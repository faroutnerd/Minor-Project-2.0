import React from "react";
import TodoList from "./components/TodoList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import UserAuthentication from "./components/UserAuthentication";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<TodoList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/authuser" element={<UserAuthentication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
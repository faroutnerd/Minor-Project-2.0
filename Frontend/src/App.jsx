// import React from "react";
// import TodoList from "./components/TodoList";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import ChangePassword from "./components/ChangePassword";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<TodoList />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/changepassword" element={<ChangePassword />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword"
import Signup from "./components/SignUp"

const App = () => {
  const [userId, setUserId] = useState(null);

  // Private Route for authenticated pages
  const PrivateRoute = ({ children }) => {
    return userId ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        {/* Private Route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home userId={userId} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

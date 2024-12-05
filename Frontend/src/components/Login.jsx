// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setUserId }) => {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // const handleLogin = async () => {
//   //   try {
//   //     // Call backend login API
//   //     const response = await axios.post("http://localhost:5000/login", {
//   //       phone,
//   //       password,
//   //     });

//   //     // On success, store userId and navigate to the home page
//   //     setUserId(response.data.userId); // Save userId
//   //     setError(""); // Clear any previous errors
//   //     navigate("/"); // Navigate to home page
//   //   } catch (err) {
//   //     // Handle errors
//   //     const errorMessage =
//   //       err.response && err.response.data && err.response.data.message
//   //         ? err.response.data.message
//   //         : "Invalid credentials";
//   //     setError(errorMessage); // Show error message from backend or default
//   //   }
//   // };

//   const handleLogin = async () => {
//     try {
//       const { data } = await axios.post("http://localhost:5000/login", {
//         phone,
//         password,
//       });
//       setUserId(data.userId); // Save userId
//       setError(""); // Clear any errors
//       navigate("/"); // Navigate to home page
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid credentials");
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Login
//         </h2>
//         {error && (
//           <p className="text-red-600 text-sm text-center mb-4">{error}</p>
//         )}
//         <div className="space-y-4">
//           {/* Phone Input */}
//           <input
//             type="text"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           />
//           {/* Password Input */}
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           />
//         </div>
//         {/* Login Button */}
//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition duration-300"
//         >
//           Login
//         </button>
//         {/* Forgot Password Button */}
//         <button
//           onClick={() => navigate("/changepassword")}
//           className="w-full text-blue-600 mt-4 text-sm hover:underline"
//         >
//           Forgot Password?
//         </button>
//         {/* Divider */}
//         <div className="flex items-center justify-center my-4">
//           <span className="border-t w-1/3 border-gray-300"></span>
//           <span className="text-sm text-gray-500 mx-2">or</span>
//           <span className="border-t w-1/3 border-gray-300"></span>
//         </div>
//         {/* Sign Up Section */}
//         <div className="text-center">
//           <p className="text-gray-600 text-sm mb-2">
//             Don't have an account?{" "}
//           </p>
//           <button
//             onClick={() => navigate("/signup")}
//             className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserId }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle the login process
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        phone,
        password,
      });

      // On successful login, store the userId
      setUserId(response.data.userId); // Save userId
      setError(""); // Clear previous errors

      // Redirect to the user's task page using the userId
      navigate(`/tasks/${response.data.userId}`); // Redirect to task page
    } catch (err) {
      // Show the error message if the login fails
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <div className="space-y-4">
          {/* Phone Number Input */}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        {/* Forgot Password Button */}
        <button
          onClick={() => navigate("/changepassword")}
          className="w-full text-blue-600 mt-4 text-sm hover:underline"
        >
          Forgot Password?
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="border-t w-1/3 border-gray-300"></span>
          <span className="text-sm text-gray-500 mx-2">or</span>
          <span className="border-t w-1/3 border-gray-300"></span>
        </div>

        {/* Sign Up Section */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">
            Don't have an account?{" "}
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

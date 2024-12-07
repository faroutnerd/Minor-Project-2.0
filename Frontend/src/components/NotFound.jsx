import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
    <p className="text-gray-700 mt-4">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
    >
      Go Back Home
    </Link>
  </div>
);

export default NotFound;

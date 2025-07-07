import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md text-white px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors"
      >
        EventSphere
      </Link>

      <div className="space-x-4 flex items-center">
        {!user && (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-yellow-300 transition-colors font-medium"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to="/dashboard"
              className="hover:text-yellow-300 transition-colors font-medium"
            >
              Dashboard
            </Link>

            {user.role === "organizer" && (
              <Link
                to="/create"
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded text-white font-medium transition-colors"
              >
                + Create Event
              </Link>
            )}

            <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
               {user.name}
            </span>

            <button
               onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded font-medium transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

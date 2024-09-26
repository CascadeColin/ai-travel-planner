import { useState } from "react";
import { NavLink } from "react-router-dom";
import React from "react";

export default function Nav() {
  const [activeButton, setActiveButton] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <NavLink to="/">
          <div className="text-white text-2xl font-bold">Travel Planner</div>
        </NavLink>

        {/* Conditional Rendering for Auth Buttons */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <a href="/profile" className="text-gray-300 hover:text-white">
                My Trips
              </a>
              <button
                onClick={() => {
                  handleButtonClick("logout");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button
                  onClick={() => {
                    handleButtonClick("login");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button
                  onClick={() => {
                    handleButtonClick("signup");
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

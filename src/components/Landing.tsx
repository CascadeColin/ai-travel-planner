import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

type Props = {
  // TODO: have these link to their respective pages
  onLogin: () => void;
  onSignup: () => void;
};

export default function Landing () {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Welcome back to Travel Planner
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please log in to continue.
        </p>
        <div className="flex flex-col space-y-4">
          <NavLink to="/login">
            <button
              onClick={() => {
                handleButtonClick("login");
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </NavLink>

          {/* <NavLink to="/signup">
            <button
              onClick={() => {
                handleButtonClick("signup");
              }}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Sign Up
            </button>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  // TODO: conditionally render "View My Trips" and "Logout", hide "Login" and "Signup" when user is authenticated
  return (
    <>
      <div className="navbar bg-neutral space-x-2.5 border-b border-black text-neutral-content">
        <NavLink to="/login">
          <button
            className={`btn btn-ghost text-xl ${
              activeButton == "home" ? "btn-active" : ""
            }`}
            onClick={() => {
              handleButtonClick("login");
            }}
          >
            Login
          </button>
        </NavLink>

        <NavLink to="/signup">
          <button
            className={`btn btn-ghost text-xl ${
              activeButton === "filmGallery" ? "btn-active" : ""
            }`}
            onClick={() => {
              handleButtonClick("signup");
            }}
          >
            Signup
          </button>
        </NavLink>
      </div>
    </>
  );
}

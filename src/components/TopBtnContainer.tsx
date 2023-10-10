import React from "react";
import { useTheme } from "../context/isDarkModeContext";
import "../index.css";
import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";
import { useAuthContext } from "../context/AuthContext";

function TopBtnContainer() {
  const { theme, toggleDarkMode } = useTheme();
  const { user, isInitializing, onAuthStateChange } = useAuthContext();

  const icon =
    theme === "light" ? (
      <FiSun size={32} />
    ) : (
      <BsMoonStars size={32} color="white" />
    );

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    onAuthStateChange("logout");
  };

  return (
    <div className="absolute right-3 top-1 z-10 flex items-center">
      {!user && !isInitializing ? (
        ""
      ) : (
        <button
          onClick={handleLogout}
          className="mr-3 bg-blue-400 text-white text-uppercase border-none rounded-md p-2 w-auto my-4 text-sm font-thin letter-spacing-2 hover:bg-blue-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80 cursor-pointer"
        >
          Logout
        </button>
      )}
      <button onClick={toggleDarkMode}>{icon}</button>
    </div>
  );
}

export default TopBtnContainer;

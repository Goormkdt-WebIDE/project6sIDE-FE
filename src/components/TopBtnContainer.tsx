import React from "react";
import { useTheme } from "../context/isDarkModeContext";
import "../index.css";
import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";
import { useAuthContext } from "../context/AuthContext";

type Props = {
  className?: string;
};

function TopBtnContainer({ className }: Props) {
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
    <div
      className={`absolute w-fit right-3 -top-2  z-10 flex items-center md:top-2 ${className}`}
    >
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

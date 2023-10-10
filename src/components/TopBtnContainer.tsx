import React from 'react';
import { useTheme } from '../context/isDarkModeContext';
import '../index.css';
import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";

function TopBtnContainer() {
    const { theme, toggleDarkMode } = useTheme();

    const icon = theme === 'light' ? <FiSun size={32} /> : <BsMoonStars size={32} color="white"/>;

    return (
        <div>
            <button 
                className="absolute right-3 top-3 z-10"
                onClick={toggleDarkMode}
            >
                {icon}
            </button>
        </div>
    );
}

export default TopBtnContainer;
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: Props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const theme = isDarkMode ? 'dark' : 'light';

    return (
        <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

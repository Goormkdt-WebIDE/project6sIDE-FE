import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
    theme: string;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

export const ThemeProvider = ({ children }: { children: any }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark");
    };

    const theme = isDarkMode ? "dark" : "light";

    return (
        <ThemeContext.Provider
            value={{ theme, toggleDarkMode } as ThemeContextType}
        >
            {children}
        </ThemeContext.Provider>
    );
};

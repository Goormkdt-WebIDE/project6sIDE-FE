import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleDarkMode: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};

type Props = {
  children: React.ReactElement;
};

export const ThemeProvider = ({ children }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  const theme = isDarkMode ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext({ mode: false, setMode: () => {} });

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(false);
  const value = { mode, setMode };
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setMode(true);
    }
  }, []);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider, useTheme };

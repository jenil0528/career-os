"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "cyber" | "executive";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cyber");

  useEffect(() => {
    // Load theme from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("careeros_theme");
      if (stored === "executive" || stored === "cyber") {
        setThemeState(stored);
        applyThemeClass(stored);
      } else {
        // Default to cyber
        applyThemeClass("cyber");
      }
    }
  }, []);

  const applyThemeClass = (newTheme: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("theme-cyber", "theme-executive", "dark", "light");
      
      if (newTheme === "cyber") {
        root.classList.add("theme-cyber", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.add("theme-executive", "light");
        root.style.colorScheme = "light";
      }
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("careeros_theme", newTheme);
    applyThemeClass(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "cyber" ? "executive" : "cyber";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

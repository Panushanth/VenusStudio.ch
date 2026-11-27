import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('venus-color-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch { /* Storage can be unavailable in private browsers. */ }
  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'dark' ? '#171817' : '#faf8f5');
    try { localStorage.setItem('venus-color-theme', theme); } catch { /* optional */ }
  }, [theme]);
  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

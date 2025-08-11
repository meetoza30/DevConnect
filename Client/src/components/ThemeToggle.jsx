import React, { useEffect, useState } from 'react';
import '../styles/ToggleStyles.css';

const THEME_KEY = 'theme';

const ThemeToggle = () => {
  const getInitialDark = () =>
    typeof window !== 'undefined'
      ? (localStorage.getItem(THEME_KEY) === 'dark') ||
        (!localStorage.getItem(THEME_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      : false;

  const [isDark, setIsDark] = useState(getInitialDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  return (
    <label>
      <input
        className="toggle-checkbox"
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(prev => !prev)}
        aria-label="Toggle dark mode"
      />
      <div className="toggle-slot">
        <div className="sun-icon-wrapper">
          <div className="iconify sun-icon" data-icon="feather-sun"></div>
        </div>
        <div className="toggle-button"></div>
        <div className="moon-icon-wrapper">
          <div className="iconify moon-icon" data-icon="feather-moon"></div>
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;

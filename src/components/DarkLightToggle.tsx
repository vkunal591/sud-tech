import { IoMoon, IoSunny } from "react-icons/io5";
import React, { useEffect, useState } from "react";

const DarkLightToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center justify-center"
    >
      {isDarkMode ? (
        <IoSunny className="text-2xl" />
      ) : (
        <IoMoon className="text-2xl" />
      )}
    </button>
  );
};

export default DarkLightToggle;

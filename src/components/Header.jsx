import React from "react";

export default function Header({name, isDark, toggleTheme}) {

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white" >
      <h1>{name}'s Portfolio</h1>
      <button
      type='button'
      onClick={toggleTheme}> 
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  )
}

 
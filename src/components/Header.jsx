import React,{useState} from "react";
import { NavLink, useNavigate } from 'react-router-dom';


export default function Header({name, isDark, toggleTheme,isAuth, setIsAuth}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const response = await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      
      if (response.ok) {
        setIsAuth(false);
        navigate("/");
      }
    }catch(err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white px-4 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-bold">{name}'s Portfolio</h1>

        <button
          type='button'
          onClick={toggleTheme}
          className="ml-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 
          transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
          dark:hover:bg-gray-700"
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <nav className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-gray-200
       bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800
       dark:text-gray-300">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 
          'text-gray-600 hover:text-blue-500'}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 
          'text-gray-600 hover:text-blue-500'}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 
          'text-gray-600 hover:text-blue-500'}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 
          'text-gray-600 hover:text-blue-500'}
        >
          Contact
        </NavLink>

        {isAuth ? (
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm 
            text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800
            dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => isActive ? 'ml-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700' : 
            'ml-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}
          >
             Admin
          </NavLink>
        )}
      </nav>
    </header>
  )
}

 
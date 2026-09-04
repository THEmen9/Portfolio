import React from "react";
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
    <header className="sticky top-0 z-50 border-b border-gray-200/70
    bg-[#E9D8E1]/70 text-black backdrop-blur-md
    dark:border-gray-800/70 dark:bg-gray-950/80 dark:text-white
    px-4 py-4">

    <div className="grid grid-cols-3 items-center">
        <h1 className="text-xl font-bold">{name}'s Portfolio</h1>

      <nav className="flex items-center gap-6 text-sm text-gray-600
       dark:text-gray-300">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'rounded-full bg-[#C197D2]/20 px-3 py-1.5 font-semibold text-[#8B5A9B] dark:bg-[#C197D2]/20 dark:text-[#C197D2]'
          : 'rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-500'}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? 'rounded-full bg-[#C197D2]/20 px-3 py-1.5 font-semibold text-[#8B5A9B] dark:bg-[#C197D2]/20 dark:text-[#C197D2]'
          : 'rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-500'}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? 'rounded-full bg-[#C197D2]/20 px-3 py-1.5 font-semibold text-[#8B5A9B] dark:bg-[#C197D2]/20 dark:text-[#C197D2]'
          : 'rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-500'}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? 'rounded-full bg-[#C197D2]/20 px-3 py-1.5 font-semibold text-[#8B5A9B] dark:bg-[#C197D2]/20 dark:text-[#C197D2]'
          : 'rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-500'}
        >
          Contact
        </NavLink>

       
      </nav>
      <div className = "flex shrink-0 text-sm items-center justify-end gap-2">
      {isAuth && (
          <NavLink
            to="/admin"
            className={({ isActive }) => isActive ? 'rounded-full bg-[#C197D2]/20 px-3 py-1.5 font-semibold text-[#8B5A9B] dark:bg-[#C197D2]/20 dark:text-[#C197D2]'
            : 'rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-500'}
          >
            Dashboard
          </NavLink>
          )}

          {isAuth ? (
            <button
              type="button"
              onClick={handleLogout}
              className='rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-500'
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? 'rounded-full bg-[#C197D2]/20 px-3 py-1.5 font-semibold text-[#8B5A9B] dark:bg-[#C197D2]/20 dark:text-[#C197D2]'
              : 'rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-500'}
            >
              Admin
            </NavLink>
          )}

          <button
          type='button'
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full border
          border-gray-300 bg-white text-sm transition hover:bg-gray-100
          dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        </div>  
      </div> 
    </header>
  )
}

 
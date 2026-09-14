import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import useScrollActive from "../hooks/useScrollActive";
import BottomNav from "./BottomNav";
import { API_URL } from "../config/api";



export default function Header({name, isDark, toggleTheme,isAuth, setIsAuth}) {
  const navigate = useNavigate();
  const isVisible = useScrollActive(2000);
  const inactiveLinkClass = "rounded-full px-3 py-1.5 bg-muted/40 border border-border backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300";
  const activeLinkClass = "rounded-full px-3 py-1.5 font-semibold bg-primary/20 text-primary";

  const handleLogout = async () => {
    try{
      const response = await fetch(`${API_URL}/api/admin/logout`, {
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
    <>
    <header className="sticky top-0 z-50 border-b bg-white/10 backdrop-blur-md border-border px-4 py-4">
     {/* Desktop layout*/}
    <div className=" hidden lg:grid lg:grid-cols-3 items-center">
        <h1 className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
          <span>Portfolio</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-foreground font-medium">{name}</span>
        </h1>

      <nav className="flex items-center gap-6 text-sm text-muted-foreground">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              Home
            </span>
        </NavLink>
        
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              About
          </span>
        </NavLink>
        
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              showcase
          </span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              Contact
          </span>
        </NavLink>
      </nav>

      <div className = "flex shrink-0 text-sm items-center justify-end gap-2 text-muted-foreground">
      {isAuth && (
          <NavLink
            to="/admin"
            className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
          >
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              dashboard
            </span>
          </NavLink>
          )}

          {isAuth ? (
            <button
              type="button"
              onClick={handleLogout}
              className='rounded-full px-3 py-1.5 bg-muted/40 border border-border backdrop-blur-md 
              hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300'
            >
              <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                logout
              </span>

            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
            >
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              admin
            </span>
            </NavLink>
          )}

          <button
            type='button'
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full 
            border border-white/20 bg-white/10 backdrop-blur-md 
            hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
          >
            {isDark ? "☀️" : "🌙"}
        </button>
        </div>  
      </div> 

      {/* Mobile layout*/}
      <div className="flex lg:hidden items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-foreground font-medium">{name}</span>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              Home
            </span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              About
          </span>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              showcase
          </span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        >
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              Contact
          </span>
        </NavLink>
        </nav>

        <button
            type='button'
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full 
            border border-white/20 bg-white/10 backdrop-blur-md 
            hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
          >
            {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
    <BottomNav isAuth={isAuth} handleLogout={handleLogout} isVisible={isVisible} />
    </>
  )
}

 
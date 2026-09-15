import React from "react";
import { NavLink } from "react-router-dom";
import { mobileInactivePill, mobileActivePill } from "../constants/navStyles";

export default function BottomNav({ isAuth, handleLogout, isVisible }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-white/10 backdrop-blur-md 
        border-border px-4 py-3 transition-transform duration-300
        ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      {isAuth ? (
        <div className="grid grid-cols-3 items-center text-muted-foreground">
          <NavLink to="/admin" className={({ isActive }) => `justify-self-start 
          ${isActive ? mobileActivePill : mobileInactivePill}`}>
            <span className="text-[10px] uppercase tracking-widest">dashboard</span>
          </NavLink>

          <span className="justify-self-center text-[10px] uppercase tracking-widest text-primary"
          >Portfolio
          </span>
          
          <button type="button" onClick={handleLogout} className={`justify-self-end ${mobileInactivePill}`}>
            <span className="text-[10px] uppercase tracking-widest">logout</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <NavLink to="/login" className={({ isActive }) => isActive ? mobileActivePill : mobileInactivePill}>
            <span className="text-[10px] uppercase tracking-widest">admin</span>
          </NavLink>
             <span className="text-[10px] uppercase tracking-widest text-primary">Portfolio</span>
        </div>
      )}
    </div>
  );
}
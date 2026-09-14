import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomNav({ isAuth, handleLogout, isVisible }) {
  const inactiveLinkClass = "rounded-full px-3 py-1.5 bg-muted/40 border border-border backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300";
  const activeLinkClass = "rounded-full px-3 py-1.5 font-semibold bg-primary/20 text-primary";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-white/10 backdrop-blur-md 
        border-border px-4 py-3 transition-transform duration-300
        ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      {isAuth ? (
        <div className="grid grid-cols-3 items-center">
          <NavLink to="/admin" className={({ isActive }) => `justify-self-start 
          ${isActive ? activeLinkClass : inactiveLinkClass}`}>
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              dashboard
            </span>
          </NavLink>

          <span className="justify-self-center text-[10px] uppercase tracking-widest text-muted-foreground"
          >Portfolio
          </span>
          
          <button type="button" onClick={handleLogout} className={`justify-self-end ${inactiveLinkClass}`}>
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                logout
            </span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <NavLink to="/login" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
              admin
            </span>
          </NavLink>
             <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portfolio</span>
        </div>
      )}
    </div>
  );
}
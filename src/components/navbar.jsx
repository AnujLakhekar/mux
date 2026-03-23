import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { usePublicstates } from "../providers/PublicstatesProvider";

const Navbar = () => {
  const { Navbar, setSidebar } = usePublicstates();

  const toggleSidebar = () => {
    setSidebar((prev) => ({ ...prev, mobileOpen: !prev.mobileOpen }));
  };

  return (
    <header
      className={
        Navbar.view === "default"
          ? "topbar"
          : Navbar.view === "hidden"
            ? "hidden"
            : "topbar"
      }
    >
      <div className="topbar-left">
        <button
          aria-label="Toggle sidebar"
          className="topbar-menu"
          onClick={toggleSidebar}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="topbar-title">{Navbar.title}</div>
      </div>
      <div className="topbar-actions">
        <Show fallback={<SignInButton>
            <button className="topbar-button">Sign In</button>
        </SignInButton>} when="signed-in">
         
        </Show>
      </div>
    </header>
  );
};

export default Navbar;

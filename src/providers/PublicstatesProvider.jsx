import React, { useContext } from "react";

const publicContext = React.createContext();

const PublicstatesProvider = ({ children }) => {
  const [Navbar, setNavbar] = React.useState({
    view: "default",
    title: "Chat",
    options: [],
  });
  
  const [Sidebar, setSidebar] = React.useState({
    view: "default",
    title: "ChatGPT",
    history: [
      {
        id: "starter",
        title: "Welcome chat",
      },
    ],
    mobileOpen: false,
  });

  return (
    <publicContext.Provider value={{ Navbar, setNavbar, Sidebar, setSidebar }}>
      {children}
    </publicContext.Provider>
  );
};

export const usePublicstates = () => useContext(publicContext);
export default PublicstatesProvider;

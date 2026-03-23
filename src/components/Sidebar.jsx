import { usePublicstates } from "../providers/PublicstatesProvider";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { useUser } from "@clerk/react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { Sidebar, setSidebar } = usePublicstates();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const createChat = () => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    const newChat = {
      id,
      title: `New chat ${Sidebar.history.length + 1}`,
    };

    setSidebar((prev) => ({
      ...prev,
      history: [newChat, ...prev.history],
      mobileOpen: false,
    }));

    navigate(`/c/${id}`);
  };

  const closeSidebarOnMobile = () => {
    setSidebar((prev) => ({ ...prev, mobileOpen: false }));
  };

  const openChat = (id) => {
    closeSidebarOnMobile();
    navigate(`/c/${id}`);
  };

  return (
    <aside className={`chat-sidebar ${Sidebar.mobileOpen ? "open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">{Sidebar.title}</div>
        <button className="sidebar-action" onClick={createChat} type="button">
          + New chat
        </button>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Recent</p>
        <ul className="sidebar-list">
          {Sidebar.history.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-item ${location.pathname === `/c/${item.id}` ? "active" : ""}`}
                onClick={() => openChat(item.id)}
                type="button"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <Show
          fallback={
            <SignInButton>
              <button type="button" className="sidebar-item muted">
                Sign in
              </button>
            </SignInButton>
          }
          when="signed-in"
        >
          <div className="sidebar-profile flex  gap-3 justify-between items-center">
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <UserButton />
          </div>
        </Show>
      </div>
    </aside>
  );
};

export default Sidebar;

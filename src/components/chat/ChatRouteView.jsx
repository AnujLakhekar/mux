import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePublicstates } from "../../providers/PublicstatesProvider";

const ChatRouteView = () => {
  const { id } = useParams();
  const { Sidebar, setSidebar } = usePublicstates();

  useEffect(() => {
    if (!id) {
      return;
    }

    setSidebar((prev) => {
      const exists = prev.history.some((chat) => chat.id === id);
      if (exists) {
        return prev;
      }

      const fallbackTitle = `Chat ${id.slice(0, 6)}`;
      return {
        ...prev,
        history: [{ id, title: fallbackTitle }, ...prev.history],
      };
    });
  }, [id, setSidebar]);

  const currentChat = useMemo(() => {
    return Sidebar.history.find((chat) => chat.id === id);
  }, [Sidebar.history, id]);

  return (
    <section className="chat-thread-view">
      <h1>{currentChat?.title || "Chat"}</h1>
      <p>Chat route: /c/{id}</p>
    </section>
  );
};

export default ChatRouteView;

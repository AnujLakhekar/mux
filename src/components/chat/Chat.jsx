import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePublicstates } from "../../providers/PublicstatesProvider";
import { ArrowUp, ChevronDown, Mic, Paperclip } from "lucide-react";

const promptCards = [
  "What is the weather in San Francisco?",
  "Explain step-by-step how to solve this math problem: If x^2 + 6x + 9 = 25, what is x?",
  "Design a simple algorithm to find the longest palindrome in a string.",
];

const Chat = () => {
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

      const fallbackTitle = `${id}`;
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
    <section className="chat-panel">
      <div className="chat-panel-top">
        <button className="panel-icon-button" type="button">
          <Paperclip size={16} />
        </button>
      </div>

      <div className="chat-panel-body">
        <div className="model-picker-wrap">
          <div className="model-picker-label">Chat</div>
          <button className="model-picker" type="button">
            <span>Llama 3.3 70B</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <h1 className="prompt-title">Try these prompts ✨</h1>

        <div className="prompt-grid">
          {promptCards.map((prompt) => (
            <button className="prompt-card" key={prompt} type="button">
              {prompt}
            </button>
          ))}
        </div>

        {id ? (
          <p className="route-pill">Current chat: {currentChat?.title || id}</p>
        ) : null}
      </div>

      <div className="chat-input-dock">
        <div className="input-shell">
          <input placeholder="Ask AI..." type="text" />
          <div className="input-actions">
            <button className="input-action" type="button">
              <Paperclip size={16} />
            </button>
            <button className="input-action" type="button">
              <Mic size={16} />
            </button>
            <button className="input-action send" type="button">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;

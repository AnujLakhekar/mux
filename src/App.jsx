import LayoutGrid from "./components/layouts/LayoutGrid";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutGrid>
            <Chat />
          </LayoutGrid>
        }
      />
      <Route
        path="/c/:id"
        element={
          <LayoutGrid>
            <Chat />
          </LayoutGrid>
        }
      />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;

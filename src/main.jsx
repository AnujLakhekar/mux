import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/react";
import PublicstatesProvider from "./providers/PublicstatesProvider.jsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <PublicstatesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PublicstatesProvider>
    </QueryClientProvider>
  </ClerkProvider>,
);

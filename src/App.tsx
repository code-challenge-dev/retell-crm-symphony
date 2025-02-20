
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StrictMode } from "react";
import Index from "./pages/Index";
import Calls from "./pages/calls";
import Agents from "./pages/agents";
import Voices from "./pages/voices";
import Knowledge from "./pages/knowledge";
import Settings from "./pages/settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/calls" element={<Layout><Calls /></Layout>} />
            <Route path="/agents" element={<Layout><Agents /></Layout>} />
            <Route path="/voices" element={<Layout><Voices /></Layout>} />
            <Route path="/knowledge" element={<Layout><Knowledge /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

export default App;

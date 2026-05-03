import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { WhatsAppProvider } from "./context/WhatsAppContext";

// Lazy load pages for performance optimization
const AiPvcGroups = lazy(() => import("./pages/AiPvcGroups.tsx"));
const Benefits = lazy(() => import("./pages/Benefits.tsx"));
const Clients = lazy(() => import("./pages/Clients.tsx"));
const Contractors = lazy(() => import("./pages/Contractors.tsx"));
const Index = lazy(() => import("./pages/Index.tsx"));
const Labour = lazy(() => import("./pages/Labour.tsx"));
const Network = lazy(() => import("./pages/Network.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const SiranthanSiran = lazy(() => import("./pages/SiranthanSiran.tsx"));
const Srinivasan = lazy(() => import("./pages/Srinivasan.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WhatsAppProvider>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/network" element={<Network />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/contractors" element={<Contractors />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/labour" element={<Labour />} />
              <Route path="/ai-pvc-groups" element={<AiPvcGroups />} />
              <Route path="/siranthan-siran" element={<SiranthanSiran />} />
              <Route path="/srinivasan" element={<Srinivasan />} />
              <Route path="/register" element={<Register />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </WhatsAppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

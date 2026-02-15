/**
 * App root — sets up providers and routing for ArcVault.
 *
 * Provider stack:
 *   - QueryClientProvider: TanStack Query for async state (on-chain data fetching)
 *   - TooltipProvider: accessible tooltip primitives from Radix
 *   - BrowserRouter: client-side routing
 *
 * In a full implementation, we'd wrap this with WalletProvider from
 * @solana/wallet-adapter-react for Phantom/Solflare wallet integration.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { isAuthenticated } from "@/lib/auth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AgenticSolutions from "./pages/AgenticSolutions";
import SolutionDetail from "./pages/SolutionDetail";
import NotFound from "./pages/NotFound";
import { useState, useCallback } from "react";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const [authed, setAuthed] = useState(isAuthenticated());

  const onAuthChange = useCallback(() => {
    setAuthed(isAuthenticated());
  }, []);

  return (
    <BrowserRouter basename="/bfsi-agentic-suite/admin/dashboard">
      <Routes>
        <Route
          path="/"
          element={authed ? <Navigate to="/home" replace /> : <Login onAuthChange={onAuthChange} />}
        />
        <Route
          path="/home"
          element={authed ? <Home onAuthChange={onAuthChange} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/solutions"
          element={
            <ProtectedRoute>
              <AgenticSolutions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solution/:id"
          element={
            <ProtectedRoute>
              <SolutionDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppRoutes />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

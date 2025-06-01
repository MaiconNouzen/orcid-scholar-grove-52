
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Publications from "./pages/Publications";
import Projects from "./pages/Projects";
import EditProfile from "./pages/EditProfile";
import Navigation from "./components/Navigation";
import ResearcherProfilePage from "./pages/ResearcherProfilePage";
import EditPublicationPage from "./pages/EditPublicationPage";
import EditProjectPage from "./pages/EditProjectPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/researcher/:id" element={<ResearcherProfilePage />} />
            <Route path="/edit-publication/:id" element={<EditPublicationPage />} />
            <Route path="/edit-project/:id" element={<EditProjectPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

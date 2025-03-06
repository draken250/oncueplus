
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProjectManagement from "./pages/ProjectManagement";
import FormBuilder from "./pages/FormBuilder";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ClientPortal from "./pages/ClientPortal";
import ClientProjects from "./pages/client/ClientProjects";
import ClientTasks from "./pages/client/ClientTasks";
import ClientInvoices from "./pages/client/ClientInvoices";
import ClientContracts from "./pages/client/ClientContracts";
import ClientResources from "./pages/client/ClientResources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <ProjectManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/form-builder" 
              element={
                <ProtectedRoute>
                  <FormBuilder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Client Portal Routes */}
            <Route 
              path="/client" 
              element={
                <ProtectedRoute>
                  <ClientPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client/projects" 
              element={
                <ProtectedRoute>
                  <ClientProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client/tasks" 
              element={
                <ProtectedRoute>
                  <ClientTasks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client/invoices" 
              element={
                <ProtectedRoute>
                  <ClientInvoices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client/contracts" 
              element={
                <ProtectedRoute>
                  <ClientContracts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client/resources" 
              element={
                <ProtectedRoute>
                  <ClientResources />
                </ProtectedRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

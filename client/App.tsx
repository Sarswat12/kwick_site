import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import BatteryMap from "./pages/BatteryMap";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminPayments from "./pages/AdminPayments";
import AdminKYC from "./pages/AdminKYC";
import AdminFleet from "./pages/AdminFleet";
import AdminContent from "./pages/AdminContent";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <Index />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/pricing"
            element={
              <Layout>
                <Pricing />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
          <Route
            path="/account"
            element={
              <Layout>
                <Account />
              </Layout>
            }
          />
          <Route
            path="/battery-map"
            element={
              <Layout>
                <BatteryMap />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <PlaceholderPage pageName="Blog" />
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout>
                <PlaceholderPage pageName="Careers" />
              </Layout>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <AdminLayout>
                <AdminPayments />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/kyc"
            element={
              <AdminLayout>
                <AdminKYC />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/fleet"
            element={
              <AdminLayout>
                <AdminFleet />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/iot"
            element={
              <AdminLayout>
                <AdminFleet />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/content"
            element={
              <AdminLayout>
                <AdminContent />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/support"
            element={
              <AdminLayout>
                <PlaceholderPage pageName="Support Tickets" />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <AdminLayout>
                <AdminContent />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/careers"
            element={
              <AdminLayout>
                <AdminContent />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <PlaceholderPage pageName="Analytics" />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminLayout>
                <PlaceholderPage pageName="Settings" />
              </AdminLayout>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

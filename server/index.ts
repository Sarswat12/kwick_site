import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { adminLogin, adminProfile, adminLogout } from "./routes/admin-auth";
import { getDashboardStats, getAnalyticsData, getUsers, updateUser, getPayments, getKYCApplications, updateKYCApplication, getVehicles } from "./routes/admin-dashboard";
import { authenticateAdmin, requireRole } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin authentication routes
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", authenticateAdmin, adminLogout);
  app.get("/api/admin/profile", authenticateAdmin, adminProfile);

  // Admin dashboard routes
  app.get("/api/admin/dashboard/stats", authenticateAdmin, getDashboardStats);
  app.get("/api/admin/dashboard/analytics", authenticateAdmin, getAnalyticsData);

  // User management routes
  app.get("/api/admin/users", authenticateAdmin, getUsers);
  app.put("/api/admin/users/:userId", authenticateAdmin, requireRole(['admin', 'super_admin']), updateUser);

  // Payment management routes
  app.get("/api/admin/payments", authenticateAdmin, getPayments);

  // KYC management routes
  app.get("/api/admin/kyc", authenticateAdmin, getKYCApplications);
  app.put("/api/admin/kyc/:kycId", authenticateAdmin, requireRole(['admin', 'super_admin']), updateKYCApplication);

  // Fleet management routes
  app.get("/api/admin/vehicles", authenticateAdmin, getVehicles);

  return app;
}

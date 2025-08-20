import { RequestHandler } from "express";
import { AdminLoginRequest, AdminLoginResponse } from "@shared/admin-api";
import { validateAdminCredentials, generateAdminToken } from "../middleware/auth";

export const adminLogin: RequestHandler = (req, res) => {
  try {
    const { email, password } = req.body as AdminLoginRequest;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const adminUser = validateAdminCredentials(email, password);

    if (!adminUser) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const token = generateAdminToken(adminUser.id);
    
    // Update last login
    adminUser.lastLogin = new Date().toISOString();

    const response: AdminLoginResponse = {
      user: adminUser,
      token,
      expiresIn: 24 * 60 * 60 // 24 hours in seconds
    };

    res.json(response);
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

export const adminProfile: RequestHandler = (req, res) => {
  try {
    const adminUser = (req as any).adminUser;
    res.json(adminUser);
  } catch (error) {
    console.error('Admin profile error:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

export const adminLogout: RequestHandler = (req, res) => {
  try {
    // In a real app, you'd invalidate the token in the database
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

import { RequestHandler } from "express";
import { AdminUser } from "@shared/admin-api";

// Mock admin users - In production, this would be in a database
const ADMIN_USERS: AdminUser[] = [
  {
    id: "admin-1",
    email: "admin@kwick.in",
    name: "System Administrator",
    role: "super_admin",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date().toISOString()
  },
  {
    id: "admin-2", 
    email: "manager@kwick.in",
    name: "Operations Manager",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date().toISOString()
  }
];

// Mock JWT token validation - In production, use proper JWT library
export const validateAdminToken = (token: string): AdminUser | null => {
  try {
    // Simple base64 decode for demo - use proper JWT in production
    const decoded = JSON.parse(Buffer.from(token.split('.')[1] || '', 'base64').toString());
    const adminUser = ADMIN_USERS.find(user => user.id === decoded.userId);
    return adminUser || null;
  } catch (error) {
    return null;
  }
};

// Mock JWT token generation - In production, use proper JWT library
export const generateAdminToken = (userId: string): string => {
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    iat: Math.floor(Date.now() / 1000)
  };
  
  // Simple base64 encode for demo - use proper JWT in production
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = Buffer.from('mock-signature').toString('base64');
  
  return `${header}.${body}.${signature}`;
};

export const authenticateAdmin: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Access denied. No token provided.' 
    });
  }

  const token = authHeader.substring(7);
  const adminUser = validateAdminToken(token);

  if (!adminUser) {
    return res.status(401).json({ 
      error: 'Invalid or expired token.' 
    });
  }

  // Attach admin user to request
  (req as any).adminUser = adminUser;
  next();
};

export const requireRole = (roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const adminUser = (req as any).adminUser as AdminUser;
    
    if (!adminUser || !roles.includes(adminUser.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }
    
    next();
  };
};

export const validateAdminCredentials = (email: string, password: string): AdminUser | null => {
  // In production, hash and compare passwords properly
  const adminUser = ADMIN_USERS.find(user => user.email === email);
  
  // Mock password validation - use proper bcrypt in production
  if (adminUser && (password === 'admin123' || password === 'manager123')) {
    return adminUser;
  }
  
  return null;
};

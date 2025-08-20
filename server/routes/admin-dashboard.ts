import { RequestHandler } from "express";
import { DashboardStats, AnalyticsData, PaginatedResponse, User, Payment, KYCApplicationResponse, Rental, Vehicle, SupportTicket, BlogPost, CareerPost, UserFilters, PaymentFilters, UpdateUserRequest, UpdateKYCRequest, ProcessPaymentRequest } from "@shared/admin-api";

// Mock data generators for demonstration
const generateMockUsers = (count: number = 50): User[] => {
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];
  const statuses = ['active', 'suspended', 'blocked'] as const;
  const kycStatuses = ['pending', 'approved', 'rejected'] as const;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    firstName: `User${i + 1}`,
    lastName: 'Doe',
    email: `user${i + 1}@example.com`,
    phone: `+91 9876543${String(i).padStart(3, '0')}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    kycStatus: kycStatuses[Math.floor(Math.random() * kycStatuses.length)],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    totalRentals: Math.floor(Math.random() * 20),
    totalSpent: Math.floor(Math.random() * 50000),
    rating: 4 + Math.random()
  }));
};

const generateMockPayments = (count: number = 100): Payment[] => {
  const statuses = ['pending', 'completed', 'failed', 'refunded'] as const;
  const methods = ['upi', 'card', 'netbanking', 'wallet'] as const;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `payment-${i + 1}`,
    userId: `user-${Math.floor(Math.random() * 50) + 1}`,
    userName: `User${Math.floor(Math.random() * 50) + 1} Doe`,
    rentalId: `rental-${i + 1}`,
    amount: Math.floor(Math.random() * 5000) + 100,
    currency: 'INR',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    transactionId: `TXN${Date.now()}${i}`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: Math.random() > 0.3 ? new Date().toISOString() : undefined,
    fees: Math.floor(Math.random() * 50) + 10
  }));
};

const generateMockKYCApplications = (count: number = 25): KYCApplicationResponse[] => {
  const statuses = ['pending', 'approved', 'rejected'] as const;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `kyc-${i + 1}`,
    userId: `user-${i + 1}`,
    userName: `User${i + 1} Doe`,
    userEmail: `user${i + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    documents: [
      {
        id: `doc-${i + 1}-1`,
        userId: `user-${i + 1}`,
        type: 'driving_license',
        documentUrl: '/uploads/driving_license.pdf',
        status: 'approved',
        submittedAt: new Date().toISOString()
      },
      {
        id: `doc-${i + 1}-2`,
        userId: `user-${i + 1}`,
        type: 'aadhaar',
        documentUrl: '/uploads/aadhaar.pdf',
        status: 'pending',
        submittedAt: new Date().toISOString()
      }
    ],
    submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    reviewedAt: Math.random() > 0.5 ? new Date().toISOString() : undefined,
    reviewedBy: Math.random() > 0.5 ? 'admin@kwick.in' : undefined
  }));
};

const generateMockVehicles = (count: number = 20): Vehicle[] => {
  const statuses = ['available', 'rented', 'maintenance', 'offline'] as const;
  const conditions = ['excellent', 'good', 'fair', 'poor'] as const;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `vehicle-${i + 1}`,
    name: `KWICK Elite ${i + 1}`,
    model: 'Elite 2024',
    licensePlate: `MH01AB${String(1000 + i).slice(-4)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    batteryLevel: Math.floor(Math.random() * 100),
    location: {
      latitude: 19.0760 + (Math.random() - 0.5) * 0.2,
      longitude: 72.8777 + (Math.random() - 0.5) * 0.2,
      address: `Location ${i + 1}, Mumbai`
    },
    lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalKms: Math.floor(Math.random() * 50000),
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    iotDeviceId: `iot-${i + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

// Mock data storage
let mockUsers = generateMockUsers();
let mockPayments = generateMockPayments();
let mockKYCApplications = generateMockKYCApplications();
let mockVehicles = generateMockVehicles();

export const getDashboardStats: RequestHandler = (req, res) => {
  try {
    const stats: DashboardStats = {
      totalUsers: mockUsers.length,
      activeRentals: 15,
      totalRevenue: mockPayments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0),
      totalVehicles: mockVehicles.length,
      userGrowth: 12.5,
      revenueGrowth: 8.3,
      vehicleUtilization: 78.5,
      customerSatisfaction: 4.7
    };

    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAnalyticsData: RequestHandler = (req, res) => {
  try {
    const analytics: AnalyticsData = {
      userRegistrations: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10) + 1
      })),
      rentalBookings: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 20) + 5,
        revenue: Math.floor(Math.random() * 50000) + 10000
      })),
      vehicleUtilization: mockVehicles.map(v => ({
        vehicleId: v.id,
        utilizationRate: Math.random() * 100
      })),
      topCities: [
        { city: 'Mumbai', users: 1250, revenue: 2500000 },
        { city: 'Delhi', users: 980, revenue: 1950000 },
        { city: 'Bangalore', users: 850, revenue: 1700000 },
        { city: 'Chennai', users: 720, revenue: 1440000 },
        { city: 'Hyderabad', users: 650, revenue: 1300000 }
      ],
      paymentMethodsDistribution: [
        { method: 'UPI', percentage: 45 },
        { method: 'Card', percentage: 30 },
        { method: 'Netbanking', percentage: 15 },
        { method: 'Wallet', percentage: 10 }
      ]
    };

    res.json(analytics);
  } catch (error) {
    console.error('Analytics data error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsers: RequestHandler = (req, res) => {
  try {
    const filters = req.query as UserFilters;
    const page = parseInt(filters.page as string) || 1;
    const limit = parseInt(filters.limit as string) || 10;
    
    let filteredUsers = [...mockUsers];
    
    // Apply filters
    if (filters.status) {
      filteredUsers = filteredUsers.filter(u => u.status === filters.status);
    }
    if (filters.kycStatus) {
      filteredUsers = filteredUsers.filter(u => u.kycStatus === filters.kycStatus);
    }
    if (filters.city) {
      filteredUsers = filteredUsers.filter(u => u.city === filters.city);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(u => 
        u.firstName.toLowerCase().includes(search) ||
        u.lastName.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const response: PaginatedResponse<User> = {
      data: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit)
    };

    res.json(response);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body as UpdateUserRequest;

    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user
    if (updateData.status) {
      mockUsers[userIndex].status = updateData.status;
    }

    res.json(mockUsers[userIndex]);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPayments: RequestHandler = (req, res) => {
  try {
    const filters = req.query as PaymentFilters;
    const page = parseInt(filters.page as string) || 1;
    const limit = parseInt(filters.limit as string) || 10;
    
    let filteredPayments = [...mockPayments];
    
    // Apply filters
    if (filters.status) {
      filteredPayments = filteredPayments.filter(p => p.status === filters.status);
    }
    if (filters.method) {
      filteredPayments = filteredPayments.filter(p => p.method === filters.method);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

    const response: PaginatedResponse<Payment> = {
      data: paginatedPayments,
      total: filteredPayments.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPayments.length / limit)
    };

    res.json(response);
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getKYCApplications: RequestHandler = (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    
    let filteredApplications = [...mockKYCApplications];
    
    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

    const response: PaginatedResponse<KYCApplicationResponse> = {
      data: paginatedApplications,
      total: filteredApplications.length,
      page,
      limit,
      totalPages: Math.ceil(filteredApplications.length / limit)
    };

    res.json(response);
  } catch (error) {
    console.error('Get KYC applications error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateKYCApplication: RequestHandler = (req, res) => {
  try {
    const { kycId } = req.params;
    const updateData = req.body as UpdateKYCRequest;
    const adminUser = (req as any).adminUser;

    const kycIndex = mockKYCApplications.findIndex(app => app.id === kycId);
    if (kycIndex === -1) {
      return res.status(404).json({ error: "KYC application not found" });
    }

    // Update KYC application
    mockKYCApplications[kycIndex].status = updateData.status;
    mockKYCApplications[kycIndex].reviewedAt = new Date().toISOString();
    mockKYCApplications[kycIndex].reviewedBy = adminUser.email;
    if (updateData.notes) {
      mockKYCApplications[kycIndex].notes = updateData.notes;
    }

    // Update user KYC status
    const userIndex = mockUsers.findIndex(u => u.id === mockKYCApplications[kycIndex].userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].kycStatus = updateData.status;
    }

    res.json(mockKYCApplications[kycIndex]);
  } catch (error) {
    console.error('Update KYC application error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVehicles: RequestHandler = (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    
    let filteredVehicles = [...mockVehicles];
    
    if (status) {
      filteredVehicles = filteredVehicles.filter(v => v.status === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

    const response: PaginatedResponse<Vehicle> = {
      data: paginatedVehicles,
      total: filteredVehicles.length,
      page,
      limit,
      totalPages: Math.ceil(filteredVehicles.length / limit)
    };

    res.json(response);
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

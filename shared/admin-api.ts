// Admin User Management Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  createdAt: string;
  lastLogin: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  status: 'active' | 'suspended' | 'blocked';
  kycStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  totalRentals: number;
  totalSpent: number;
  rating: number;
}

// KYC Management Types
export interface KYCDocument {
  id: string;
  userId: string;
  type: 'driving_license' | 'aadhaar' | 'address_proof';
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface KYCApplicationResponse {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: KYCDocument[];
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

// Payment Management Types
export interface Payment {
  id: string;
  userId: string;
  userName: string;
  rentalId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'upi' | 'card' | 'netbanking' | 'wallet';
  transactionId: string;
  createdAt: string;
  completedAt?: string;
  refundAmount?: number;
  fees: number;
}

export interface PaymentSummary {
  totalRevenue: number;
  totalTransactions: number;
  successRate: number;
  avgTransactionValue: number;
  topPaymentMethods: Array<{ method: string; count: number; percentage: number }>;
  monthlyTrends: Array<{ month: string; revenue: number; transactions: number }>;
}

// Rental Management Types
export interface Rental {
  id: string;
  userId: string;
  userName: string;
  vehicleId: string;
  vehicleName: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'cancelled' | 'overdue';
  totalAmount: number;
  duration: string;
  pickupLocation: string;
  dropoffLocation?: string;
  createdAt: string;
}

// Fleet Management Types
export interface Vehicle {
  id: string;
  name: string;
  model: string;
  licensePlate: string;
  status: 'available' | 'rented' | 'maintenance' | 'offline';
  batteryLevel: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  lastMaintenance: string;
  totalKms: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  iotDeviceId?: string;
  createdAt: string;
}

export interface IoTDevice {
  id: string;
  vehicleId: string;
  deviceType: string;
  status: 'online' | 'offline' | 'error';
  lastHeartbeat: string;
  batteryLevel: number;
  signalStrength: number;
  firmware: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

// Content Management Types
export interface BlogPost {
  id: string;
  title: string;
  titleHi?: string;
  slug: string;
  content: string;
  contentHi?: string;
  excerpt: string;
  excerptHi?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  featuredImage?: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface CareerPost {
  id: string;
  title: string;
  titleHi?: string;
  department: string;
  location: string;
  type: 'full_time' | 'part_time' | 'contract' | 'internship';
  experience: string;
  salary?: string;
  description: string;
  descriptionHi?: string;
  requirements: string[];
  requirementsHi?: string[];
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Support & Query Management Types
export interface SupportTicket {
  id: string;
  userId?: string;
  userName?: string;
  userEmail: string;
  subject: string;
  message: string;
  category: 'technical' | 'billing' | 'general' | 'complaint' | 'feature_request';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  ticketId: string;
  message: string;
  isAdminResponse: boolean;
  authorName: string;
  createdAt: string;
}

// Analytics Types
export interface DashboardStats {
  totalUsers: number;
  activeRentals: number;
  totalRevenue: number;
  totalVehicles: number;
  userGrowth: number;
  revenueGrowth: number;
  vehicleUtilization: number;
  customerSatisfaction: number;
}

export interface AnalyticsData {
  userRegistrations: Array<{ date: string; count: number }>;
  rentalBookings: Array<{ date: string; count: number; revenue: number }>;
  vehicleUtilization: Array<{ vehicleId: string; utilizationRate: number }>;
  topCities: Array<{ city: string; users: number; revenue: number }>;
  paymentMethodsDistribution: Array<{ method: string; percentage: number }>;
}

// API Response Types
export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  user: AdminUser;
  token: string;
  expiresIn: number;
}

export interface UpdateUserRequest {
  status?: 'active' | 'suspended' | 'blocked';
  notes?: string;
}

export interface UpdateKYCRequest {
  status: 'approved' | 'rejected';
  rejectionReason?: string;
  notes?: string;
}

export interface ProcessPaymentRequest {
  action: 'refund' | 'mark_failed' | 'retry';
  amount?: number;
  reason?: string;
}

export interface UpdateVehicleRequest {
  status?: 'available' | 'rented' | 'maintenance' | 'offline';
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
}

export interface CreateBlogPostRequest {
  title: string;
  titleHi?: string;
  content: string;
  contentHi?: string;
  excerpt: string;
  excerptHi?: string;
  featuredImage?: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface UpdateTicketRequest {
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  response?: string;
}

// Filter and Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserFilters extends PaginationParams {
  status?: 'active' | 'suspended' | 'blocked';
  kycStatus?: 'pending' | 'approved' | 'rejected';
  city?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface PaymentFilters extends PaginationParams {
  status?: 'pending' | 'completed' | 'failed' | 'refunded';
  method?: 'upi' | 'card' | 'netbanking' | 'wallet';
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

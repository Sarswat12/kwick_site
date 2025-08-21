import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Ban, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CreditCard,
  Car,
  Battery,
  Zap,
  IndianRupee,
  Download,
  Upload,
  Plus,
  Trash2,
  Settings,
  UserCheck,
  UserX,
  History,
  TrendingUp,
  Award,
  Target,
  DollarSign,
  Bike,
  Shield,
  AlertTriangle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending_kyc';
  kycStatus: 'pending' | 'approved' | 'rejected';
  joinedAt: string;
  lastActive: string;
  vehicleAssigned?: VehicleAssignment;
  paymentHistory: PaymentRecord[];
  totalSpent: number;
  totalRides: number;
  earningsFromDelivery: number;
  rating: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface VehicleAssignment {
  vehicleId: string;
  vehicleNumber: string;
  vehicleModel: string;
  controllerId: string;
  assignedAt: string;
  status: 'active' | 'maintenance' | 'returned';
  batteryLevel: number;
  lastLocation: string;
  totalDistance: number;
}

interface PaymentRecord {
  id: string;
  amount: number;
  type: 'rental' | 'security_deposit' | 'fine' | 'refund';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: 'upi' | 'card' | 'bank_transfer' | 'wallet';
  date: string;
  description: string;
  transactionId: string;
}

export default function AdminUsers() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [kycFilter, setKycFilter] = useState<string>('all');
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newVehicleId, setNewVehicleId] = useState('');
  const [newControllerId, setNewControllerId] = useState('');

  // Mock data for users
  const [users, setUsers] = useState<User[]>([
    {
      id: 'USR001',
      name: 'Raj Kumar',
      email: 'raj.kumar@email.com',
      phone: '+91 98765 43210',
      address: 'Sector 112, Noida, Uttar Pradesh',
      status: 'active',
      kycStatus: 'approved',
      joinedAt: '2024-01-15T10:30:00Z',
      lastActive: '2024-01-20T14:30:00Z',
      vehicleAssigned: {
        vehicleId: 'VEH001',
        vehicleNumber: 'UP16 EV 1234',
        vehicleModel: 'KWICK Elite',
        controllerId: 'CTRL001',
        assignedAt: '2024-01-16T09:00:00Z',
        status: 'active',
        batteryLevel: 85,
        lastLocation: 'Sector 18, Noida',
        totalDistance: 2847
      },
      paymentHistory: [
        {
          id: 'PAY001',
          amount: 2000,
          type: 'security_deposit',
          status: 'completed',
          method: 'upi',
          date: '2024-01-15T10:30:00Z',
          description: 'Security Deposit',
          transactionId: 'TXN123456789'
        },
        {
          id: 'PAY002',
          amount: 693,
          type: 'rental',
          status: 'completed',
          method: 'card',
          date: '2024-01-16T09:00:00Z',
          description: 'Weekly Rental - KWICK Elite',
          transactionId: 'TXN123456790'
        },
        {
          id: 'PAY003',
          amount: 693,
          type: 'rental',
          status: 'completed',
          method: 'upi',
          date: '2024-01-20T09:00:00Z',
          description: 'Weekly Rental - KWICK Elite',
          transactionId: 'TXN123456791'
        }
      ],
      totalSpent: 3386,
      totalRides: 47,
      earningsFromDelivery: 18500,
      rating: 4.8,
      tier: 'gold'
    },
    {
      id: 'USR002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43211',
      address: 'Sector 62, Noida, Uttar Pradesh',
      status: 'inactive',
      kycStatus: 'pending',
      joinedAt: '2024-01-18T14:20:00Z',
      lastActive: '2024-01-19T16:45:00Z',
      paymentHistory: [
        {
          id: 'PAY004',
          amount: 2000,
          type: 'security_deposit',
          status: 'completed',
          method: 'bank_transfer',
          date: '2024-01-18T14:20:00Z',
          description: 'Security Deposit',
          transactionId: 'TXN123456792'
        }
      ],
      totalSpent: 2000,
      totalRides: 0,
      earningsFromDelivery: 0,
      rating: 0,
      tier: 'bronze'
    },
    {
      id: 'USR003',
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      phone: '+91 98765 43212',
      address: 'Sector 101, Noida, Uttar Pradesh',
      status: 'active',
      kycStatus: 'approved',
      joinedAt: '2024-01-10T11:45:00Z',
      lastActive: '2024-01-20T18:20:00Z',
      vehicleAssigned: {
        vehicleId: 'VEH002',
        vehicleNumber: 'UP16 EV 5678',
        vehicleModel: 'KWICK Elite',
        controllerId: 'CTRL002',
        assignedAt: '2024-01-11T10:00:00Z',
        status: 'active',
        batteryLevel: 92,
        lastLocation: 'Sector 18 Metro, Noida',
        totalDistance: 4523
      },
      paymentHistory: [
        {
          id: 'PAY005',
          amount: 2000,
          type: 'security_deposit',
          status: 'completed',
          method: 'upi',
          date: '2024-01-10T11:45:00Z',
          description: 'Security Deposit',
          transactionId: 'TXN123456793'
        },
        {
          id: 'PAY006',
          amount: 2970,
          type: 'rental',
          status: 'completed',
          method: 'card',
          date: '2024-01-11T10:00:00Z',
          description: 'Monthly Rental - KWICK Elite',
          transactionId: 'TXN123456794'
        }
      ],
      totalSpent: 4970,
      totalRides: 83,
      earningsFromDelivery: 32400,
      rating: 4.9,
      tier: 'platinum'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active', icon: CheckCircle },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive', icon: Clock },
      suspended: { color: 'bg-red-100 text-red-800', text: 'Suspended', icon: Ban },
      pending_kyc: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending KYC', icon: AlertTriangle }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.inactive;
    const IconComponent = variant.icon;
    
    return (
      <Badge className={variant.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {variant.text}
      </Badge>
    );
  };

  const getKYCBadge = (status: string) => {
    const variants = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', text: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.pending;
    
    return (
      <Badge className={variant.color}>
        {variant.text}
      </Badge>
    );
  };

  const getTierBadge = (tier: string) => {
    const variants = {
      bronze: { color: 'bg-amber-100 text-amber-800', text: 'Bronze' },
      silver: { color: 'bg-gray-100 text-gray-800', text: 'Silver' },
      gold: { color: 'bg-yellow-100 text-yellow-800', text: 'Gold' },
      platinum: { color: 'bg-purple-100 text-purple-800', text: 'Platinum' }
    };
    
    const variant = variants[tier as keyof typeof variants] || variants.bronze;
    
    return (
      <Badge className={variant.color}>
        <Award className="h-3 w-3 mr-1" />
        {variant.text}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      failed: { color: 'bg-red-100 text-red-800', text: 'Failed' },
      refunded: { color: 'bg-blue-100 text-blue-800', text: 'Refunded' }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.pending;
    
    return (
      <Badge className={variant.color}>
        {variant.text}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesKYC = kycFilter === 'all' || user.kycStatus === kycFilter;
    return matchesSearch && matchesStatus && matchesKYC;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    withVehicles: users.filter(u => u.vehicleAssigned).length,
    totalRevenue: users.reduce((sum, u) => sum + u.totalSpent, 0),
    avgRating: users.filter(u => u.rating > 0).reduce((sum, u) => sum + u.rating, 0) / users.filter(u => u.rating > 0).length || 0
  };

  const assignVehicle = () => {
    if (!selectedUser || !newVehicleId || !newControllerId) return;

    const newAssignment: VehicleAssignment = {
      vehicleId: newVehicleId,
      vehicleNumber: `UP16 EV ${Math.random().toString().substr(2, 4)}`,
      vehicleModel: 'KWICK Elite',
      controllerId: newControllerId,
      assignedAt: new Date().toISOString(),
      status: 'active',
      batteryLevel: 100,
      lastLocation: 'KWICK Hub - Sector 112',
      totalDistance: 0
    };

    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { ...user, vehicleAssigned: newAssignment, status: 'active' as const }
        : user
    ));

    setShowVehicleDialog(false);
    setNewVehicleId('');
    setNewControllerId('');
    
    // Update selected user
    const updatedUser = users.find(u => u.id === selectedUser.id);
    if (updatedUser) setSelectedUser({ ...updatedUser, vehicleAssigned: newAssignment });
  };

  const unassignVehicle = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, vehicleAssigned: undefined }
        : user
    ));
    
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, vehicleAssigned: undefined });
    }
  };

  const updateUserStatus = (userId: string, status: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: status as any }
        : user
    ));
    
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status: status as any });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, vehicle assignments, and payment history</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
            <div className="text-sm text-gray-600">Inactive</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
            <div className="text-sm text-gray-600">Suspended</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.withVehicles}</div>
            <div className="text-sm text-gray-600">With Vehicles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - User List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div>
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending_kyc">Pending KYC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>KYC Status</Label>
                <Select value={kycFilter} onValueChange={setKycFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All KYC</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* User List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredUsers.map((user) => (
              <Card 
                key={user.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedUser?.id === user.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{user.name}</h3>
                        <p className="text-xs text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-600">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(user.status)}
                      {getTierBadge(user.tier)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Joined: {new Date(user.joinedAt).toLocaleDateString()}</span>
                    <span>₹{user.totalSpent.toLocaleString()}</span>
                  </div>
                  
                  {user.vehicleAssigned && (
                    <div className="mt-2 flex items-center text-xs text-blue-600">
                      <Car className="h-3 w-3 mr-1" />
                      <span>{user.vehicleAssigned.vehicleNumber}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side - User Details */}
        <div className="lg:col-span-2">
          {selectedUser ? (
            <div className="space-y-6">
              {/* User Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        {selectedUser.name}
                      </CardTitle>
                      <CardDescription>User ID: {selectedUser.id}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {getStatusBadge(selectedUser.status)}
                      {getKYCBadge(selectedUser.kycStatus)}
                      {getTierBadge(selectedUser.tier)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedUser.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Joined: {new Date(selectedUser.joinedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Last Active: {new Date(selectedUser.lastActive).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Total Rides: {selectedUser.totalRides}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Button
                      onClick={() => setShowEditDialog(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit User
                    </Button>
                    <Select onValueChange={(value) => updateUserStatus(selectedUser.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-green-600">₹{selectedUser.totalSpent.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Total Spent</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-blue-600">{selectedUser.totalRides}</div>
                    <div className="text-xs text-gray-600">Total Rides</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-purple-600">₹{selectedUser.earningsFromDelivery.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Delivery Earnings</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-yellow-600">{selectedUser.rating}/5</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="vehicle" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vehicle">Vehicle Info</TabsTrigger>
                  <TabsTrigger value="payments">Payment History</TabsTrigger>
                  <TabsTrigger value="activity">Activity Log</TabsTrigger>
                </TabsList>

                {/* Vehicle Assignment Tab */}
                <TabsContent value="vehicle" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Car className="h-5 w-5 mr-2" />
                          Vehicle Assignment
                        </CardTitle>
                        {!selectedUser.vehicleAssigned ? (
                          <Button
                            onClick={() => setShowVehicleDialog(true)}
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Assign Vehicle
                          </Button>
                        ) : (
                          <Button
                            onClick={() => unassignVehicle(selectedUser.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Unassign
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedUser.vehicleAssigned ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm text-gray-600">Vehicle Number</Label>
                              <div className="font-medium">{selectedUser.vehicleAssigned.vehicleNumber}</div>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Model</Label>
                              <div className="font-medium">{selectedUser.vehicleAssigned.vehicleModel}</div>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Controller ID</Label>
                              <div className="font-medium">{selectedUser.vehicleAssigned.controllerId}</div>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Status</Label>
                              <Badge className="bg-green-100 text-green-800 ml-2">
                                {selectedUser.vehicleAssigned.status}
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Battery Level</Label>
                              <div className="flex items-center">
                                <Battery className="h-4 w-4 mr-1 text-green-500" />
                                <span className="font-medium">{selectedUser.vehicleAssigned.batteryLevel}%</span>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Total Distance</Label>
                              <div className="font-medium">{selectedUser.vehicleAssigned.totalDistance} km</div>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-sm text-gray-600">Last Location</Label>
                              <div className="font-medium flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                {selectedUser.vehicleAssigned.lastLocation}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Vehicle Health</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">Good</div>
                                <div className="text-gray-600">Engine Status</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">85%</div>
                                <div className="text-gray-600">Battery Health</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-yellow-600">Due</div>
                                <div className="text-gray-600">Next Service</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600">No vehicle assigned to this user</p>
                          <Button
                            onClick={() => setShowVehicleDialog(true)}
                            className="mt-4 bg-primary hover:bg-primary/90"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Assign Vehicle
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Payment History Tab */}
                <TabsContent value="payments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Payment History
                      </CardTitle>
                      <CardDescription>
                        Complete payment records from day one
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedUser.paymentHistory.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <IndianRupee className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{payment.description}</h4>
                                <p className="text-xs text-gray-600">
                                  {new Date(payment.date).toLocaleDateString()} • {payment.method.toUpperCase()}
                                </p>
                                <p className="text-xs text-gray-500">
                                  TXN: {payment.transactionId}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">₹{payment.amount.toLocaleString()}</div>
                              {getPaymentStatusBadge(payment.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Total Spent:</span>
                          <span className="font-bold text-lg">₹{selectedUser.totalSpent.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Activity Log Tab */}
                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <History className="h-5 w-5 mr-2" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div className="text-sm">
                            <span className="font-medium">Payment completed</span> - Weekly rental
                            <div className="text-xs text-gray-500">2 hours ago</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded">
                          <Zap className="h-4 w-4 text-blue-600" />
                          <div className="text-sm">
                            <span className="font-medium">Battery swapped</span> - Sector 18 Station
                            <div className="text-xs text-gray-500">5 hours ago</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <div className="text-sm">
                            <span className="font-medium">Trip completed</span> - 12.5 km delivery
                            <div className="text-xs text-gray-500">1 day ago</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a User</h3>
                <p className="text-gray-600">Choose a user from the list to view their details and manage their account</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Vehicle Assignment Dialog */}
      <Dialog open={showVehicleDialog} onOpenChange={setShowVehicleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Vehicle</DialogTitle>
            <DialogDescription>
              Assign a vehicle and controller to {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Vehicle ID</Label>
              <Input
                placeholder="Enter vehicle ID (e.g., VEH003)"
                value={newVehicleId}
                onChange={(e) => setNewVehicleId(e.target.value)}
              />
            </div>
            <div>
              <Label>Controller ID</Label>
              <Input
                placeholder="Enter controller ID (e.g., CTRL003)"
                value={newControllerId}
                onChange={(e) => setNewControllerId(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={assignVehicle}
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={!newVehicleId || !newControllerId}
              >
                <Car className="h-4 w-4 mr-2" />
                Assign Vehicle
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowVehicleDialog(false);
                  setNewVehicleId('');
                  setNewControllerId('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

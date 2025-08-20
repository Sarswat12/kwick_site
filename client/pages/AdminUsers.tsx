import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  CreditCard
} from 'lucide-react';

interface User {
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

interface UserFilters {
  search: string;
  status: string;
  kycStatus: string;
  city: string;
  dateFrom: string;
  dateTo: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    status: '',
    kycStatus: '',
    city: '',
    dateFrom: '',
    dateTo: ''
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ''))
      });

      const response = await fetch(`/api/admin/users?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'block') => {
    try {
      const token = localStorage.getItem('adminToken');
      const statusMap = {
        suspend: 'suspended',
        activate: 'active',
        block: 'blocked'
      };

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: statusMap[action]
        })
      });

      if (response.ok) {
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const exportUsers = () => {
    // In a real application, this would generate and download a CSV/Excel file
    const csvContent = [
      ['Name', 'Email', 'Phone', 'City', 'Status', 'KYC Status', 'Total Rentals', 'Total Spent'],
      ...users.map(user => [
        `${user.firstName} ${user.lastName}`,
        user.email,
        user.phone,
        user.city,
        user.status,
        user.kycStatus,
        user.totalRentals.toString(),
        user.totalSpent.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kwick-users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { color: 'bg-green-100 text-green-800', text: getText('Active', 'सक्रिय') },
      suspended: { color: 'bg-yellow-100 text-yellow-800', text: getText('Suspended', 'निलंबित') },
      blocked: { color: 'bg-red-100 text-red-800', text: getText('Blocked', 'अवरुद्ध') },
      pending: { color: 'bg-orange-100 text-orange-800', text: getText('Pending', 'लंबित') },
      approved: { color: 'bg-green-100 text-green-800', text: getText('Approved', 'अनुमोदित') },
      rejected: { color: 'bg-red-100 text-red-800', text: getText('Rejected', 'अस्वीकृत') }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.pending;
    return (
      <Badge className={variant.color}>
        {variant.text}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('User Management', 'उपयोगकर्ता प्रबंधन')}
          </h1>
          <p className="text-gray-600 mt-1">
            {getText('Manage and monitor all KWICK users', 'सभी KWICK उपयोगकर्ताओं का प्रबंधन और निगरानी करें')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={exportUsers}>
            <Download className="h-4 w-4 mr-2" />
            {getText('Export', 'निर्यात')}
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            {getText('Add User', 'उपयोगकर्ता जोड़ें')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            {getText('Filters', 'फ़िल्टर')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="search">{getText('Search', 'खोजें')}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder={getText('Search by name, email...', 'नाम, ईमेल से खोजें...')}
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>{getText('Status', 'स्थिति')}</Label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={getText('All Status', 'सभी स्थितियां')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{getText('All Status', 'सभी स्थितियां')}</SelectItem>
                  <SelectItem value="active">{getText('Active', 'सक्रिय')}</SelectItem>
                  <SelectItem value="suspended">{getText('Suspended', 'निलंबित')}</SelectItem>
                  <SelectItem value="blocked">{getText('Blocked', 'अवरुद्ध')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{getText('KYC Status', 'केवाईसी स्थिति')}</Label>
              <Select value={filters.kycStatus} onValueChange={(value) => handleFilterChange('kycStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={getText('All KYC', 'सभी केवाईसी')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{getText('All KYC', 'सभी केवाईसी')}</SelectItem>
                  <SelectItem value="pending">{getText('Pending', 'लंबित')}</SelectItem>
                  <SelectItem value="approved">{getText('Approved', 'अनुमोदित')}</SelectItem>
                  <SelectItem value="rejected">{getText('Rejected', 'अस्वीकृत')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{getText('City', 'शहर')}</Label>
              <Select value={filters.city} onValueChange={(value) => handleFilterChange('city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={getText('All Cities', 'सभी शहर')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{getText('All Cities', 'सभी शहर')}</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{getText('Date From', 'दिनांक से')}</Label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{getText('Users', 'उपयोगकर्ता')} ({users.length})</CardTitle>
          <CardDescription>
            {getText('Manage user accounts and their status', 'उपयोगकर्���ा खातों और उनकी स्थिति का प्रबंधन करें')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{getText('User', 'उपयोगकर्ता')}</TableHead>
                    <TableHead>{getText('Contact', 'संपर्क')}</TableHead>
                    <TableHead>{getText('Location', 'स्थान')}</TableHead>
                    <TableHead>{getText('Status', 'स्थिति')}</TableHead>
                    <TableHead>{getText('KYC', 'केवाईसी')}</TableHead>
                    <TableHead>{getText('Activity', 'गतिविधि')}</TableHead>
                    <TableHead>{getText('Actions', 'क्रियाएं')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-500">{getText('Member since', 'सदस्य बने')} {formatDate(user.createdAt)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {user.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user.status)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user.kycStatus)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <CreditCard className="h-3 w-3 mr-1 text-gray-400" />
                            {user.totalRentals} {getText('rentals', 'किराया')}
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="h-3 w-3 mr-1 text-yellow-400" />
                            {user.rating.toFixed(1)} {getText('rating', '���ेटिंग')}
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(user.totalSpent)} {getText('spent', 'खर्च')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {user.status === 'active' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction(user.id, 'suspend')}
                            >
                              <Ban className="h-4 w-4 text-yellow-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction(user.id, 'activate')}
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          {user.status !== 'blocked' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction(user.id, 'block')}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              {getText('Showing', 'दिखा रहे हैं')} {((currentPage - 1) * itemsPerPage) + 1} {getText('to', 'से')} {Math.min(currentPage * itemsPerPage, users.length)} {getText('of', 'का')} {users.length} {getText('users', 'उपयोगकर्ता')}
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {getText('Page', 'पृष्ठ')} {currentPage} {getText('of', 'का')} {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {getText('User Details', 'उपयोगकर्ता विवरण')}
            </DialogTitle>
            <DialogDescription>
              {getText('View and manage user information', 'उपयोगकर्ता की जानकारी देखें और प्रबंधित करें')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{getText('First Name', 'प्रथम नाम')}</Label>
                  <Input value={selectedUser.firstName} readOnly />
                </div>
                <div>
                  <Label>{getText('Last Name', 'अंतिम नाम')}</Label>
                  <Input value={selectedUser.lastName} readOnly />
                </div>
                <div>
                  <Label>{getText('Email', 'ईमेल')}</Label>
                  <Input value={selectedUser.email} readOnly />
                </div>
                <div>
                  <Label>{getText('Phone', 'फोन')}</Label>
                  <Input value={selectedUser.phone} readOnly />
                </div>
                <div>
                  <Label>{getText('City', 'शहर')}</Label>
                  <Input value={selectedUser.city} readOnly />
                </div>
                <div>
                  <Label>{getText('Member Since', 'सदस्य बने')}</Label>
                  <Input value={formatDate(selectedUser.createdAt)} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-primary">{selectedUser.totalRentals}</p>
                  <p className="text-sm text-gray-600">{getText('Total Rentals', 'कुल किराया')}</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedUser.totalSpent)}</p>
                  <p className="text-sm text-gray-600">{getText('Total Spent', 'कुल खर्च')}</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-yellow-600">{selectedUser.rating.toFixed(1)}/5.0</p>
                  <p className="text-sm text-gray-600">{getText('Rating', 'रेटिंग')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>{getText('Current Status', 'वर्तमान स्थ��ति')}</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
                <div>
                  <Label>{getText('KYC Status', 'केवाईसी स्थिति')}</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedUser.kycStatus)}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                {selectedUser.status === 'active' ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUserAction(selectedUser.id, 'suspend');
                      setIsEditDialogOpen(false);
                    }}
                  >
                    {getText('Suspend User', 'उपयोगकर्ता को निलंबित करें')}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleUserAction(selectedUser.id, 'activate');
                      setIsEditDialogOpen(false);
                    }}
                  >
                    {getText('Activate User', 'उपयोगकर्ता को ���क्रिय करें')}
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleUserAction(selectedUser.id, 'block');
                    setIsEditDialogOpen(false);
                  }}
                >
                  {getText('Block User', 'उपयोगकर्ता को अवरुद्ध करें')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

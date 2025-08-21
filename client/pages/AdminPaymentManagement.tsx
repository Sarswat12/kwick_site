import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  IndianRupee,
  CreditCard,
  Upload,
  Camera,
  FileText,
  User,
  Calendar,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Check,
  X
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  type: 'rental' | 'security_deposit' | 'fine' | 'refund' | 'manual';
  status: 'completed' | 'pending' | 'failed' | 'verification_required';
  method: 'upi' | 'card' | 'bank_transfer' | 'cash' | 'manual';
  transactionId: string;
  date: string;
  description: string;
  addedBy?: string; // Admin who added the payment
  screenshot?: string; // Payment screenshot URL
  notes?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

export default function AdminPaymentManagement() {
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: 'PAY001',
      userId: 'USR001',
      userName: 'Raj Kumar',
      userEmail: 'raj.kumar@email.com',
      amount: 2000,
      type: 'security_deposit',
      status: 'completed',
      method: 'upi',
      transactionId: 'TXN123456789',
      date: '2024-01-15T10:30:00Z',
      description: 'Security Deposit',
      addedBy: 'System'
    },
    {
      id: 'PAY002',
      userId: 'USR001',
      userName: 'Raj Kumar',
      userEmail: 'raj.kumar@email.com',
      amount: 693,
      type: 'rental',
      status: 'verification_required',
      method: 'manual',
      transactionId: 'MANUAL001',
      date: '2024-01-20T14:30:00Z',
      description: 'Weekly Rental Payment - Screenshot Uploaded',
      screenshot: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      verificationStatus: 'pending'
    }
  ]);

  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // New payment form state
  const [newPayment, setNewPayment] = useState({
    userId: '',
    userName: '',
    amount: '',
    type: 'rental' as const,
    method: 'manual' as const,
    description: '',
    notes: '',
    transactionId: ''
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending', icon: Clock },
      failed: { color: 'bg-red-100 text-red-800', text: 'Failed', icon: XCircle },
      verification_required: { color: 'bg-blue-100 text-blue-800', text: 'Needs Verification', icon: AlertCircle }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.pending;
    const IconComponent = variant.icon;
    
    return (
      <Badge className={variant.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {variant.text}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      rental: { color: 'bg-blue-100 text-blue-800', text: 'Rental' },
      security_deposit: { color: 'bg-purple-100 text-purple-800', text: 'Security' },
      fine: { color: 'bg-red-100 text-red-800', text: 'Fine' },
      refund: { color: 'bg-green-100 text-green-800', text: 'Refund' },
      manual: { color: 'bg-orange-100 text-orange-800', text: 'Manual' }
    };
    
    const variant = variants[type as keyof typeof variants] || variants.manual;
    
    return (
      <Badge className={variant.color}>
        {variant.text}
      </Badge>
    );
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const addManualPayment = () => {
    if (!newPayment.userId || !newPayment.amount) return;

    const payment: PaymentRecord = {
      id: `PAY${Date.now()}`,
      userId: newPayment.userId,
      userName: newPayment.userName || 'Unknown User',
      userEmail: '',
      amount: parseFloat(newPayment.amount),
      type: newPayment.type,
      status: 'completed',
      method: newPayment.method,
      transactionId: newPayment.transactionId || `MANUAL${Date.now()}`,
      date: new Date().toISOString(),
      description: newPayment.description,
      addedBy: 'Admin User',
      notes: newPayment.notes
    };

    setPayments(prev => [payment, ...prev]);
    setShowAddPaymentDialog(false);
    setNewPayment({
      userId: '',
      userName: '',
      amount: '',
      type: 'rental',
      method: 'manual',
      description: '',
      notes: '',
      transactionId: ''
    });
  };

  const verifyPayment = (paymentId: string, status: 'verified' | 'rejected') => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            verificationStatus: status,
            status: status === 'verified' ? 'completed' : 'failed'
          }
        : payment
    ));
  };

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    needsVerification: payments.filter(p => p.status === 'verification_required').length,
    totalAmount: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all user payments and add manual entries</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowAddPaymentDialog(true)}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card className="animate-fade-in">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Payments</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs sm:text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs sm:text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.needsVerification}</div>
            <div className="text-xs sm:text-sm text-gray-600">Need Verification</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in col-span-2 sm:col-span-1" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">₹{stats.totalAmount.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Amount</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="animate-slide-up">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="verification_required">Needs Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="rental">Rental</SelectItem>
                  <SelectItem value="security_deposit">Security Deposit</SelectItem>
                  <SelectItem value="fine">Fine</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="animate-slide-up" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
          <CardDescription>
            All payment transactions including manual entries and user uploads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">User Info</TableHead>
                  <TableHead className="min-w-[100px]">Amount</TableHead>
                  <TableHead className="min-w-[80px]">Type</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Method</TableHead>
                  <TableHead className="min-w-[120px]">Transaction ID</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{payment.userName}</p>
                          <p className="text-xs text-gray-500">{payment.userId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-green-600">
                        ₹{payment.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(payment.type)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {payment.method.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {payment.transactionId}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(payment.date).toLocaleDateString()}
                        <div className="text-xs text-gray-500">
                          {new Date(payment.date).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPayment(payment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payment.screenshot && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(payment.screenshot, '_blank')}
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                        {payment.status === 'verification_required' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => verifyPayment(payment.id, 'verified')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => verifyPayment(payment.id, 'rejected')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Payment Dialog */}
      <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Manual Payment</DialogTitle>
            <DialogDescription>
              Add a payment record on behalf of a user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>User ID *</Label>
                <Input
                  placeholder="e.g., USR001"
                  value={newPayment.userId}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, userId: e.target.value }))}
                />
              </div>
              <div>
                <Label>User Name</Label>
                <Input
                  placeholder="User's full name"
                  value={newPayment.userName}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, userName: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Amount *</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={newPayment.type}
                  onValueChange={(value) => setNewPayment(prev => ({ ...prev, type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rental">Rental</SelectItem>
                    <SelectItem value="security_deposit">Security Deposit</SelectItem>
                    <SelectItem value="fine">Fine</SelectItem>
                    <SelectItem value="refund">Refund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Payment Method</Label>
                <Select
                  value={newPayment.method}
                  onValueChange={(value) => setNewPayment(prev => ({ ...prev, method: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Transaction ID</Label>
                <Input
                  placeholder="Auto-generated if empty"
                  value={newPayment.transactionId}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, transactionId: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label>Description *</Label>
              <Input
                placeholder="Payment description"
                value={newPayment.description}
                onChange={(e) => setNewPayment(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <Label>Notes</Label>
              <Textarea
                placeholder="Additional notes about this payment"
                value={newPayment.notes}
                onChange={(e) => setNewPayment(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={addManualPayment}
                disabled={!newPayment.userId || !newPayment.amount || !newPayment.description}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddPaymentDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent className="max-w-md sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                Complete information for payment {selectedPayment.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Payment ID</Label>
                  <div className="font-medium">{selectedPayment.id}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">User ID</Label>
                  <div className="font-medium">{selectedPayment.userId}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">User Name</Label>
                  <div className="font-medium">{selectedPayment.userName}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Amount</Label>
                  <div className="font-medium text-green-600">₹{selectedPayment.amount.toLocaleString()}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Type</Label>
                  <div>{getTypeBadge(selectedPayment.type)}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Status</Label>
                  <div>{getStatusBadge(selectedPayment.status)}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Method</Label>
                  <div className="font-medium">{selectedPayment.method.toUpperCase()}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Transaction ID</Label>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedPayment.transactionId}</code>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Date</Label>
                  <div className="font-medium">{new Date(selectedPayment.date).toLocaleString()}</div>
                </div>
                {selectedPayment.addedBy && (
                  <div>
                    <Label className="text-sm text-gray-600">Added By</Label>
                    <div className="font-medium">{selectedPayment.addedBy}</div>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm text-gray-600">Description</Label>
                <div className="font-medium">{selectedPayment.description}</div>
              </div>

              {selectedPayment.notes && (
                <div>
                  <Label className="text-sm text-gray-600">Notes</Label>
                  <div className="bg-gray-50 p-3 rounded text-sm">{selectedPayment.notes}</div>
                </div>
              )}

              {selectedPayment.screenshot && (
                <div>
                  <Label className="text-sm text-gray-600">Payment Screenshot</Label>
                  <div className="mt-2">
                    <img 
                      src={selectedPayment.screenshot}
                      alt="Payment screenshot"
                      className="w-full max-w-md rounded border cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(selectedPayment.screenshot, '_blank')}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => window.open(selectedPayment.screenshot, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Full Size
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

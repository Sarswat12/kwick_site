import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Payment {
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

interface PaymentFilters {
  search: string;
  status: string;
  method: string;
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
}

interface PaymentStats {
  totalTransactions: number;
  totalRevenue: number;
  successRate: number;
  avgTransactionValue: number;
  pendingAmount: number;
  failedTransactions: number;
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [filters, setFilters] = useState<PaymentFilters>({
    search: '',
    status: '',
    method: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchPayments();
    calculateStats();
  }, [currentPage, filters]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ''))
      });

      const response = await fetch(`/api/admin/payments?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPayments(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    // In a real app, this would come from the backend
    const mockStats: PaymentStats = {
      totalTransactions: 1250,
      totalRevenue: 2500000,
      successRate: 94.2,
      avgTransactionValue: 2000,
      pendingAmount: 45000,
      failedTransactions: 73
    };
    setStats(mockStats);
  };

  const handleFilterChange = (key: keyof PaymentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePaymentAction = async (paymentId: string, action: 'refund' | 'retry' | 'mark_failed') => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        fetchPayments();
        setIsDetailsDialogOpen(false);
      }
    } catch (error) {
      console.error('Failed to process payment action:', error);
    }
  };

  const exportPayments = () => {
    const csvContent = [
      ['Transaction ID', 'User', 'Amount', 'Method', 'Status', 'Date', 'Fees'],
      ...payments.map(payment => [
        payment.transactionId,
        payment.userName,
        payment.amount.toString(),
        payment.method,
        payment.status,
        new Date(payment.createdAt).toLocaleDateString(),
        payment.fees.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kwick-payments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { color: 'bg-green-100 text-green-800', text: getText('Completed', 'पूर्ण') },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: getText('Pending', 'लंबित') },
      failed: { color: 'bg-red-100 text-red-800', text: getText('Failed', 'असफल') },
      refunded: { color: 'bg-blue-100 text-blue-800', text: getText('Refunded', 'वापस') }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.pending;
    return (
      <Badge className={variant.color}>
        {variant.text}
      </Badge>
    );
  };

  const getMethodIcon = (method: string) => {
    const iconClass = "h-4 w-4";
    switch (method) {
      case 'upi':
        return <Smartphone className={iconClass} />;
      case 'card':
        return <CreditCard className={iconClass} />;
      case 'netbanking':
        return <Building className={iconClass} />;
      case 'wallet':
        return <Wallet className={iconClass} />;
      default:
        return <CreditCard className={iconClass} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('Payment Management', 'भुगतान प्रबंधन')}
          </h1>
          <p className="text-gray-600 mt-1">
            {getText('Monitor and manage all payment transactions', 'सभी भुगतान लेनदेन की निगरानी और प्रबंधन करें')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={exportPayments}>
            <Download className="h-4 w-4 mr-2" />
            {getText('Export', 'निर्यात')}
          </Button>
          <Button onClick={fetchPayments}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {getText('Refresh', 'रीफ्रेश')}
          </Button>
        </div>
      </div>

      {/* Payment Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('Total Revenue', 'कुल राजस्व')}</p>
                  <p className="text-xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('Total Transactions', 'कुल लेनदेन')}</p>
                  <p className="text-xl font-bold">{stats.totalTransactions.toLocaleString()}</p>
                </div>
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('Success Rate', 'सफलता दर')}</p>
                  <p className="text-xl font-bold">{stats.successRate}%</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('Avg Transaction', 'औसत लेनदेन')}</p>
                  <p className="text-xl font-bold">{formatCurrency(stats.avgTransactionValue)}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('Pending Amount', 'लंबित राशि')}</p>
                  <p className="text-xl font-bold">{formatCurrency(stats.pendingAmount)}</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('Failed Txns', 'असफल लेनदेन')}</p>
                  <p className="text-xl font-bold">{stats.failedTransactions}</p>
                </div>
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            {getText('Filters', 'फ़िल्टर')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="search">{getText('Search', 'खोजें')}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder={getText('Transaction ID, User...', 'लेनदेन ID, उपयोगकर्ता...')}
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
                  <SelectItem value="all">{getText('All Status', 'सभी स्थितियां')}</SelectItem>
                  <SelectItem value="completed">{getText('Completed', 'पूर्ण')}</SelectItem>
                  <SelectItem value="pending">{getText('Pending', 'लंबित')}</SelectItem>
                  <SelectItem value="failed">{getText('Failed', 'असफल')}</SelectItem>
                  <SelectItem value="refunded">{getText('Refunded', 'वापस')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{getText('Method', 'विधि')}</Label>
              <Select value={filters.method} onValueChange={(value) => handleFilterChange('method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={getText('All Methods', 'सभी विधियां')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getText('All Methods', 'सभी विधियां')}</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="card">{getText('Card', 'कार्ड')}</SelectItem>
                  <SelectItem value="netbanking">{getText('Net Banking', 'नेट बैंकिंग')}</SelectItem>
                  <SelectItem value="wallet">{getText('Wallet', 'वॉलेट')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{getText('Amount Min', 'न्यूनतम राशि')}</Label>
              <Input
                type="number"
                placeholder="₹ 0"
                value={filters.amountMin}
                onChange={(e) => handleFilterChange('amountMin', e.target.value)}
              />
            </div>

            <div>
              <Label>{getText('Amount Max', 'अधिकतम राशि')}</Label>
              <Input
                type="number"
                placeholder="₹ 10,000"
                value={filters.amountMax}
                onChange={(e) => handleFilterChange('amountMax', e.target.value)}
              />
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

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>{getText('Transactions', 'लेनदेन')} ({payments.length})</CardTitle>
          <CardDescription>
            {getText('All payment transactions in the system', 'सिस्टम में सभी भुगतान लेनदेन')}
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
                    <TableHead>{getText('Transaction', 'लेनदेन')}</TableHead>
                    <TableHead>{getText('User', 'उपयोगकर्ता')}</TableHead>
                    <TableHead>{getText('Amount', 'राशि')}</TableHead>
                    <TableHead>{getText('Method', 'विधि')}</TableHead>
                    <TableHead>{getText('Status', 'स्थिति')}</TableHead>
                    <TableHead>{getText('Date', 'दिनांक')}</TableHead>
                    <TableHead>{getText('Actions', 'क्रियाएं')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.transactionId}</p>
                          <p className="text-sm text-gray-500">{payment.rentalId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.userName}</p>
                          <p className="text-sm text-gray-500">{payment.userId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          {payment.fees > 0 && (
                            <p className="text-sm text-gray-500">
                              {getText('Fee:', 'शुल्क:')} {formatCurrency(payment.fees)}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getMethodIcon(payment.method)}
                          <span className="capitalize">{payment.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{formatDate(payment.createdAt)}</p>
                          {payment.completedAt && (
                            <p className="text-xs text-gray-500">
                              {getText('Completed:', 'पूर्ण:')} {formatDate(payment.completedAt)}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setIsDetailsDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {payment.status === 'completed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePaymentAction(payment.id, 'refund')}
                            >
                              <RotateCcw className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
                          {payment.status === 'failed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePaymentAction(payment.id, 'retry')}
                            >
                              <RefreshCw className="h-4 w-4 text-green-600" />
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
              {getText('Showing', 'दिखा रहे हैं')} {((currentPage - 1) * itemsPerPage) + 1} {getText('to', 'से')} {Math.min(currentPage * itemsPerPage, payments.length)} {getText('of', 'का')} {payments.length} {getText('transactions', 'लेनदेन')}
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

      {/* Payment Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {getText('Payment Details', 'भुगतान विवरण')}
            </DialogTitle>
            <DialogDescription>
              {getText('View and manage payment transaction', 'भुगतान लेनदेन देखें और प्रबंधित करें')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{getText('Transaction ID', 'लेनदेन ID')}</Label>
                  <Input value={selectedPayment.transactionId} readOnly />
                </div>
                <div>
                  <Label>{getText('Rental ID', 'किराया ID')}</Label>
                  <Input value={selectedPayment.rentalId} readOnly />
                </div>
                <div>
                  <Label>{getText('User Name', 'उपयोगकर्ता नाम')}</Label>
                  <Input value={selectedPayment.userName} readOnly />
                </div>
                <div>
                  <Label>{getText('User ID', 'उपयोगकर्ता ID')}</Label>
                  <Input value={selectedPayment.userId} readOnly />
                </div>
                <div>
                  <Label>{getText('Amount', 'राशि')}</Label>
                  <Input value={formatCurrency(selectedPayment.amount)} readOnly />
                </div>
                <div>
                  <Label>{getText('Method', 'विधि')}</Label>
                  <Input value={selectedPayment.method.toUpperCase()} readOnly />
                </div>
                <div>
                  <Label>{getText('Status', 'स्थिति')}</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedPayment.status)}
                  </div>
                </div>
                <div>
                  <Label>{getText('Processing Fee', 'प्रसंस्करण शुल्क')}</Label>
                  <Input value={formatCurrency(selectedPayment.fees)} readOnly />
                </div>
                <div>
                  <Label>{getText('Created At', 'बनाया गया')}</Label>
                  <Input value={formatDate(selectedPayment.createdAt)} readOnly />
                </div>
                {selectedPayment.completedAt && (
                  <div>
                    <Label>{getText('Completed At', 'पूर्ण हुआ')}</Label>
                    <Input value={formatDate(selectedPayment.completedAt)} readOnly />
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                {selectedPayment.status === 'completed' && (
                  <Button
                    variant="outline"
                    onClick={() => handlePaymentAction(selectedPayment.id, 'refund')}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {getText('Process Refund', 'रिफंड प्रक्रिया')}
                  </Button>
                )}
                {selectedPayment.status === 'failed' && (
                  <Button
                    onClick={() => handlePaymentAction(selectedPayment.id, 'retry')}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {getText('Retry Payment', 'भुगतान पुनः प्रयास')}
                  </Button>
                )}
                {selectedPayment.status === 'pending' && (
                  <Button
                    variant="destructive"
                    onClick={() => handlePaymentAction(selectedPayment.id, 'mark_failed')}
                  >
                    {getText('Mark as Failed', 'असफल के रूप में चिह्नित करें')}
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

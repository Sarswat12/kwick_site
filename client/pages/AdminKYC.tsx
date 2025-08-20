import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileCheck,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  ExternalLink
} from 'lucide-react';

interface KYCDocument {
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

interface KYCApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: KYCDocument[];
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

interface KYCFilters {
  search: string;
  status: string;
  documentType: string;
  dateFrom: string;
  dateTo: string;
}

export default function AdminKYC() {
  const [applications, setApplications] = useState<KYCApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<KYCFilters>({
    search: '',
    status: '',
    documentType: '',
    dateFrom: '',
    dateTo: ''
  });
  const [selectedApplication, setSelectedApplication] = useState<KYCApplication | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchKYCApplications();
  }, [currentPage, filters]);

  const fetchKYCApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ''))
      });

      const response = await fetch(`/api/admin/kyc?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch KYC applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof KYCFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleReviewSubmit = async () => {
    if (!selectedApplication || !reviewAction) return;

    try {
      const token = localStorage.getItem('adminToken');
      const requestData: any = {
        status: reviewAction === 'approve' ? 'approved' : 'rejected',
        notes: reviewNotes
      };

      if (reviewAction === 'reject' && rejectionReason) {
        requestData.rejectionReason = rejectionReason;
      }

      const response = await fetch(`/api/admin/kyc/${selectedApplication.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        fetchKYCApplications();
        setIsReviewDialogOpen(false);
        setReviewAction(null);
        setReviewNotes('');
        setRejectionReason('');
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error('Failed to update KYC application:', error);
    }
  };

  const exportKYCData = () => {
    const csvContent = [
      ['Application ID', 'User Name', 'Email', 'Phone', 'Status', 'Submitted Date', 'Reviewed Date'],
      ...applications.map(app => [
        app.id,
        app.userName,
        app.userEmail,
        app.userPhone,
        app.status,
        new Date(app.submittedAt).toLocaleDateString(),
        app.reviewedAt ? new Date(app.reviewedAt).toLocaleDateString() : ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kwick-kyc-applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: getText('Pending', 'लंबित'), icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', text: getText('Approved', 'अनुमोदित'), icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', text: getText('Rejected', 'अस्वीकृत'), icon: XCircle }
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

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      driving_license: getText('Driving License', 'ड्राइविंग लाइसेंस'),
      aadhaar: getText('Aadhaar Card', 'आधार कार्ड'),
      address_proof: getText('Address Proof', 'पता प्रमाण')
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  const getKYCStats = () => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'pending').length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    
    return { total, pending, approved, rejected };
  };

  const stats = getKYCStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('KYC Management', 'केवाईसी प्रबंधन')}
          </h1>
          <p className="text-gray-600 mt-1">
            {getText('Review and manage user identity verification', 'उपयोगकर्ता पहचान सत्यापन की समीक्षा और प्रबंधन करें')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={exportKYCData}>
            <Download className="h-4 w-4 mr-2" />
            {getText('Export', 'निर्यात')}
          </Button>
          <Button onClick={fetchKYCApplications}>
            <FileCheck className="h-4 w-4 mr-2" />
            {getText('Refresh', 'रीफ्रेश')}
          </Button>
        </div>
      </div>

      {/* KYC Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Total Applications', 'कुल आवेदन')}</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileCheck className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Pending Review', 'लंबित समीक्षा')}</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Approved', 'अनुमोदित')}</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Rejected', 'अस्वीकृत')}</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">{getText('Search', 'खोजें')}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder={getText('Name, email, phone...', 'नाम, ईमेल, फोन...')}
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
                  <SelectItem value="all">{getText('All Status', 'सभी स्थि��ियां')}</SelectItem>
                  <SelectItem value="pending">{getText('Pending', 'लंबित')}</SelectItem>
                  <SelectItem value="approved">{getText('Approved', 'अनुमोदित')}</SelectItem>
                  <SelectItem value="rejected">{getText('Rejected', 'अस्वीकृत')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{getText('Document Type', 'दस्तावेज़ प्रकार')}</Label>
              <Select value={filters.documentType} onValueChange={(value) => handleFilterChange('documentType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={getText('All Documents', 'सभी दस्तावेज़')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getText('All Documents', 'सभी दस्तावेज़')}</SelectItem>
                  <SelectItem value="driving_license">{getText('Driving License', 'ड्राइविंग लाइसेंस')}</SelectItem>
                  <SelectItem value="aadhaar">{getText('Aadhaar Card', 'आधार कार्ड')}</SelectItem>
                  <SelectItem value="address_proof">{getText('Address Proof', 'पता प्रमाण')}</SelectItem>
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

            <div>
              <Label>{getText('Date To', 'दिनांक तक')}</Label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYC Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>{getText('KYC Applications', 'केवाईसी आवेदन')} ({applications.length})</CardTitle>
          <CardDescription>
            {getText('Review user identity verification documents', 'उपयोगकर्ता पहचान सत्यापन दस्तावेजों की समीक्षा करें')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{getText('Applicant', 'आवेदक')}</TableHead>
                    <TableHead>{getText('Contact', 'संपर्क')}</TableHead>
                    <TableHead>{getText('Documents', 'दस्तावेज़')}</TableHead>
                    <TableHead>{getText('Status', 'स्थिति')}</TableHead>
                    <TableHead>{getText('Submitted', 'जमा किया गया')}</TableHead>
                    <TableHead>{getText('Review Date', 'समीक्षा तिथि')}</TableHead>
                    <TableHead>{getText('Actions', 'क्रियाएं')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{application.userName}</p>
                            <p className="text-sm text-gray-500">ID: {application.userId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {application.userEmail}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {application.userPhone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {application.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span>{getDocumentTypeLabel(doc.type)}</span>
                              {getStatusBadge(doc.status)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{formatDate(application.submittedAt)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {application.reviewedAt ? (
                            <div>
                              <div>{formatDate(application.reviewedAt)}</div>
                              {application.reviewedBy && (
                                <div className="text-xs text-gray-500">
                                  {getText('by', 'द्वारा')} {application.reviewedBy}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setIsReviewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {application.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setReviewAction('approve');
                                  setIsReviewDialogOpen(true);
                                }}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setReviewAction('reject');
                                  setIsReviewDialogOpen(true);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
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
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              {getText('Showing', 'दिखा रहे हैं')} {((currentPage - 1) * itemsPerPage) + 1} {getText('to', 'से')} {Math.min(currentPage * itemsPerPage, applications.length)} {getText('of', 'का')} {applications.length} {getText('applications', 'आवेदन')}
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

      {/* KYC Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {reviewAction ? 
                getText(`${reviewAction === 'approve' ? 'Approve' : 'Reject'} KYC Application`, 
                       `केवाईसी आवेदन ${reviewAction === 'approve' ? 'अनुमोदित' : 'अस्वीकार'} करें`) :
                getText('Review KYC Application', 'केवाईसी आवेदन की समीक्षा करें')
              }
            </DialogTitle>
            <DialogDescription>
              {getText('Review user documents and approve or reject the application', 
                      'उपयोगकर्ता दस्तावेजों की समीक्षा करें और आवेदन को अनुमोदित या अस्वीकार करें')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{getText('User Information', 'उपयोगकर्ता जानकारी')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{getText('Name', 'नाम')}</Label>
                      <Input value={selectedApplication.userName} readOnly />
                    </div>
                    <div>
                      <Label>{getText('Email', 'ईमेल')}</Label>
                      <Input value={selectedApplication.userEmail} readOnly />
                    </div>
                    <div>
                      <Label>{getText('Phone', 'फोन')}</Label>
                      <Input value={selectedApplication.userPhone} readOnly />
                    </div>
                    <div>
                      <Label>{getText('Application ID', 'आवेदन ID')}</Label>
                      <Input value={selectedApplication.id} readOnly />
                    </div>
                    <div>
                      <Label>{getText('Current Status', 'वर्तमान स्थिति')}</Label>
                      <div className="mt-1">
                        {getStatusBadge(selectedApplication.status)}
                      </div>
                    </div>
                    <div>
                      <Label>{getText('Submitted Date', 'जमा करने की तारीख')}</Label>
                      <Input value={formatDate(selectedApplication.submittedAt)} readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{getText('Submitted Documents', 'जमा किए गए दस्तावेज़')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">{getText('All', 'सभी')}</TabsTrigger>
                      <TabsTrigger value="driving_license">{getText('License', 'लाइसेंस')}</TabsTrigger>
                      <TabsTrigger value="aadhaar">{getText('Aadhaar', 'आधार')}</TabsTrigger>
                      <TabsTrigger value="address_proof">{getText('Address', 'पता')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {selectedApplication.documents.map((doc, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <div>
                                <h4 className="font-medium">{getDocumentTypeLabel(doc.type)}</h4>
                                <p className="text-sm text-gray-500">
                                  {getText('Submitted:', 'जमा किया गया:')} {formatDate(doc.submittedAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(doc.status)}
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                {getText('View', 'देखें')}
                              </Button>
                            </div>
                          </div>
                          
                          {doc.status === 'rejected' && doc.rejectionReason && (
                            <div className="bg-red-50 border border-red-200 rounded p-3">
                              <p className="text-sm text-red-800">
                                <strong>{getText('Rejection Reason:', 'अस्वीकृति कारण:')}</strong> {doc.rejectionReason}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </TabsContent>

                    {['driving_license', 'aadhaar', 'address_proof'].map(docType => (
                      <TabsContent key={docType} value={docType} className="space-y-4">
                        {selectedApplication.documents
                          .filter(doc => doc.type === docType)
                          .map((doc, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-5 w-5 text-gray-500" />
                                  <div>
                                    <h4 className="font-medium">{getDocumentTypeLabel(doc.type)}</h4>
                                    <p className="text-sm text-gray-500">
                                      {getText('Submitted:', 'जमा कि���ा गया:')} {formatDate(doc.submittedAt)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getStatusBadge(doc.status)}
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    {getText('View', 'देखें')}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 rounded p-3">
                                <img 
                                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                  alt={`${doc.type} document`}
                                  className="w-full max-w-md mx-auto rounded"
                                />
                              </div>
                            </div>
                          ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Review Actions */}
              {reviewAction && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {reviewAction === 'approve' ? 
                        getText('Approve Application', 'आवेदन अनुमोदित करें') :
                        getText('Reject Application', 'आवेदन अस्वीकार करें')
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviewAction === 'reject' && (
                      <div>
                        <Label htmlFor="rejectionReason">
                          {getText('Rejection Reason *', 'अस्वीकृति कारण *')}
                        </Label>
                        <Select value={rejectionReason} onValueChange={setRejectionReason}>
                          <SelectTrigger>
                            <SelectValue placeholder={getText('Select reason', 'कारण चुनें')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document_unclear">{getText('Document unclear/blurry', 'दस्तावेज़ अस्पष्ट/धुंधला')}</SelectItem>
                            <SelectItem value="document_expired">{getText('Document expired', 'दस्तावेज़ समाप्त')}</SelectItem>
                            <SelectItem value="document_invalid">{getText('Invalid document', 'अमान्य दस्तावेज़')}</SelectItem>
                            <SelectItem value="information_mismatch">{getText('Information mismatch', 'जानकारी मेल नहीं खाती')}</SelectItem>
                            <SelectItem value="incomplete_documents">{getText('Incomplete documents', 'अधूरे दस्तावेज़')}</SelectItem>
                            <SelectItem value="other">{getText('Other', 'अन्य')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="reviewNotes">
                        {getText('Review Notes', 'समीक्षा टिप्पणी')} {reviewAction === 'reject' ? '*' : getText('(Optional)', '(वैकल्पिक)')}
                      </Label>
                      <Textarea
                        id="reviewNotes"
                        placeholder={getText('Add any additional comments...', 'कोई अतिरिक्त टिप्प��ी जोड़ें...')}
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={handleReviewSubmit}
                        className={reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                        disabled={reviewAction === 'reject' && (!rejectionReason || !reviewNotes)}
                      >
                        {reviewAction === 'approve' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {getText('Approve Application', 'आवेदन अनुमोदित करें')}
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 mr-2" />
                            {getText('Reject Application', 'आवेदन अस्वीकार करें')}
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setReviewAction(null);
                          setReviewNotes('');
                          setRejectionReason('');
                        }}
                      >
                        {getText('Cancel', 'रद्द करें')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Previous Review Information */}
              {selectedApplication.reviewedAt && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{getText('Previous Review', 'पिछली समीक्षा')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{getText('Reviewed by:', 'द्वारा समीक्षित:')}</span>
                        <span className="font-medium">{selectedApplication.reviewedBy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{getText('Review date:', 'समीक्षा तिथि:')}</span>
                        <span className="font-medium">{formatDate(selectedApplication.reviewedAt)}</span>
                      </div>
                      {selectedApplication.notes && (
                        <div className="mt-3">
                          <span className="text-sm text-gray-600">{getText('Notes:', 'टिप्पणी:')}</span>
                          <div className="mt-1 p-3 bg-gray-50 rounded">
                            <p className="text-sm">{selectedApplication.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

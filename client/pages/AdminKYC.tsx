import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  FileCheck, 
  AlertCircle,
  Download,
  Upload,
  Edit,
  Trash2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  CreditCard,
  Home,
  Car,
  Image,
  FileText,
  Zap,
  Shield,
  Check,
  X,
  RotateCcw,
  ExternalLink,
  Star,
  RefreshCw
} from 'lucide-react';

interface KYCUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected' | 'incomplete';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  documents: KYCDocument[];
}

interface KYCDocument {
  id: string;
  type: 'aadhaar' | 'address_proof' | 'pan_card' | 'driving_license';
  name: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  rejectionReason?: string;
  verified?: boolean;
}

export default function AdminKYC() {
  const [selectedUser, setSelectedUser] = useState<KYCUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [rejectionReason, setRejectionReason] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [documentToReject, setDocumentToReject] = useState<KYCDocument | null>(null);

  // Mock data for KYC users
  const [kycUsers, setKycUsers] = useState<KYCUser[]>([
    {
      id: 'USR001',
      name: 'Raj Kumar',
      email: 'raj.kumar@email.com',
      phone: '+91 98765 43210',
      status: 'pending',
      submittedAt: '2024-01-20T10:30:00Z',
      documents: [
        {
          id: 'DOC001',
          type: 'aadhaar',
          name: 'Aadhaar Card',
          url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'pending',
          uploadedAt: '2024-01-20T10:30:00Z'
        },
        {
          id: 'DOC002',
          type: 'address_proof',
          name: 'Utility Bill',
          url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'pending',
          uploadedAt: '2024-01-20T10:35:00Z'
        },
        {
          id: 'DOC003',
          type: 'pan_card',
          name: 'PAN Card',
          url: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'pending',
          uploadedAt: '2024-01-20T10:40:00Z'
        },
        {
          id: 'DOC004',
          type: 'driving_license',
          name: 'Driving License',
          url: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'pending',
          uploadedAt: '2024-01-20T10:45:00Z'
        }
      ]
    },
    {
      id: 'USR002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43211',
      status: 'incomplete',
      submittedAt: '2024-01-19T14:20:00Z',
      documents: [
        {
          id: 'DOC005',
          type: 'aadhaar',
          name: 'Aadhaar Card',
          url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'approved',
          uploadedAt: '2024-01-19T14:20:00Z',
          verified: true
        },
        {
          id: 'DOC006',
          type: 'address_proof',
          name: 'Bank Statement',
          url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'rejected',
          uploadedAt: '2024-01-19T14:25:00Z',
          rejectionReason: 'Document is unclear and unreadable'
        }
      ]
    },
    {
      id: 'USR003',
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      phone: '+91 98765 43212',
      status: 'approved',
      submittedAt: '2024-01-18T11:45:00Z',
      reviewedAt: '2024-01-18T16:30:00Z',
      reviewedBy: 'Admin User',
      documents: [
        {
          id: 'DOC007',
          type: 'aadhaar',
          name: 'Aadhaar Card',
          url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'approved',
          uploadedAt: '2024-01-18T11:45:00Z',
          verified: true
        },
        {
          id: 'DOC008',
          type: 'driving_license',
          name: 'Driving License',
          url: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          status: 'approved',
          uploadedAt: '2024-01-18T11:50:00Z',
          verified: true
        }
      ]
    }
  ]);

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: getText('Pending', 'लंबित'), icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', text: getText('Approved', 'अनुमोदित'), icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', text: getText('Rejected', 'अस्वीकृत'), icon: XCircle },
      incomplete: { color: 'bg-orange-100 text-orange-800', text: getText('Incomplete', 'अधूरा'), icon: AlertCircle }
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

  const getDocumentIcon = (type: string) => {
    const icons = {
      aadhaar: CreditCard,
      address_proof: Home,
      pan_card: FileText,
      driving_license: Car
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const getDocumentName = (type: string) => {
    const names = {
      aadhaar: getText('Aadhaar Card', 'आधार कार्ड'),
      address_proof: getText('Address Proof', 'पता प्रमाण'),
      pan_card: getText('PAN Card', 'पैन कार्ड'),
      driving_license: getText('Driving License', 'ड्राइविंग लाइसेंस')
    };
    return names[type as keyof typeof names] || type;
  };

  const filteredUsers = kycUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: kycUsers.length,
    pending: kycUsers.filter(u => u.status === 'pending').length,
    approved: kycUsers.filter(u => u.status === 'approved').length,
    rejected: kycUsers.filter(u => u.status === 'rejected').length,
    incomplete: kycUsers.filter(u => u.status === 'incomplete').length
  };

  const approveDocument = (userId: string, documentId: string) => {
    setKycUsers(prev => prev.map(user => 
      user.id === userId 
        ? {
            ...user,
            documents: user.documents.map(doc => 
              doc.id === documentId 
                ? { ...doc, status: 'approved' as const, verified: true }
                : doc
            )
          }
        : user
    ));
  };

  const rejectDocument = (userId: string, documentId: string, reason: string) => {
    setKycUsers(prev => prev.map(user => 
      user.id === userId 
        ? {
            ...user,
            documents: user.documents.map(doc => 
              doc.id === documentId 
                ? { ...doc, status: 'rejected' as const, rejectionReason: reason }
                : doc
            )
          }
        : user
    ));
  };

  const approveAllDocuments = (userId: string) => {
    setKycUsers(prev => prev.map(user => 
      user.id === userId 
        ? {
            ...user,
            status: 'approved' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Admin User',
            documents: user.documents.map(doc => ({ 
              ...doc, 
              status: 'approved' as const,
              verified: true 
            }))
          }
        : user
    ));
    setSelectedUser(null);
  };

  const handleDocumentReject = () => {
    if (documentToReject && selectedUser && rejectionReason) {
      rejectDocument(selectedUser.id, documentToReject.id, rejectionReason);
      setShowRejectDialog(false);
      setDocumentToReject(null);
      setRejectionReason('');
      // Update selected user
      const updatedUser = kycUsers.find(u => u.id === selectedUser.id);
      if (updatedUser) setSelectedUser(updatedUser);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('KYC Management', 'केवाईसी प्रबंधन')}
          </h1>
          <p className="text-gray-600 mt-1">
            {getText('Review and verify user identity documents', 'उपयोगकर्ता पहचान दस्तावेजों की समीक्षा और सत्यापन करें')}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}>
            {language === 'en' ? 'हिंदी' : 'English'}
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            {getText('Export', 'निर्यात')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">{getText('Total Applications', 'कुल आवेदन')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">{getText('Pending', 'लंबित')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">{getText('Approved', 'अनुमोदित')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">{getText('Rejected', 'अस्वीकृत')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.incomplete}</div>
            <div className="text-sm text-gray-600">{getText('Incomplete', 'अधूरा')}</div>
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
                {getText('Filters', 'फ़िल्टर')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={getText('Search users...', 'उपयोगकर्ता खोजें...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div>
                <Label>{getText('Status', 'स्थिति')}</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{getText('All Status', 'सभी स्थितियां')}</SelectItem>
                    <SelectItem value="pending">{getText('Pending', 'लंबित')}</SelectItem>
                    <SelectItem value="approved">{getText('Approved', 'अनुमोदित')}</SelectItem>
                    <SelectItem value="rejected">{getText('Rejected', 'अस्वीकृत')}</SelectItem>
                    <SelectItem value="incomplete">{getText('Incomplete', 'अधूरा')}</SelectItem>
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
                    {getStatusBadge(user.status)}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{getText('Submitted:', 'जमा किया:')} {new Date(user.submittedAt).toLocaleDateString()}</span>
                    <span>{user.documents.length} {getText('docs', 'दस्तावेज़')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side - Document Verification */}
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
                      <CardDescription>
                        {getText('KYC Application ID:', 'केवाईसी आवेदन ID:')} {selectedUser.id}
                      </CardDescription>
                    </div>
                    {getStatusBadge(selectedUser.status)}
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
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{getText('Submitted:', 'जमा किया:')} {new Date(selectedUser.submittedAt).toLocaleDateString()}</span>
                    </div>
                    {selectedUser.reviewedAt && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{getText('Reviewed:', 'समीक्षित:')} {new Date(selectedUser.reviewedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileCheck className="h-5 w-5 mr-2" />
                      {getText('Submitted Documents', 'जमा किए गए दस्तावेज़')}
                    </span>
                    {selectedUser.documents.every(doc => doc.status === 'approved') && (
                      <Button
                        onClick={() => approveAllDocuments(selectedUser.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {getText('Approve All & Complete KYC', 'सभी को अनुमोदित करें और केवाईसी पूरा करें')}
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {getText('Review each document carefully before approval', 'अनुमोदन से पहले प्रत्येक दस्तावेज़ की सावधानीपूर्वक समीक्षा करें')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedUser.documents.map((document) => (
                      <div key={document.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getDocumentIcon(document.type)}
                            <div>
                              <h4 className="font-medium text-sm">{getDocumentName(document.type)}</h4>
                              <p className="text-xs text-gray-500">
                                {getText('Uploaded:', 'अपलोड किया गया:')} {new Date(document.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(document.status)}
                        </div>

                        {/* Document Image */}
                        <div className="relative">
                          <img 
                            src={document.url}
                            alt={`${document.type} document`}
                            className="w-full h-48 object-cover rounded border"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 bg-white/90"
                            onClick={() => window.open(document.url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {getText('View', 'देखें')}
                          </Button>
                        </div>

                        {/* Rejection Reason */}
                        {document.status === 'rejected' && document.rejectionReason && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <p className="text-sm text-red-800">
                              <strong>{getText('Rejection Reason:', 'अस्वी���ृति कारण:')}</strong> {document.rejectionReason}
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        {document.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => approveDocument(selectedUser.id, document.id)}
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              {getText('Approve', 'अनुमोदित करें')}
                            </Button>
                            <Button
                              onClick={() => {
                                setDocumentToReject(document);
                                setShowRejectDialog(true);
                              }}
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                            >
                              <X className="h-3 w-3 mr-1" />
                              {getText('Reject', 'अस्वीकार करें')}
                            </Button>
                          </div>
                        )}

                        {document.status === 'approved' && (
                          <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
                            <p className="text-sm text-green-800 font-medium">
                              ✅ {getText('Verified & Approved', 'सत्यापित और अनुमोदित')}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bulk Actions */}
              {selectedUser.status === 'pending' && (
                <Card>
                  <CardHeader>
                    <CardTitle>{getText('Bulk Actions', 'बल्क एक्शन')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => {
                          // Approve all pending documents
                          selectedUser.documents.forEach(doc => {
                            if (doc.status === 'pending') {
                              approveDocument(selectedUser.id, doc.id);
                            }
                          });
                          setTimeout(() => approveAllDocuments(selectedUser.id), 500);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {getText('Approve All Documents', 'सभी दस्तावेज़ अनुमोदित करें')}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setKycUsers(prev => prev.map(user => 
                            user.id === selectedUser.id 
                              ? { ...user, status: 'rejected' as const }
                              : user
                          ));
                          setSelectedUser(null);
                        }}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        {getText('Reject Application', 'आवेदन अस���वीकार करें')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <FileCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {getText('Select a User', 'एक उपयोगकर्ता चुनें')}
                </h3>
                <p className="text-gray-600">
                  {getText('Choose a user from the list to review their KYC documents', 'उनके केवाईसी दस्तावेजों की समीक्षा के लिए सूची से एक उपयोगकर्ता चुनें')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getText('Reject Document', 'दस्तावेज़ अस्वीकार करें')}</DialogTitle>
            <DialogDescription>
              {getText('Please provide a reason for rejecting this document', 'कृपया इस दस्तावेज़ को अस्वीकार करने का कारण बताएं')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{getText('Rejection Reason', 'अस्वीकृति कारण')}</Label>
              <Select value={rejectionReason} onValueChange={setRejectionReason}>
                <SelectTrigger>
                  <SelectValue placeholder={getText('Select reason', 'कारण चुनें')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unclear">{getText('Document is unclear/blurry', 'दस्तावेज़ अस्पष्ट/धुंधला है')}</SelectItem>
                  <SelectItem value="expired">{getText('Document has expired', 'दस्तावेज़ की अवधि समाप्त हो गई है')}</SelectItem>
                  <SelectItem value="invalid">{getText('Invalid document', 'अमान्य दस्तावेज़')}</SelectItem>
                  <SelectItem value="mismatch">{getText('Information does not match', 'जानकारी मेल नहीं खाती')}</SelectItem>
                  <SelectItem value="other">{getText('Other reason', 'अन्य कारण')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {rejectionReason === 'other' && (
              <div>
                <Label>{getText('Custom Reason', 'कस्टम कारण')}</Label>
                <Textarea
                  placeholder={getText('Please specify the reason...', 'कृपया कारण बताएं...')}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button
                onClick={handleDocumentReject}
                variant="destructive"
                disabled={!rejectionReason}
              >
                {getText('Reject Document', 'दस्तावेज़ अस्वीकार करें')}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectDialog(false);
                  setDocumentToReject(null);
                  setRejectionReason('');
                  setReviewNotes('');
                }}
              >
                {getText('Cancel', 'रद्द करें')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

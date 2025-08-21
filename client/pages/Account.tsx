import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  FileCheck, 
  CreditCard, 
  History, 
  Settings,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Edit,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Download,
  Eye,
  Star,
  Zap,
  Camera,
  Upload,
  Image,
  FileCheck
} from 'lucide-react';

export default function Account() {
  const [kycStatus, setKycStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isEditing, setIsEditing] = useState(false);
  const [showPaymentUpload, setShowPaymentUpload] = useState(false);
  const [uploadedScreenshot, setUploadedScreenshot] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Andheri East, Mumbai - 400069',
    emergencyContact: '+91 99999 88888'
  });

  const kycDocuments = [
    {
      type: 'Driving License',
      status: 'approved' as const,
      uploadedAt: '2024-01-15',
      file: 'driving_license.pdf'
    },
    {
      type: 'Aadhaar Card',
      status: 'approved' as const,
      uploadedAt: '2024-01-15',
      file: 'aadhaar_card.pdf'
    },
    {
      type: 'Address Proof',
      status: 'pending' as const,
      uploadedAt: '2024-01-16',
      file: 'address_proof.pdf'
    }
  ];

  const rentalHistory = [
    {
      id: 'RNT001',
      vehicle: 'KWICK Elite',
      startDate: '2024-01-10',
      endDate: '2024-01-17',
      duration: '7 days',
      amount: '₹693',
      status: 'completed'
    },
    {
      id: 'RNT002',
      vehicle: 'KWICK Elite',
      startDate: '2024-01-20',
      endDate: 'ongoing',
      duration: '5 days',
      amount: '₹495',
      status: 'active'
    }
  ];

  const paymentHistory = [
    {
      id: 'PAY001',
      date: '2024-01-17',
      description: 'Weekly Rental - KWICK Elite',
      amount: '₹693',
      status: 'success',
      method: 'UPI'
    },
    {
      id: 'PAY002',
      date: '2024-01-20',
      description: 'Weekly Rental - KWICK Elite',
      amount: '₹495',
      status: 'success',
      method: 'Credit Card'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // Handle profile update logic
    console.log('Profile updated:', profileData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Camera className="h-3 w-3 text-white" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2" />
                  {profileData.email}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-green-100 text-green-800">
                    <Zap className="h-3 w-3 mr-1" />
                    Active Rider
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    4.9 Rating
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* KYC Status Alert */}
        <div className="mb-8">
          {kycStatus === 'pending' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-yellow-800">
                    KYC Verification in Progress
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your documents are being reviewed. This usually takes 2-4 hours. 
                    You'll receive an email once approved.
                  </p>
                </div>
                <Link to="#kyc">
                  <Button size="sm" variant="outline" className="border-yellow-300">
                    View Status
                  </Button>
                </Link>
              </div>
            </div>
          )}
          {kycStatus === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-3" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">
                    KYC Verification Failed
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    Some of your documents need to be resubmitted. Please check the KYC section for details.
                  </p>
                </div>
                <Link to="#kyc">
                  <Button size="sm" variant="outline" className="border-red-300">
                    Fix Issues
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="kyc" className="flex items-center space-x-2">
              <FileCheck className="h-4 w-4" />
              <span>KYC</span>
            </TabsTrigger>
            <TabsTrigger value="rentals" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>Rentals</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Payments</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleProfileUpdate} className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* KYC Tab */}
          <TabsContent value="kyc">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>KYC Verification Status</CardTitle>
                  <CardDescription>
                    Track the status of your identity verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(kycStatus)}
                      <div>
                        <h3 className="font-medium">
                          {kycStatus === 'approved' ? 'Verification Complete' : 
                           kycStatus === 'pending' ? 'Under Review' : 'Action Required'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {kycStatus === 'approved' ? 'All documents verified successfully' :
                           kycStatus === 'pending' ? 'Documents are being reviewed' :
                           'Some documents need to be resubmitted'}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(kycStatus)}
                  </div>
                  
                  <Progress 
                    value={kycStatus === 'approved' ? 100 : kycStatus === 'pending' ? 75 : 25} 
                    className="mb-6"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>
                    Upload the following documents for verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kycDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <h4 className="font-medium">{doc.type}</h4>
                            <p className="text-sm text-gray-600">
                              Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(doc.status)}
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            {doc.status === 'rejected' && (
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                <Upload className="h-3 w-3 mr-1" />
                                Reupload
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rentals Tab */}
          <TabsContent value="rentals">
            <Card>
              <CardHeader>
                <CardTitle>Rental History</CardTitle>
                <CardDescription>
                  View all your past and current rentals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentalHistory.map((rental, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{rental.vehicle}</h4>
                          <p className="text-sm text-gray-600">
                            {rental.startDate} - {rental.endDate} • {rental.duration}
                          </p>
                          <p className="text-sm text-gray-600">Booking ID: {rental.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{rental.amount}</div>
                        {getStatusBadge(rental.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  View all your payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{payment.description}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(payment.date).toLocaleDateString()} • {payment.method}
                          </p>
                          <p className="text-sm text-gray-600">Transaction ID: {payment.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{payment.amount}</div>
                        {getStatusBadge(payment.status)}
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates about your bookings</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Get SMS alerts for important updates</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-600">Delete Account</h4>
                        <p className="text-sm text-gray-600">Permanently delete your KWICK account</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

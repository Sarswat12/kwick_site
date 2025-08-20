import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  CreditCard, 
  Truck, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Activity,
  Clock,
  MapPin,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeRentals: number;
  totalRevenue: number;
  totalVehicles: number;
  userGrowth: number;
  revenueGrowth: number;
  vehicleUtilization: number;
  customerSatisfaction: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'payment' | 'kyc_approval' | 'vehicle_booking';
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'user_registration',
      description: 'New user registered: Raj Patel (Mumbai)',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'payment',
      description: 'Payment completed: ₹599 - Weekly Rental',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: '3',
      type: 'kyc_approval',
      description: 'KYC approved for Priya Sharma',
      time: '10 minutes ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'vehicle_booking',
      description: 'Vehicle KA01AB1234 booked in Bangalore',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      id: '5',
      type: 'payment',
      description: 'Payment failed: ₹299 - Daily Rental',
      time: '20 minutes ago',
      status: 'error'
    }
  ];

  const getActivityIcon = (type: string, status: string) => {
    const iconClass = `h-4 w-4 ${
      status === 'success' ? 'text-green-600' : 
      status === 'warning' ? 'text-yellow-600' : 'text-red-600'
    }`;

    switch (type) {
      case 'user_registration':
        return <Users className={iconClass} />;
      case 'payment':
        return <CreditCard className={iconClass} />;
      case 'kyc_approval':
        return <CheckCircle className={iconClass} />;
      case 'vehicle_booking':
        return <Truck className={iconClass} />;
      default:
        return <Activity className={iconClass} />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {getText('Dashboard', 'डैशबोर्ड')}
        </h1>
        <p className="text-gray-600 mt-1">
          {getText(
            'Welcome to KWICK Admin Portal. Here\'s what\'s happening today.',
            'KWICK एडमिन पोर्टल में आपका स्वागत है। आज यह हो रहा है।'
          )}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getText('Total Users', 'कुल उपयोगकर्ता')}
                </p>
                <p className="text-2xl font-bold">{formatNumber(stats.totalUsers)}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.userGrowth > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm ${stats.userGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.userGrowth > 0 ? '+' : ''}{stats.userGrowth}%
              </span>
              <span className="text-sm text-gray-600 ml-1">
                {getText('from last month', 'पिछले महीने से')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getText('Total Revenue', 'कुल राजस्व')}
                </p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.revenueGrowth > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm ${stats.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.revenueGrowth > 0 ? '+' : ''}{stats.revenueGrowth}%
              </span>
              <span className="text-sm text-gray-600 ml-1">
                {getText('from last month', 'पिछले महीने से')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getText('Active Rentals', 'सक्रिय किराया')}
                </p>
                <p className="text-2xl font-bold">{formatNumber(stats.activeRentals)}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">
                {getText('Out of', 'कुल')} {formatNumber(stats.totalVehicles)} {getText('vehicles', 'वाहन')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getText('Vehicle Utilization', 'वाहन उपयोग')}
                </p>
                <p className="text-2xl font-bold">{stats.vehicleUtilization}%</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={stats.vehicleUtilization} className="h-2" />
              <span className="text-sm text-gray-600 mt-1 block">
                {getText('Fleet efficiency', 'फ्लीट दक्षता')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{getText('Recent Activity', 'हाल की गतिविधि')}</CardTitle>
            <CardDescription>
              {getText('Latest system activities and events', 'नवीनतम सिस्टम गतिविधियां और घटनाएं')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === 'success' ? 'default' : 'destructive'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{getText('System Health', 'सिस्टम स्वास्थ्य')}</CardTitle>
            <CardDescription>
              {getText('Current system status', 'वर्तमान सिस्टम स्थिति')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{getText('API Status', 'API स्थिति')}</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {getText('Healthy', 'स्वस्थ')}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{getText('Database', 'डेटाबेस')}</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {getText('Online', 'ऑनलाइन')}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">{getText('Payment Gateway', 'भुगतान गेटवे')}</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {getText('Slow', 'धीमा')}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{getText('IoT Devices', 'IoT उपकरण')}</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  95% {getText('Online', 'ऑनलाइन')}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{getText('Customer Satisfaction', 'ग्राहक संतुष्टि')}</span>
                <span className="font-semibold">{stats.customerSatisfaction}/5.0</span>
              </div>
              <Progress value={(stats.customerSatisfaction / 5) * 100} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{getText('Quick Actions', 'त्वरित क्रियाएं')}</CardTitle>
          <CardDescription>
            {getText('Common administrative tasks', 'सामान्य प्रशासनिक कार्य')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium">{getText('Add New User', 'नया उपयोगकर्ता जोड़ें')}</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Truck className="h-6 w-6 text-green-600 mb-2" />
              <p className="text-sm font-medium">{getText('Add Vehicle', 'वाहन जोड़ें')}</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <MapPin className="h-6 w-6 text-orange-600 mb-2" />
              <p className="text-sm font-medium">{getText('Fleet Map', 'फ्लीट मैप')}</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Zap className="h-6 w-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium">{getText('IoT Dashboard', 'IoT डैशबोर्ड')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

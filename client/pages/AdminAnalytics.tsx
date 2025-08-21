import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Car, 
  IndianRupee, 
  Battery, 
  Zap,
  MapPin,
  Calendar,
  Download,
  RefreshCw,
  Target,
  Award,
  Clock,
  Star,
  Globe,
  Smartphone,
  CreditCard,
  DollarSign,
  PieChart,
  LineChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MousePointer
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    total: number;
    monthly: number;
    growth: number;
    trend: 'up' | 'down';
  };
  users: {
    total: number;
    active: number;
    new: number;
    growth: number;
    trend: 'up' | 'down';
  };
  vehicles: {
    total: number;
    active: number;
    utilization: number;
    maintenance: number;
  };
  rides: {
    total: number;
    daily: number;
    avgDistance: number;
    completion: number;
  };
  battery: {
    totalSwaps: number;
    dailySwaps: number;
    avgSwapTime: number;
    stationUtilization: number;
  };
  kyc: {
    pending: number;
    approved: number;
    rejected: number;
    avgProcessingTime: number;
  };
}

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    revenue: {
      total: 2847650,
      monthly: 485620,
      growth: 23.5,
      trend: 'up'
    },
    users: {
      total: 1847,
      active: 1256,
      new: 156,
      growth: 18.2,
      trend: 'up'
    },
    vehicles: {
      total: 89,
      active: 76,
      utilization: 85.4,
      maintenance: 8
    },
    rides: {
      total: 15672,
      daily: 287,
      avgDistance: 12.8,
      completion: 94.6
    },
    battery: {
      totalSwaps: 8945,
      dailySwaps: 164,
      avgSwapTime: 28,
      stationUtilization: 78.3
    },
    kyc: {
      pending: 23,
      approved: 1456,
      rejected: 89,
      avgProcessingTime: 3.2
    }
  };

  const revenueData = [
    { month: 'Jan', revenue: 385000, users: 1200 },
    { month: 'Feb', revenue: 425000, users: 1350 },
    { month: 'Mar', revenue: 465000, users: 1480 },
    { month: 'Apr', revenue: 485000, users: 1620 },
    { month: 'May', revenue: 520000, users: 1750 },
    { month: 'Jun', revenue: 485620, users: 1847 }
  ];

  const topCities = [
    { city: 'Noida', users: 892, revenue: 1456000, growth: 25.3 },
    { city: 'Gurgaon', users: 456, revenue: 784000, growth: 18.7 },
    { city: 'Delhi', users: 234, revenue: 425000, growth: 12.4 },
    { city: 'Ghaziabad', users: 156, revenue: 298000, growth: 15.8 },
    { city: 'Faridabad', users: 109, revenue: 187000, growth: 8.9 }
  ];

  const vehicleUtilization = [
    { vehicle: 'KWICK Elite', count: 45, utilization: 87.3, revenue: 1250000 },
    { vehicle: 'KWICK Pro', count: 32, utilization: 82.1, revenue: 890000 },
    { vehicle: 'KWICK Lite', count: 12, utilization: 91.2, revenue: 340000 }
  ];

  const batteryStations = [
    { station: 'Sector 112 Hub', swaps: 1245, uptime: 98.5, utilization: 85.6 },
    { station: 'Metro Station', swaps: 987, uptime: 96.2, utilization: 78.3 },
    { station: 'DLF Mall', swaps: 834, uptime: 99.1, utilization: 82.1 },
    { station: 'Business District', swaps: 672, uptime: 97.8, utilization: 71.4 },
    { station: 'Hospital Complex', swaps: 456, uptime: 95.6, utilization: 64.2 }
  ];

  const userDemographics = [
    { age: '18-25', percentage: 35, count: 646 },
    { age: '26-35', percentage: 45, count: 831 },
    { age: '36-45', percentage: 15, count: 277 },
    { age: '46-55', percentage: 4, count: 74 },
    { age: '55+', percentage: 1, count: 19 }
  ];

  const paymentMethods = [
    { method: 'UPI', percentage: 52, amount: 1480577 },
    { method: 'Credit Card', percentage: 28, amount: 797342 },
    { method: 'Debit Card', percentage: 15, amount: 427148 },
    { method: 'Bank Transfer', percentage: 3, amount: 85431 },
    { method: 'Wallet', percentage: 2, amount: 57152 }
  ];

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return '₹0';
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getGrowthBadge = (growth: number, trend: 'up' | 'down') => {
    const color = trend === 'up' ? 'text-green-600' : 'text-red-600';
    const Icon = trend === 'up' ? TrendingUp : TrendingDown;
    
    return (
      <div className={`flex items-center ${color}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span className="font-medium">{Math.abs(growth)}%</span>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(analyticsData.revenue.total)}</p>
                <div className="mt-2">
                  {getGrowthBadge(analyticsData.revenue.growth, analyticsData.revenue.trend)}
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-2xl font-bold">{analyticsData.users.active.toLocaleString()}</p>
                <div className="mt-2">
                  {getGrowthBadge(analyticsData.users.growth, analyticsData.users.trend)}
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vehicle Utilization</p>
                <p className="text-2xl font-bold">{analyticsData.vehicles.utilization}%</p>
                <div className="mt-2 text-sm text-gray-600">
                  {analyticsData.vehicles.active}/{analyticsData.vehicles.total} active
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Battery Swaps</p>
                <p className="text-2xl font-bold">{analyticsData.battery.totalSwaps.toLocaleString()}</p>
                <div className="mt-2 text-sm text-gray-600">
                  {analyticsData.battery.dailySwaps} today
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Battery className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="battery">Battery</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue and user growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{data.users} users</span>
                        <span className="font-semibold">{formatCurrency(data.revenue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Cities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Top Cities
                </CardTitle>
                <CardDescription>Cities by user count and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCities.map((city, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{city.city}</span>
                        <div className="text-sm text-gray-600">{city.users} users</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(city.revenue)}</div>
                        <div className="text-sm text-green-600">+{city.growth}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-blue-600">{analyticsData.rides.completion}%</div>
                <div className="text-xs text-gray-600">Ride Completion</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-green-600">{analyticsData.battery.avgSwapTime}s</div>
                <div className="text-xs text-gray-600">Avg Swap Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-purple-600">{analyticsData.rides.avgDistance}km</div>
                <div className="text-xs text-gray-600">Avg Distance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-orange-600">{analyticsData.kyc.avgProcessingTime}h</div>
                <div className="text-xs text-gray-600">KYC Processing</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-red-600">{analyticsData.vehicles.maintenance}</div>
                <div className="text-xs text-gray-600">In Maintenance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-yellow-600">{analyticsData.kyc.pending}</div>
                <div className="text-xs text-gray-600">KYC Pending</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by source and payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Rental Fees</span>
                    <span className="font-bold text-green-600">{formatCurrency(2156340)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Security Deposits</span>
                    <span className="font-bold text-blue-600">{formatCurrency(456000)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="font-medium">Late Fees</span>
                    <span className="font-bold text-yellow-600">{formatCurrency(28340)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium">Other Charges</span>
                    <span className="font-bold text-purple-600">{formatCurrency(12970)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{method.method}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{method.percentage}%</div>
                        <div className="text-sm text-gray-600">{formatCurrency(method.amount)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Goals vs Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">₹5,00,000</div>
                  <div className="text-sm text-gray-600">Monthly Goal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹4,85,620</div>
                  <div className="text-sm text-gray-600">Current Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">97.1%</div>
                  <div className="text-sm text-gray-600">Achievement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age distribution of users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userDemographics.map((demo, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{demo.age}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div 
                            className="h-2 bg-primary rounded" 
                            style={{ width: `${demo.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{demo.percentage}%</span>
                        <span className="text-sm text-gray-600">({demo.count})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>User engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Daily Active Users</span>
                    <span className="font-bold">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weekly Active Users</span>
                    <span className="font-bold">1,456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Active Users</span>
                    <span className="font-bold">1,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Session Duration</span>
                    <span className="font-bold">24 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User Retention (30d)</span>
                    <span className="font-bold">73.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Growth Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analyticsData.users.new}</div>
                  <div className="text-sm text-gray-600">New This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89.2%</div>
                  <div className="text-sm text-gray-600">KYC Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.7</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">68%</div>
                  <div className="text-sm text-gray-600">With Active Rentals</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Fleet Analytics</CardTitle>
              <CardDescription>Performance metrics by vehicle type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicleUtilization.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{vehicle.vehicle}</h4>
                        <p className="text-sm text-gray-600">{vehicle.count} vehicles</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{vehicle.utilization}% utilization</div>
                      <div className="text-sm text-gray-600">{formatCurrency(vehicle.revenue)} revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600">{analyticsData.vehicles.utilization}%</div>
                <div className="text-sm text-gray-600 mt-1">Average Utilization</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">12.8km</div>
                <div className="text-sm text-gray-600 mt-1">Avg Distance/Day</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">94.6%</div>
                <div className="text-sm text-gray-600 mt-1">Uptime</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Battery Tab */}
        <TabsContent value="battery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Battery Swap Stations</CardTitle>
              <CardDescription>Performance metrics by station</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {batteryStations.map((station, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Battery className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{station.station}</h4>
                        <p className="text-sm text-gray-600">{station.swaps} swaps this month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{station.utilization}% utilization</div>
                      <div className="text-sm text-green-600">{station.uptime}% uptime</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600">{analyticsData.battery.totalSwaps.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Total Swaps</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{analyticsData.battery.avgSwapTime}s</div>
                <div className="text-sm text-gray-600 mt-1">Avg Swap Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{analyticsData.battery.stationUtilization}%</div>
                <div className="text-sm text-gray-600 mt-1">Station Utilization</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">98.2%</div>
                <div className="text-sm text-gray-600 mt-1">Network Uptime</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  KYC Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Review</span>
                    <Badge className="bg-yellow-100 text-yellow-800">{analyticsData.kyc.pending}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved This Month</span>
                    <Badge className="bg-green-100 text-green-800">{analyticsData.kyc.approved}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rejected</span>
                    <Badge className="bg-red-100 text-red-800">{analyticsData.kyc.rejected}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Processing Time</span>
                    <span className="font-medium">{analyticsData.kyc.avgProcessingTime} hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                  Support Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Open Tickets</span>
                    <Badge className="bg-red-100 text-red-800">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Resolved Today</span>
                    <Badge className="bg-green-100 text-green-800">8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Response Time</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Customer Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Operational Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">94.6%</div>
                  <div className="text-sm text-gray-600">Ride Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.7/5</div>
                  <div className="text-sm text-gray-600">Avg User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">99.1%</div>
                  <div className="text-sm text-gray-600">Payment Success</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

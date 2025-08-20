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
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  Filter,
  MapPin,
  Battery,
  Truck,
  Settings,
  Eye,
  Edit,
  Plus,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Navigation,
  Wrench,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Radio,
  Wifi,
  WifiOff
} from 'lucide-react';

interface Vehicle {
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
  currentRental?: {
    userId: string;
    userName: string;
    startTime: string;
  };
}

interface IoTDevice {
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
  sensors: {
    temperature: number;
    vibration: number;
    speed: number;
  };
}

interface FleetFilters {
  search: string;
  status: string;
  condition: string;
  batteryMin: string;
  location: string;
}

export default function AdminFleet() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [iotDevices, setIoTDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('fleet');
  const [filters, setFilters] = useState<FleetFilters>({
    search: '',
    status: '',
    condition: '',
    batteryMin: '',
    location: ''
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchFleetData();
    fetchIoTDevices();
  }, [currentPage, filters]);

  const fetchFleetData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ''))
      });

      const response = await fetch(`/api/admin/vehicles?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVehicles(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIoTDevices = async () => {
    try {
      // Mock IoT devices data - in production this would come from IoT platform API
      const mockDevices: IoTDevice[] = vehicles.map((vehicle, index) => ({
        id: `iot-${index + 1}`,
        vehicleId: vehicle.id,
        deviceType: 'GPS_TRACKER_V2',
        status: Math.random() > 0.1 ? 'online' : Math.random() > 0.5 ? 'offline' : 'error',
        lastHeartbeat: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        batteryLevel: Math.floor(Math.random() * 100),
        signalStrength: Math.floor(Math.random() * 100),
        firmware: `v2.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
        location: vehicle.location,
        sensors: {
          temperature: Math.floor(Math.random() * 30) + 20,
          vibration: Math.random() * 10,
          speed: Math.floor(Math.random() * 60)
        }
      }));
      setIoTDevices(mockDevices);
    } catch (error) {
      console.error('Failed to fetch IoT devices:', error);
    }
  };

  const handleFilterChange = (key: keyof FleetFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleVehicleAction = async (vehicleId: string, action: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/vehicles/${vehicleId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        fetchFleetData();
        setIsDetailsDialogOpen(false);
      }
    } catch (error) {
      console.error('Failed to update vehicle:', error);
    }
  };

  const exportFleetData = () => {
    const csvContent = [
      ['Vehicle ID', 'Name', 'License Plate', 'Status', 'Battery Level', 'Location', 'Condition', 'Total KMs'],
      ...vehicles.map(vehicle => [
        vehicle.id,
        vehicle.name,
        vehicle.licensePlate,
        vehicle.status,
        vehicle.batteryLevel.toString(),
        vehicle.location.address,
        vehicle.condition,
        vehicle.totalKms.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kwick-fleet-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      available: { color: 'bg-green-100 text-green-800', text: getText('Available', 'उपलब्ध'), icon: CheckCircle },
      rented: { color: 'bg-blue-100 text-blue-800', text: getText('Rented', 'किराये पर'), icon: Clock },
      maintenance: { color: 'bg-yellow-100 text-yellow-800', text: getText('Maintenance', 'रखरखाव'), icon: Wrench },
      offline: { color: 'bg-red-100 text-red-800', text: getText('Offline', 'ऑफलाइन'), icon: AlertTriangle }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.offline;
    const IconComponent = variant.icon;
    
    return (
      <Badge className={variant.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {variant.text}
      </Badge>
    );
  };

  const getConditionBadge = (condition: string) => {
    const variants = {
      excellent: { color: 'bg-green-100 text-green-800', text: getText('Excellent', 'उत्कृष्ट') },
      good: { color: 'bg-blue-100 text-blue-800', text: getText('Good', 'अच्छा') },
      fair: { color: 'bg-yellow-100 text-yellow-800', text: getText('Fair', 'ठीक') },
      poor: { color: 'bg-red-100 text-red-800', text: getText('Poor', 'खराब') }
    };
    
    const variant = variants[condition as keyof typeof variants] || variants.fair;
    return (
      <Badge className={variant.color}>
        {variant.text}
      </Badge>
    );
  };

  const getIoTStatusBadge = (status: string) => {
    const variants = {
      online: { color: 'bg-green-100 text-green-800', text: getText('Online', 'ऑनलाइन'), icon: Wifi },
      offline: { color: 'bg-gray-100 text-gray-800', text: getText('Offline', 'ऑफलाइन'), icon: WifiOff },
      error: { color: 'bg-red-100 text-red-800', text: getText('Error', 'त्रुटि'), icon: AlertTriangle }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.offline;
    const IconComponent = variant.icon;
    
    return (
      <Badge className={variant.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {variant.text}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  const getFleetStats = () => {
    const total = vehicles.length;
    const available = vehicles.filter(v => v.status === 'available').length;
    const rented = vehicles.filter(v => v.status === 'rented').length;
    const maintenance = vehicles.filter(v => v.status === 'maintenance').length;
    const offline = vehicles.filter(v => v.status === 'offline').length;
    const avgBattery = vehicles.reduce((sum, v) => sum + v.batteryLevel, 0) / total || 0;
    const utilization = ((rented / total) * 100) || 0;

    return { total, available, rented, maintenance, offline, avgBattery, utilization };
  };

  const getIoTStats = () => {
    const total = iotDevices.length;
    const online = iotDevices.filter(d => d.status === 'online').length;
    const offline = iotDevices.filter(d => d.status === 'offline').length;
    const error = iotDevices.filter(d => d.status === 'error').length;
    const avgSignal = iotDevices.reduce((sum, d) => sum + d.signalStrength, 0) / total || 0;

    return { total, online, offline, error, avgSignal };
  };

  const fleetStats = getFleetStats();
  const iotStats = getIoTStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('Fleet Management', 'फ्लीट प्रबंधन')}
          </h1>
          <p className="text-gray-600 mt-1">
            {getText('Monitor and manage your EV fleet and IoT devices', 'अपने EV फ्लीट और IoT उपकरणों की निगरानी और प्रबंधन करें')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={exportFleetData}>
            <Download className="h-4 w-4 mr-2" />
            {getText('Export', 'निर्यात')}
          </Button>
          <Button onClick={fetchFleetData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {getText('Refresh', 'रीफ्रेश')}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {getText('Add Vehicle', 'वाहन जोड़ें')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Total Fleet', 'कुल फ्लीट')}</p>
                <p className="text-2xl font-bold">{fleetStats.total}</p>
              </div>
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Available', 'उपलब्ध')}</p>
                <p className="text-2xl font-bold text-green-600">{fleetStats.available}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('In Use', 'उपयोग में')}</p>
                <p className="text-2xl font-bold text-blue-600">{fleetStats.rented}</p>
              </div>
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Utilization', 'उपयोग दर')}</p>
                <p className="text-2xl font-bold">{fleetStats.utilization.toFixed(1)}%</p>
              </div>
              <Navigation className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Avg Battery', 'औसत बैटरी')}</p>
                <p className="text-2xl font-bold">{fleetStats.avgBattery.toFixed(0)}%</p>
              </div>
              <Battery className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('IoT Online', 'IoT ऑनलाइन')}</p>
                <p className="text-2xl font-bold text-green-600">{iotStats.online}</p>
              </div>
              <Zap className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Fleet and IoT */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fleet">{getText('Fleet Overview', 'फ्लीट अवलोकन')}</TabsTrigger>
          <TabsTrigger value="iot">{getText('IoT Devices', 'IoT उपकरण')}</TabsTrigger>
          <TabsTrigger value="map">{getText('Live Map', 'लाइव मैप')}</TabsTrigger>
        </TabsList>

        {/* Fleet Overview Tab */}
        <TabsContent value="fleet" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                {getText('Fleet Filters', 'फ्लीट फ़िल्टर')}
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
                      placeholder={getText('Vehicle name, plate...', 'वाहन नाम, प्लेट...')}
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
                      <SelectItem value="available">{getText('Available', 'उपलब्ध')}</SelectItem>
                      <SelectItem value="rented">{getText('Rented', 'किराये पर')}</SelectItem>
                      <SelectItem value="maintenance">{getText('Maintenance', 'रखरखाव')}</SelectItem>
                      <SelectItem value="offline">{getText('Offline', 'ऑफलाइन')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{getText('Condition', 'स्थिति')}</Label>
                  <Select value={filters.condition} onValueChange={(value) => handleFilterChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={getText('All Conditions', 'सभी स्थितियां')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{getText('All Conditions', 'सभी स्थितियां')}</SelectItem>
                      <SelectItem value="excellent">{getText('Excellent', 'उत्कृष्ट')}</SelectItem>
                      <SelectItem value="good">{getText('Good', 'अच्छा')}</SelectItem>
                      <SelectItem value="fair">{getText('Fair', 'ठीक')}</SelectItem>
                      <SelectItem value="poor">{getText('Poor', 'खराब')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{getText('Min Battery %', 'न्यूनतम बैटरी %')}</Label>
                  <Input
                    type="number"
                    placeholder="0-100"
                    value={filters.batteryMin}
                    onChange={(e) => handleFilterChange('batteryMin', e.target.value)}
                  />
                </div>

                <div>
                  <Label>{getText('Location', 'स्थान')}</Label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={getText('All Locations', 'सभी स्थान')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{getText('All Locations', 'सभी स्थान')}</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fleet Table */}
          <Card>
            <CardHeader>
              <CardTitle>{getText('Fleet Vehicles', 'फ्लीट वाहन')} ({vehicles.length})</CardTitle>
              <CardDescription>
                {getText('Manage your electric vehicle fleet', 'अपने इलेक्ट्रिक वाहन फ्लीट का प्रबंधन करें')}
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
                        <TableHead>{getText('Vehicle', 'वाहन')}</TableHead>
                        <TableHead>{getText('Status', 'स्थिति')}</TableHead>
                        <TableHead>{getText('Battery', 'बैटरी')}</TableHead>
                        <TableHead>{getText('Location', 'स्थान')}</TableHead>
                        <TableHead>{getText('Condition', 'स्थिति')}</TableHead>
                        <TableHead>{getText('Usage', 'उपयोग')}</TableHead>
                        <TableHead>{getText('Actions', 'क्रियाएं')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Truck className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{vehicle.name}</p>
                                <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                                <p className="text-xs text-gray-400">{vehicle.model}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(vehicle.status)}
                            {vehicle.currentRental && (
                              <div className="text-xs text-gray-500 mt-1">
                                {getText('Rented by:', 'द्वारा किराए पर:')} {vehicle.currentRental.userName}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Battery className={`h-4 w-4 ${vehicle.batteryLevel > 50 ? 'text-green-600' : vehicle.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'}`} />
                                <span className="font-medium">{vehicle.batteryLevel}%</span>
                              </div>
                              <Progress value={vehicle.batteryLevel} className="h-2 w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1 text-sm">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="truncate max-w-32">{vehicle.location.address}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getConditionBadge(vehicle.condition)}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{vehicle.totalKms.toLocaleString()} km</div>
                              <div className="text-xs text-gray-500">
                                {getText('Last service:', 'अंतिम सेवा:')} {formatDate(vehicle.lastMaintenance).split(',')[0]}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedVehicle(vehicle);
                                  setIsDetailsDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVehicleAction(vehicle.id, 'edit')}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVehicleAction(vehicle.id, 'maintenance')}
                              >
                                <Wrench className="h-4 w-4" />
                              </Button>
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
                  {getText('Showing', 'दिखा रहे हैं')} {((currentPage - 1) * itemsPerPage) + 1} {getText('to', 'से')} {Math.min(currentPage * itemsPerPage, vehicles.length)} {getText('of', 'का')} {vehicles.length} {getText('vehicles', 'वाहन')}
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
        </TabsContent>

        {/* IoT Devices Tab */}
        <TabsContent value="iot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{getText('IoT Device Status', 'IoT उपकरण स्थिति')}</CardTitle>
              <CardDescription>
                {getText('Monitor connected IoT devices and sensors', 'कनेक्टेड IoT उपकरणों और सेंसर की निगरानी करें')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{getText('Device', 'उपकरण')}</TableHead>
                      <TableHead>{getText('Vehicle', 'वाहन')}</TableHead>
                      <TableHead>{getText('Status', 'स्थिति')}</TableHead>
                      <TableHead>{getText('Signal', 'सिग्नल')}</TableHead>
                      <TableHead>{getText('Battery', 'बैटरी')}</TableHead>
                      <TableHead>{getText('Sensors', 'सेंसर')}</TableHead>
                      <TableHead>{getText('Last Seen', 'अंतिम देखा गया')}</TableHead>
                      <TableHead>{getText('Actions', 'क्रियाएं')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {iotDevices.map((device) => {
                      const vehicle = vehicles.find(v => v.id === device.vehicleId);
                      return (
                        <TableRow key={device.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Radio className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{device.id}</p>
                                <p className="text-sm text-gray-500">{device.deviceType}</p>
                                <p className="text-xs text-gray-400">v{device.firmware}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {vehicle ? (
                              <div>
                                <p className="font-medium">{vehicle.name}</p>
                                <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {getIoTStatusBadge(device.status)}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{device.signalStrength}%</span>
                              </div>
                              <Progress value={device.signalStrength} className="h-2 w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Battery className={`h-4 w-4 ${device.batteryLevel > 50 ? 'text-green-600' : device.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'}`} />
                                <span className="font-medium">{device.batteryLevel}%</span>
                              </div>
                              <Progress value={device.batteryLevel} className="h-2 w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm space-y-1">
                              <div>{getText('Temp:', 'तापमान:')} {device.sensors.temperature}°C</div>
                              <div>{getText('Vibration:', 'कंपन:')} {device.sensors.vibration.toFixed(1)}</div>
                              <div>{getText('Speed:', 'गति:')} {device.sensors.speed} km/h</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(device.lastHeartbeat)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedDevice(device);
                                  setIsDetailsDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(`/admin/iot/${device.id}`, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Map Tab */}
        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{getText('Live Fleet Map', 'लाइव फ्लीट मैप')}</CardTitle>
              <CardDescription>
                {getText('Real-time location tracking of all vehicles', 'सभी वाहनों की वास्तविक समय स्थान ट्रैकिंग')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {getText('Interactive Fleet Map', 'इंटरैक्टिव फ्लीट मैप')}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {getText('Integrate with Google Maps or Mapbox for live tracking', 'लाइव ट्रैकिंग के लिए Google Maps या Mapbox के साथ एकीकृत करें')}
                  </p>
                  <Button>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {getText('Open Full Map', 'पूरा मैप खोलें')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Vehicle/Device Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedVehicle ? 
                getText('Vehicle Details', 'वाहन विवरण') :
                getText('IoT Device Details', 'IoT उपकरण विवरण')
              }
            </DialogTitle>
            <DialogDescription>
              {selectedVehicle ? 
                getText('Detailed information about the selected vehicle', 'चयनित वाहन के बारे में विस्तृत जानकारी') :
                getText('Detailed information about the selected IoT device', 'चयनित IoT उपकरण के बारे में विस्तृत जानकारी')
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedVehicle && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{getText('Vehicle Name', 'वाहन नाम')}</Label>
                  <Input value={selectedVehicle.name} readOnly />
                </div>
                <div>
                  <Label>{getText('License Plate', 'लाइसेंस प्लेट')}</Label>
                  <Input value={selectedVehicle.licensePlate} readOnly />
                </div>
                <div>
                  <Label>{getText('Model', 'मॉडल')}</Label>
                  <Input value={selectedVehicle.model} readOnly />
                </div>
                <div>
                  <Label>{getText('Status', 'स्थिति')}</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedVehicle.status)}
                  </div>
                </div>
                <div>
                  <Label>{getText('Battery Level', 'बैटरी स्तर')}</Label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{selectedVehicle.batteryLevel}%</span>
                    </div>
                    <Progress value={selectedVehicle.batteryLevel} className="h-2" />
                  </div>
                </div>
                <div>
                  <Label>{getText('Condition', 'स्थिति')}</Label>
                  <div className="mt-1">
                    {getConditionBadge(selectedVehicle.condition)}
                  </div>
                </div>
                <div>
                  <Label>{getText('Total Distance', 'कुल दूरी')}</Label>
                  <Input value={`${selectedVehicle.totalKms.toLocaleString()} km`} readOnly />
                </div>
                <div>
                  <Label>{getText('Last Maintenance', 'अंतिम रखरखाव')}</Label>
                  <Input value={formatDate(selectedVehicle.lastMaintenance)} readOnly />
                </div>
                <div className="col-span-2">
                  <Label>{getText('Current Location', 'वर्तमान स्थान')}</Label>
                  <Input value={selectedVehicle.location.address} readOnly />
                </div>
              </div>

              {selectedVehicle.currentRental && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{getText('Current Rental', 'वर्तमान किराया')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{getText('Rented By', 'द्वारा किराए पर लिया गया')}</Label>
                        <Input value={selectedVehicle.currentRental.userName} readOnly />
                      </div>
                      <div>
                        <Label>{getText('Start Time', 'शुरुआत का समय')}</Label>
                        <Input value={formatDate(selectedVehicle.currentRental.startTime)} readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex space-x-3">
                <Button onClick={() => handleVehicleAction(selectedVehicle.id, 'maintenance')}>
                  <Wrench className="h-4 w-4 mr-2" />
                  {getText('Schedule Maintenance', 'रखरखाव शेड्यूल करें')}
                </Button>
                <Button variant="outline" onClick={() => window.open(`/admin/vehicles/${selectedVehicle.id}/map`, '_blank')}>
                  <MapPin className="h-4 w-4 mr-2" />
                  {getText('View on Map', 'मैप पर देखें')}
                </Button>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {getText('IoT Dashboard', 'IoT डैशबोर्ड')}
                </Button>
              </div>
            </div>
          )}

          {selectedDevice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{getText('Device ID', 'उपकरण ID')}</Label>
                  <Input value={selectedDevice.id} readOnly />
                </div>
                <div>
                  <Label>{getText('Device Type', 'उपकरण प्रकार')}</Label>
                  <Input value={selectedDevice.deviceType} readOnly />
                </div>
                <div>
                  <Label>{getText('Status', 'स्थिति')}</Label>
                  <div className="mt-1">
                    {getIoTStatusBadge(selectedDevice.status)}
                  </div>
                </div>
                <div>
                  <Label>{getText('Firmware Version', 'फर्मवेयर संस्करण')}</Label>
                  <Input value={selectedDevice.firmware} readOnly />
                </div>
                <div>
                  <Label>{getText('Signal Strength', 'सिग्नल शक्ति')}</Label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{selectedDevice.signalStrength}%</span>
                    </div>
                    <Progress value={selectedDevice.signalStrength} className="h-2" />
                  </div>
                </div>
                <div>
                  <Label>{getText('Device Battery', 'उपकरण बैटरी')}</Label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">{selectedDevice.batteryLevel}%</span>
                    </div>
                    <Progress value={selectedDevice.batteryLevel} className="h-2" />
                  </div>
                </div>
                <div>
                  <Label>{getText('Last Heartbeat', 'अंतिम हार्टबीट')}</Label>
                  <Input value={formatDate(selectedDevice.lastHeartbeat)} readOnly />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{getText('Sensor Data', 'सेंसर डेटा')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded">
                      <p className="text-2xl font-bold text-blue-600">{selectedDevice.sensors.temperature}°C</p>
                      <p className="text-sm text-gray-600">{getText('Temperature', 'तापमान')}</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <p className="text-2xl font-bold text-purple-600">{selectedDevice.sensors.vibration.toFixed(1)}</p>
                      <p className="text-sm text-gray-600">{getText('Vibration', 'कंपन')}</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <p className="text-2xl font-bold text-green-600">{selectedDevice.sensors.speed} km/h</p>
                      <p className="text-sm text-gray-600">{getText('Speed', 'गति')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

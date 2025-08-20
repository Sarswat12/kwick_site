import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Battery, 
  Clock, 
  Phone, 
  Star,
  Search,
  Filter,
  Route,
  Zap,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Navigation2,
  Timer,
  Users,
  Smartphone,
  Car
} from 'lucide-react';

interface BatteryStation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'maintenance';
  availableBatteries: number;
  totalSlots: number;
  rating: number;
  reviews: number;
  distance: number;
  estimatedTime: number;
  operatingHours: string;
  phone: string;
  amenities: string[];
  lastUpdated: string;
}

export default function BatteryMap() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedStation, setSelectedStation] = useState<BatteryStation | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'available'>('all');

  // Mock battery stations data (in real app, this would come from API)
  const batteryStations: BatteryStation[] = [
    {
      id: 'station-1',
      name: 'KWICK Hub - Sector 112',
      address: 'Sector 112, Noida, Uttar Pradesh 201301',
      lat: 28.5881,
      lng: 77.3470,
      status: 'online',
      availableBatteries: 8,
      totalSlots: 12,
      rating: 4.8,
      reviews: 156,
      distance: 0.5,
      estimatedTime: 2,
      operatingHours: '24/7',
      phone: '+91 98765 43210',
      amenities: ['Fast Swap', 'Parking', 'Restroom', 'Cafe'],
      lastUpdated: '2 mins ago'
    },
    {
      id: 'station-2',
      name: 'KWICK Express - Metro Station',
      address: 'Sector 101 Metro Station, Noida',
      lat: 28.5672,
      lng: 77.3567,
      status: 'online',
      availableBatteries: 5,
      totalSlots: 10,
      rating: 4.6,
      reviews: 89,
      distance: 2.1,
      estimatedTime: 8,
      operatingHours: '6:00 AM - 11:00 PM',
      phone: '+91 98765 43211',
      amenities: ['Fast Swap', 'Parking', 'ATM'],
      lastUpdated: '5 mins ago'
    },
    {
      id: 'station-3',
      name: 'KWICK Point - Shopping Mall',
      address: 'DLF Mall of India, Sector 18, Noida',
      lat: 28.5706,
      lng: 77.3272,
      status: 'online',
      availableBatteries: 12,
      totalSlots: 15,
      rating: 4.9,
      reviews: 234,
      distance: 3.2,
      estimatedTime: 12,
      operatingHours: '10:00 AM - 10:00 PM',
      phone: '+91 98765 43212',
      amenities: ['Fast Swap', 'Parking', 'Food Court', 'Shopping'],
      lastUpdated: '1 min ago'
    },
    {
      id: 'station-4',
      name: 'KWICK Stop - Business District',
      address: 'Sector 62, Noida Corporate Hub',
      lat: 28.6215,
      lng: 77.3710,
      status: 'maintenance',
      availableBatteries: 0,
      totalSlots: 8,
      rating: 4.5,
      reviews: 67,
      distance: 4.8,
      estimatedTime: 18,
      operatingHours: '8:00 AM - 8:00 PM',
      phone: '+91 98765 43213',
      amenities: ['Fast Swap', 'Parking'],
      lastUpdated: '30 mins ago'
    },
    {
      id: 'station-5',
      name: 'KWICK Station - Hospital',
      address: 'Fortis Hospital, Sector 62, Noida',
      lat: 28.6186,
      lng: 77.3647,
      status: 'online',
      availableBatteries: 6,
      totalSlots: 10,
      rating: 4.7,
      reviews: 112,
      distance: 5.1,
      estimatedTime: 20,
      operatingHours: '24/7',
      phone: '+91 98765 43214',
      amenities: ['Fast Swap', 'Parking', 'Medical', 'Emergency'],
      lastUpdated: '3 mins ago'
    }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Set default location to Noida Sector 112
          setUserLocation({ lat: 28.5881, lng: 77.3470 });
        }
      );
    }
  }, []);

  const getStatusBadge = (status: string, availableBatteries: number) => {
    if (status === 'maintenance') {
      return <Badge className="bg-yellow-100 text-yellow-800">Under Maintenance</Badge>;
    } else if (status === 'offline') {
      return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
    } else if (availableBatteries === 0) {
      return <Badge className="bg-orange-100 text-orange-800">No Batteries</Badge>;
    } else if (availableBatteries <= 2) {
      return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    }
  };

  const getStatusIcon = (status: string, availableBatteries: number) => {
    if (status === 'maintenance' || status === 'offline' || availableBatteries === 0) {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const openInGoogleMaps = (station: BatteryStation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const callStation = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const filteredStations = batteryStations.filter(station => {
    if (filterStatus === 'online') return station.status === 'online';
    if (filterStatus === 'available') return station.status === 'online' && station.availableBatteries > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Battery Swap Stations
              </h1>
              <p className="text-gray-600 mt-1">
                Find and navigate to nearby KWICK battery swap locations
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Battery className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">Free Unlimited Swaps</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Station List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Find Stations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter location or area"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('all')}
                    className="flex-1"
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === 'online' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('online')}
                    className="flex-1"
                  >
                    Online
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === 'available' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('available')}
                    className="flex-1"
                  >
                    Available
                  </Button>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Navigation className="h-4 w-4 mr-2" />
                  Use Current Location
                </Button>
              </CardContent>
            </Card>

            {/* Station List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredStations.map((station) => (
                <Card 
                  key={station.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedStation?.id === station.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedStation(station)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{station.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{station.address}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(station.status, station.availableBatteries)}
                          {getStatusBadge(station.status, station.availableBatteries)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Battery className="h-3 w-3 mr-1" />
                          {station.availableBatteries}/{station.totalSlots}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {station.distance} km
                        </span>
                        <span className="flex items-center">
                          <Timer className="h-3 w-3 mr-1" />
                          {station.estimatedTime} min
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span>{station.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - Map and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Container */}
            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
                  {/* Mock map interface */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-700 mb-2">Interactive Map</h3>
                      <p className="text-gray-600 mb-4">Real-time battery station locations</p>
                      <Button className="bg-primary hover:bg-primary/90">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in Google Maps
                      </Button>
                    </div>
                  </div>
                  
                  {/* Map markers overlay */}
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Available ({filteredStations.filter(s => s.status === 'online' && s.availableBatteries > 0).length})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Limited ({filteredStations.filter(s => s.status === 'online' && s.availableBatteries <= 2 && s.availableBatteries > 0).length})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Unavailable ({filteredStations.filter(s => s.status !== 'online' || s.availableBatteries === 0).length})</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Station Details */}
            {selectedStation && (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {getStatusIcon(selectedStation.status, selectedStation.availableBatteries)}
                        <span className="ml-2">{selectedStation.name}</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {selectedStation.address}
                      </CardDescription>
                    </div>
                    {getStatusBadge(selectedStation.status, selectedStation.availableBatteries)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Battery className="h-6 w-6 text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold">{selectedStation.availableBatteries}</div>
                      <div className="text-xs text-gray-600">Available</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold">{selectedStation.distance} km</div>
                      <div className="text-xs text-gray-600">Distance</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Timer className="h-6 w-6 text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold">{selectedStation.estimatedTime} min</div>
                      <div className="text-xs text-gray-600">ETA</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                      <div className="text-lg font-bold">{selectedStation.rating}</div>
                      <div className="text-xs text-gray-600">{selectedStation.reviews} reviews</div>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium">Operating Hours</span>
                    </div>
                    <span className="text-blue-600 font-semibold">{selectedStation.operatingHours}</span>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStation.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => openInGoogleMaps(selectedStation)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <Navigation2 className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button 
                      onClick={() => callStation(selectedStation.phone)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Station
                    </Button>
                  </div>

                  {/* Last Updated */}
                  <div className="text-xs text-gray-500 text-center">
                    Last updated: {selectedStation.lastUpdated}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Battery swaps take under 30 seconds at any station</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>All batteries are 100% charged and quality tested</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>24/7 customer support for any assistance needed</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Mobile app alerts for nearby stations and battery levels</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

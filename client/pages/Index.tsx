import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Leaf, 
  Clock, 
  Shield, 
  MapPin, 
  Star, 
  Battery, 
  CreditCard,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

export default function Index() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const benefits = [
    { icon: Zap, title: "Instant Booking", description: "Book your EV in under 2 minutes" },
    { icon: Battery, title: "Unlimited Swaps", description: "Free battery swapping at 500+ stations" },
    { icon: Shield, title: "Zero Maintenance", description: "No servicing, no repairs, no hassle" },
    { icon: CreditCard, title: "Flexible Payment", description: "Daily, weekly, monthly plans available" }
  ];

  const partners = [
    "Battery Smart", "Sun Mobility", "ChargeZone", "Ather Grid", 
    "Bolt.Earth", "Swiggy", "Zomato", "Blinkit", "Zepto", 
    "BigBasket", "Flipkart", "Amazon", "Myntra", "Meesho"
  ];

  const stats = [
    { number: "10,000+", label: "Happy Riders" },
    { number: "500+", label: "Battery Swap Stations" },
    { number: "50+", label: "Cities" },
    { number: "99%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-red-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
                🚀 India's #1 EV Rental Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Rent Electric,
                <span className="block text-yellow-300">Save Future!</span>
              </h1>
              <p className="text-xl mb-8 text-red-100">
                Skip the EMI, skip the maintenance. Rent premium electric vehicles by the day, 
                week, or month. Join 10,000+ riders making sustainable choices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                    Start Renting Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="KWICK Electric Vehicle" 
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white text-primary p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">₹99/day</div>
                  <div className="text-sm text-gray-600">Starting from</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Premium EV Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our curated collection of electric vehicles. 
              All vehicles come with unlimited battery swaps and zero maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* KWICK Vehicle Card */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="KWICK Electric Scooter"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  KWICK Elite
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">4.8</span>
                  </div>
                </CardTitle>
                <CardDescription>Premium electric scooter with 80km range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Range</span>
                    <span className="font-semibold">80km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Top Speed</span>
                    <span className="font-semibold">65 km/h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-bold text-primary">₹99/day</span>
                  </div>
                  <Link to="/signup">
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Cards */}
            <Card className="overflow-hidden shadow-lg opacity-75">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="KWICK Bike"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-gray-600 text-white">
                  Coming Soon
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>KWICK Power</CardTitle>
                <CardDescription>High-performance electric bike</CardDescription>
              </CardHeader>
              <CardContent>
                <Button disabled className="w-full">Launching Soon</Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg opacity-75">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="KWICK Car"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-gray-600 text-white">
                  Coming Soon
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>KWICK Cab</CardTitle>
                <CardDescription>Electric car for longer journeys</CardDescription>
              </CardHeader>
              <CardContent>
                <Button disabled className="w-full">Launching Soon</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose KWICK?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of mobility with our premium EV rental service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Partner Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Earn Extra as a Delivery Partner
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rent a KWICK vehicle and become a delivery partner. 
              <span className="text-primary font-semibold"> Paisa Hi Paisa! 💰</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Flexible Working Hours</h3>
                    <p className="text-gray-600">Work when you want, earn what you deserve</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Zero Investment</h3>
                    <p className="text-gray-600">No vehicle purchase, just rent and start earning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Multiple Platforms</h3>
                    <p className="text-gray-600">Partner with all major delivery apps</p>
                  </div>
                </div>
              </div>
              <Link to="/signup">
                <Button size="lg" className="mt-8 bg-green-600 hover:bg-green-700">
                  Start Earning Today
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Delivery Partner"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black p-4 rounded-lg shadow-lg transform rotate-12">
                <div className="text-lg font-bold">₹15,000+</div>
                <div className="text-sm">Monthly Income</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
            <p className="text-xl text-gray-300">
              Trusted by leading battery swap networks and delivery platforms
            </p>
          </div>

          <div className="relative">
            <div className="flex animate-scroll space-x-12">
              {[...partners, ...partners].map((partner, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg"
                >
                  <span className="text-lg font-semibold whitespace-nowrap">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Go Electric?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join thousands of riders who've made the switch to sustainable mobility. 
            Book your KWICK vehicle in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Vehicle
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

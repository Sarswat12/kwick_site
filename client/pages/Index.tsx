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
  CheckCircle,
  IndianRupee,
  Bike,
  Package,
  Timer,
  Award,
  Phone,
  Navigation,
  DollarSign,
  Target,
  Truck,
  Sun,
  Recycle
} from 'lucide-react';

export default function Index() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const benefits = [
    { icon: DollarSign, title: "Earn ₹50,000/Month", description: "Turn your rental into a profitable delivery business", color: "text-green-600" },
    { icon: Battery, title: "Unlimited Battery Swaps", description: "Free swapping at 50+ stations across NCR", color: "text-blue-600" },
    { icon: Shield, title: "Zero Maintenance", description: "We handle everything - repairs, insurance, servicing", color: "text-purple-600" },
    { icon: Zap, title: "Instant Delivery", description: "Vehicle delivered to your doorstep in 2 hours", color: "text-orange-600" }
  ];

  const earningOpportunities = [
    { 
      icon: Package, 
      title: "Food Delivery", 
      earning: "₹15,000-₹25,000/month",
      partners: "Zomato, Swiggy, Uber Eats",
      description: "Peak hours: 12-3PM, 7-11PM"
    },
    { 
      icon: Truck, 
      title: "E-commerce Delivery", 
      earning: "₹20,000-₹35,000/month",
      partners: "Amazon, Flipkart, Myntra",
      description: "Full-time earning potential"
    },
    { 
      icon: Timer, 
      title: "Quick Commerce", 
      earning: "₹18,000-₹30,000/month",
      partners: "Blinkit, Zepto, Instamart",
      description: "10-minute delivery specialist"
    },
    { 
      icon: Award, 
      title: "Premium Services", 
      earning: "₹25,000-₹50,000/month",
      partners: "Corporate, Medical",
      description: "High-value deliveries"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Riders", icon: Users },
    { number: "50+", label: "Battery Stations", icon: Battery },
    { number: "₹2.5L+", label: "Monthly Earnings", icon: TrendingUp },
    { number: "100%", label: "Eco-Friendly", icon: Leaf }
  ];

  const testimonials = [
    {
      name: "Raj Kumar",
      role: "Delivery Partner",
      rating: 5,
      text: "Earning ₹22,000 monthly with KWICK! No fuel costs, no maintenance headaches. Best decision ever.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Singh",
      role: "E-commerce Rider",
      rating: 5,
      text: "From ₹8,000 to ₹28,000 monthly income after switching to KWICK. Unlimited battery swaps are a game-changer!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Amit Sharma",
      role: "Food Delivery Expert",
      rating: 5,
      text: "KWICK's AI optimization helped me identify peak hours. Now earning ₹35,000+ monthly consistently.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const whyChooseKwick = [
    { 
      title: "No Down Payment", 
      description: "Start earning immediately with ₹0 upfront cost",
      icon: CreditCard,
      highlight: "Save ₹1,50,000"
    },
    { 
      title: "Monthly Savings", 
      description: "₹99/day vs ₹400/day for fuel + maintenance",
      icon: IndianRupee,
      highlight: "Save ₹9,000/month"
    },
    { 
      title: "AI Optimization", 
      description: "Smart route planning to maximize your earnings",
      icon: Target,
      highlight: "Earn 40% More"
    },
    { 
      title: "24/7 Support", 
      description: "Instant help when you need it most",
      icon: Phone,
      highlight: "Always Available"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-primary to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
                🚀 India's #1 EV Rental Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Rent KWICK EV.
                <span className="block text-green-300">Earn Lakhs.</span>
              </h1>
              <p className="text-xl mb-8 text-red-100">
                Transform your life with our premium electric scooters. 
                Earn ₹15,000-₹50,000 monthly through delivery services. 
                Zero fuel costs, unlimited battery swaps, 100% eco-friendly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                    Start Earning Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/battery-map">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Find Battery Stations
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-red-200">
                <span>📍 Noida Sector 112</span>
                <span>🔋 Free Battery Swaps</span>
                <span>🌱 100% Eco-Friendly</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="KWICK Electric Scooter"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg text-gray-900">
                  <div className="flex items-center space-x-3">
                    <Bike className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-lg font-bold">KWICK EV</div>
                      <div className="text-sm text-gray-600">Premium Electric Scooter</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              KWICK by the Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Real impact, real results, real earnings
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Opportunities */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to Earn
            </h2>
            <p className="text-xl text-gray-600">
              Choose your earning path with KWICK EV scooters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {earningOpportunities.map((opportunity, index) => (
              <Card key={index} className="border-primary/20 hover:shadow-xl transition-all hover:scale-105">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <opportunity.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <div className="text-2xl font-bold text-green-600">{opportunity.earning}</div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-primary font-semibold mb-2">{opportunity.partners}</p>
                  <p className="text-gray-600 text-sm">{opportunity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                💰 Average Annual Earnings: ₹2.5 - ₹6 Lakhs
              </h3>
              <p className="text-gray-600 mb-6">
                Our top riders earn over ₹50,000 monthly by combining multiple delivery services. 
                Start your journey to financial freedom today!
              </p>
              <Link to="/about">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Learn How to Maximize Earnings
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose KWICK?
            </h2>
            <p className="text-xl text-gray-600">
              The smart choice for earning and environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    benefit.color === 'text-green-600' ? 'bg-green-100' :
                    benefit.color === 'text-blue-600' ? 'bg-blue-100' :
                    benefit.color === 'text-purple-600' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KWICK vs Buying */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              KWICK vs Buying: The Smart Choice
            </h2>
            <p className="text-xl text-gray-600">
              See why thousands choose rental over purchase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {whyChooseKwick.map((item, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  {item.highlight}
                </div>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Cost Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Aspect</th>
                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Buying Scooter</th>
                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">KWICK Rental</th>
                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Your Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">Initial Cost</td>
                    <td className="py-4 px-6 text-red-600">₹1,50,000 down payment</td>
                    <td className="py-4 px-6 text-green-600">₹0 down payment</td>
                    <td className="py-4 px-6 font-bold text-green-700 bg-green-50 rounded">Save ₹1,50,000</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">Monthly Cost</td>
                    <td className="py-4 px-6 text-red-600">₹12,000 (EMI + fuel + maintenance)</td>
                    <td className="py-4 px-6 text-green-600">₹2,970 (₹99/day)</td>
                    <td className="py-4 px-6 font-bold text-green-700 bg-green-50 rounded">Save ₹9,030/month</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">Maintenance</td>
                    <td className="py-4 px-6 text-red-600">Your responsibility</td>
                    <td className="py-4 px-6 text-green-600">100% covered by KWICK</td>
                    <td className="py-4 px-6 font-bold text-green-700 bg-green-50 rounded">Stress-free</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <div className="bg-green-100 p-6 rounded-lg inline-block">
                <h4 className="text-2xl font-bold text-green-800 mb-2">
                  Total 3-Year Savings: ₹4,25,000+
                </h4>
                <p className="text-green-700">
                  Plus earning potential of ₹7,50,000+ through delivery services!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real riders, real earnings, real impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eco-Friendly Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Earn Money, Save Planet
            </h2>
            <p className="text-xl text-gray-600">
              Every KWICK ride contributes to a cleaner India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-green-200">
              <CardHeader>
                <Leaf className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-green-700">Zero Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">100% electric, 0% pollution. Every km saves the environment.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Sun className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-green-700">Solar Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">60% of our battery stations run on renewable solar energy.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Recycle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-green-700">100% Recycled</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">All batteries are responsibly recycled through certified processes.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🌱 Your Impact Matters
            </h3>
            <p className="text-gray-600 mb-6">
              Every 1000 km with KWICK saves 50kg CO2 emissions and plants 5 trees. 
              Earn money while building a sustainable future for your children.
            </p>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Trees Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">5000kg</div>
                <div className="text-sm text-gray-600">CO2 Prevented</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600">Renewable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join hundreds of riders already earning lakhs with KWICK EV scooters. 
            Your profitable, eco-friendly future starts with one click.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Start Earning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                View Rental Plans
              </Button>
            </Link>
          </div>
          <div className="text-sm text-red-200">
            💚 Join the eco-revolution • 💰 Earn lakhs monthly • 📍 Noida Sector 112 • 🤖 AI-powered success
          </div>
        </div>
      </section>
    </div>
  );
}

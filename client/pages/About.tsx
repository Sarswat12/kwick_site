import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  TreePine,
  MapPin,
  Zap,
  Users,
  Target,
  Shield,
  Clock,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Play,
  Recycle,
  Wind,
  Sun,
  DollarSign,
  TrendingUp,
  Award,
  Battery,
  Map,
  Bike,
  Package,
  IndianRupee,
  Truck,
  Timer,
  Star,
  Phone,
  Mail,
} from "lucide-react";

export default function About() {
  const ecoFacts = [
    {
      icon: TreePine,
      title: "500+ Trees Saved",
      description:
        "Every KWICK rider saves 20+ trees annually by choosing electric over petrol",
    },
    {
      icon: Wind,
      title: "85% Less Pollution",
      description:
        "Electric scooters produce 85% fewer emissions than petrol scooters",
    },
    {
      icon: Recycle,
      title: "100% Battery Recycling",
      description:
        "All our batteries are recycled through certified eco-friendly processes",
    },
    {
      icon: Sun,
      title: "Solar Powered Stations",
      description:
        "Our battery swap stations run on 60% renewable solar energy",
    },
  ];

  const deliveryEarnings = [
    {
      icon: Package,
      title: "Food Delivery",
      earnings: "₹15,000 - ₹25,000/month",
      description: "Partner with Zomato, Swiggy for flexible food delivery",
      hours: "6-8 hours/day",
    },
    {
      icon: Truck,
      title: "E-commerce Delivery",
      earnings: "₹20,000 - ₹35,000/month",
      description: "Deliver for Amazon, Flipkart, and local e-commerce",
      hours: "8-10 hours/day",
    },
    {
      icon: Timer,
      title: "Quick Commerce",
      earnings: "₹18,000 - ₹30,000/month",
      description: "Instant delivery for groceries and essentials",
      hours: "6-9 hours/day",
    },
    {
      icon: Award,
      title: "Premium Services",
      earnings: "₹25,000 - ₹50,000/month",
      description: "High-value deliveries and courier services",
      hours: "8-12 hours/day",
    },
  ];

  const whyKwickBenefits = [
    {
      title: "Save ₹8,000+ Monthly",
      description:
        "No EMI, no fuel costs, no maintenance - just ₹99/day all-inclusive",
      icon: IndianRupee,
    },
    {
      title: "Zero Down Payment",
      description:
        "No hefty upfront costs like buying. Start riding immediately",
      icon: CreditCard,
    },
    {
      title: "100% Maintenance Free",
      description: "We handle all repairs, servicing, and insurance",
      icon: Shield,
    },
    {
      title: "Unlimited Battery Swaps",
      description: "Never worry about charging. Swap batteries at 50+ stations",
      icon: Battery,
    },
    {
      title: "Flexible Duration",
      description: "Rent for days, weeks, or months. No long-term commitments",
      icon: Clock,
    },
    {
      title: "Instant Availability",
      description: "Vehicle delivered to your doorstep within 2 hours",
      icon: Zap,
    },
  ];

  const comparisonData = [
    {
      aspect: "Initial Cost",
      buying: "₹1,50,000 down payment + ₹8,000 EMI",
      kwick: "₹0 down payment + ₹99/day",
      savings: "Save ₹1,50,000 upfront",
    },
    {
      aspect: "Monthly Expense",
      buying: "₹8,000 EMI + ₹2,500 fuel + ₹1,500 maintenance",
      kwick: "₹2,970 (₹99 × 30 days)",
      savings: "Save ₹9,030/month",
    },
    {
      aspect: "Maintenance & Repairs",
      buying: "Your responsibility (₹15,000+/year)",
      kwick: "100% covered by KWICK",
      savings: "Save ₹15,000+/year",
    },
    {
      aspect: "Insurance",
      buying: "₹8,000/year premium",
      kwick: "Included in rental",
      savings: "Save ₹8,000/year",
    },
    {
      aspect: "Battery Replacement",
      buying: "₹40,000 after 2-3 years",
      kwick: "Free unlimited swaps",
      savings: "Save ₹40,000",
    },
    {
      aspect: "Depreciation Loss",
      buying: "50% value lost in 3 years",
      kwick: "No depreciation risk",
      savings: "Save ₹75,000",
    },
  ];

  const successStories = [
    {
      name: "Raj Kumar",
      age: 28,
      occupation: "Food Delivery Partner",
      earnings: "₹22,000/month",
      story:
        "Switched from petrol bike to KWICK. Now earning ₹5,000 more monthly with zero fuel costs!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Priya Sharma",
      age: 25,
      occupation: "E-commerce Delivery",
      earnings: "₹28,000/month",
      story:
        "KWICK's unlimited battery swaps means I never stop working. Earning lakhs annually!",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Amit Singh",
      age: 32,
      occupation: "Quick Commerce",
      earnings: "₹35,000/month",
      story:
        "Best decision ever! No maintenance headaches, just pure earning potential.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-primary to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
              🚀 India's #1 EV Rental Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              KWICK EV Scooter:
              <span className="block text-green-300">Your Path to Lakhs</span>
            </h1>
            <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
              Rent our premium electric scooters and earn ₹15,000 - ₹50,000
              monthly through delivery services. Zero fuel costs, unlimited
              battery swaps, and 100% eco-friendly rides!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                >
                  Start Earning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Success Stories
              </Button>
            </div>
            <div className="text-sm text-red-200">
              🏢 Noida Sector 112 Office | 🔋 50+ Battery Swap Stations | 🌱
              100% Eco-Friendly
            </div>
          </div>
        </div>
      </section>

      {/* KWICK Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The KWICK Revolution: 2 Months, Endless Possibilities
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Born in 2024 as a 2-month-old startup, KWICK emerged from a
                simple vision: make electric mobility profitable for everyone.
                We're not just another rental company— we're your earning
                partner in the gig economy revolution.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With our flagship KWICK EV Scooter, unlimited battery swap
                network, and AI-powered optimization, riders are earning lakhs
                annually while building a sustainable future for India.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    One premium electric scooter model
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg">Noida Sector 112 headquarters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    AI-powered earning optimization
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg">Free unlimited battery swaps</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="KWICK Electric Scooter"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <Bike className="h-8 w-8 text-primary mb-2" />
                <div className="text-lg font-bold text-gray-900">KWICK EV</div>
                <div className="text-sm text-gray-600">
                  Premium Electric Scooter
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earning Potential */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Earn Lakhs Annually with KWICK
            </h2>
            <p className="text-xl text-gray-600">
              Transform your KWICK rental into a profitable business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {deliveryEarnings.map((earning, index) => (
              <Card
                key={index}
                className="text-center border-primary/20 hover:shadow-xl transition-all hover:scale-105"
              >
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <earning.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{earning.title}</CardTitle>
                  <div className="text-2xl font-bold text-green-600">
                    {earning.earnings}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{earning.description}</p>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {earning.hours}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-8">
              Real Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="text-center">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-semibold text-lg">
                    {story.name}, {story.age}
                  </h4>
                  <p className="text-primary text-sm mb-2">
                    {story.occupation}
                  </p>
                  <div className="text-2xl font-bold text-green-600 mb-3">
                    {story.earnings}
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "{story.story}"
                  </p>
                  <div className="flex justify-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why KWICK vs Buying */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose KWICK Over Buying?
            </h2>
            <p className="text-xl text-gray-600">
              Smart riders choose rentals. Here's why.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {whyKwickBenefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              Complete Cost Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Aspect
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Buying Scooter
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      KWICK Rental
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Your Savings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.aspect}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        {item.buying}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600">
                        {item.kwick}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-700 bg-green-50">
                        {item.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-8">
              <div className="bg-green-100 p-6 rounded-lg inline-block">
                <h4 className="text-2xl font-bold text-green-800 mb-2">
                  Total 3-Year Savings: ₹3,00,000+
                </h4>
                <p className="text-green-700">
                  Plus earning potential of ₹5,00,000+ through delivery
                  services!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Eco-Friendly by Design
            </h2>
            <p className="text-xl text-gray-600">
              Every KWICK ride helps build a cleaner India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecoFacts.map((fact, index) => (
              <Card
                key={index}
                className="text-center border-green-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <fact.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{fact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{fact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
              <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🌱 Our Environmental Pledge
              </h3>
              <p className="text-gray-600">
                For every 1000 km you ride with KWICK, we plant 5 trees and
                offset 50kg of CO2 emissions. Together, we're not just earning
                money—we're earning a better planet for our children.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Battery Swap Network */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Unlimited Battery Swaps
            </h2>
            <p className="text-xl text-gray-600">
              Never worry about charging again with our growing network
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Battery className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Instant Battery Swaps
                    </h3>
                    <p className="text-gray-600">
                      Swap your battery in under 30 seconds at any of our
                      stations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Map className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Smart Location Finder
                    </h3>
                    <p className="text-gray-600">
                      AI-powered app shows nearest available swap stations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Always Charged
                    </h3>
                    <p className="text-gray-600">
                      100% charged batteries ready 24/7 at all locations
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/battery-map">
                <Button
                  size="lg"
                  className="mt-8 bg-primary hover:bg-primary/90"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Swap Stations
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Battery Swap Station"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Swap Stations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Features */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-6">
              🤖 AI-Powered Platform
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Smart Technology, Maximum Earnings
            </h2>
            <p className="text-xl text-gray-600">
              Our AI algorithms optimize your earnings potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-primary/20">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Earning Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI suggests best delivery routes, peak hours, and high-demand
                  areas to maximize your income
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <Battery className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Battery Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Predictive alerts for battery swaps and optimal station
                  routing to minimize downtime
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Detailed insights on earnings, efficiency, and personalized
                  tips to increase daily income
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Office */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Visit Our Noida Office
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Come meet our team, test ride our KWICK scooters, and learn
                about earning opportunities in person.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">
                      Sector 112, Noida, Uttar Pradesh 201301
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">hello@kwick.in</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Office Hours</h4>
                    <p className="text-gray-600">Mon-Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90">
                <MapPin className="mr-2 h-5 w-5" />
                Get Directions
              </Button>
            </div>

            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Schedule a Visit</h3>
              <p className="text-gray-600 mb-6">
                Book a free consultation and test ride at our office
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Book Test Ride
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your KWICK Journey?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join hundreds of riders already earning lakhs with KWICK. Your
            electric, profitable, eco-friendly future starts today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
              >
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
          <div className="mt-8 text-sm text-red-200">
            💚 Join the eco-revolution • 💰 Earn lakhs monthly • 🚀 AI-powered
            success
          </div>
        </div>
      </section>
    </div>
  );
}

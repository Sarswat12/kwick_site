import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  TreePine, 
  Globe, 
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
  Sun
} from 'lucide-react';

export default function About() {
  const ecoFacts = [
    {
      icon: TreePine,
      title: "10,000 Trees Saved",
      description: "Every KWICK rider saves 20+ trees annually by choosing electric over petrol"
    },
    {
      icon: Wind,
      title: "85% Less Pollution",
      description: "Electric vehicles produce 85% fewer emissions than traditional vehicles"
    },
    {
      icon: Recycle,
      title: "Battery Recycling",
      description: "100% of our batteries are recycled through certified eco-friendly processes"
    },
    {
      icon: Sun,
      title: "Solar Powered",
      description: "Our charging network runs on 60% renewable solar energy"
    }
  ];

  const rentalProcess = [
    {
      step: "1",
      title: "Quick Registration",
      description: "Sign up in 2 minutes with your mobile number and basic details",
      icon: Users
    },
    {
      step: "2", 
      title: "KYC Verification",
      description: "Upload your documents for quick verification (usually takes 2-4 hours)",
      icon: Shield
    },
    {
      step: "3",
      title: "Choose Your Plan",
      description: "Select from daily, weekly, or monthly rental plans that suit your needs",
      icon: CreditCard
    },
    {
      step: "4",
      title: "Book & Ride",
      description: "Make payment and start riding immediately. Vehicle delivered to your location!",
      icon: Zap
    }
  ];

  const whyElectric = [
    {
      title: "Save Money Daily",
      description: "Electric vehicles cost ₹1.5 per km vs ₹4 per km for petrol vehicles",
      savings: "60% Savings"
    },
    {
      title: "Zero Maintenance",
      description: "No oil changes, no engine repairs, no servicing headaches",
      savings: "₹15,000/year"
    },
    {
      title: "Instant Torque",
      description: "Electric motors provide instant acceleration and smooth rides",
      savings: "Better Experience"
    },
    {
      title: "Silent Operation",
      description: "Reduce noise pollution while enjoying peaceful rides",
      savings: "Peace of Mind"
    }
  ];

  const comparisonData = [
    {
      aspect: "Monthly Cost",
      buying: "₹8,000 EMI + ₹2,000 fuel + ₹1,500 maintenance = ₹11,500",
      renting: "₹2,970 (₹99/day)",
      savings: "Save ₹8,530/month"
    },
    {
      aspect: "Upfront Investment",
      buying: "₹1,50,000 down payment",
      renting: "₹0 down payment",
      savings: "Save ₹1,50,000"
    },
    {
      aspect: "Maintenance",
      buying: "Your responsibility",
      renting: "100% covered by KWICK",
      savings: "Stress-free"
    },
    {
      aspect: "Insurance",
      buying: "₹8,000/year",
      renting: "Included in rental",
      savings: "Save ₹8,000/year"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-primary to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
              🌱 Building Sustainable India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Driving Change,
              <span className="block text-green-300">One Ride at a Time</span>
            </h1>
            <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
              KWICK is more than just an EV rental platform. We're a movement towards 
              sustainable mobility, cleaner cities, and a greener future for India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                  Join the Movement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission: Zero Emission India
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2023, KWICK was born from a simple yet powerful vision: 
                make electric mobility accessible to every Indian. We believe that 
                sustainable transportation shouldn't be a luxury—it should be the norm.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                By providing affordable, convenient EV rentals, we're eliminating the 
                barriers that prevent people from going electric. No hefty down payments, 
                no maintenance worries, no range anxiety—just clean, efficient transportation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">10,000+</div>
                  <div className="text-sm text-gray-600">Eco Warriors</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">5M km</div>
                  <div className="text-sm text-gray-600">Emissions Free</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Electric Vehicle in Nature"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <Leaf className="h-8 w-8 text-green-500 mb-2" />
                <div className="text-lg font-bold text-gray-900">Clean Air</div>
                <div className="text-sm text-gray-600">For Future Generations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Facts */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Environmental Impact
            </h2>
            <p className="text-xl text-gray-600">
              Every KWICK ride contributes to a cleaner, greener India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecoFacts.map((fact, index) => (
              <Card key={index} className="text-center border-green-200 hover:shadow-lg transition-shadow">
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
        </div>
      </section>

      {/* Why Electric Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Electric Vehicles?
            </h2>
            <p className="text-xl text-gray-600">
              The benefits go beyond just being eco-friendly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyElectric.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {benefit.savings}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How KWICK Rental Works
            </h2>
            <p className="text-xl text-gray-600">
              Get on the road in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rentalProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <process.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-primary">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Renting vs Buying: The Smart Choice
            </h2>
            <p className="text-xl text-gray-600">
              See why thousands choose KWICK over buying
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Aspect</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Buying</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">KWICK Rental</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Your Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.aspect}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.buying}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.renting}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{item.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-12">
            <div className="bg-green-50 p-8 rounded-lg inline-block">
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Total Annual Savings: ₹1,10,000+
              </h3>
              <p className="text-green-600">
                Plus the peace of mind that comes with zero maintenance and full support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See KWICK in Action
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Watch how our riders are making a difference, one electric mile at a time
          </p>
          <div className="relative">
            <div className="bg-black/20 rounded-lg p-16 cursor-pointer hover:bg-black/30 transition-colors">
              <Play className="h-16 w-16 mx-auto text-white" />
              <p className="mt-4 text-lg">Click to watch our impact story</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the KWICK community and be part of India's sustainable mobility revolution. 
            Your journey towards a greener future starts with a single ride.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-4"
              >
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

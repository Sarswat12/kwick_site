import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Shield, 
  Battery, 
  MapPin, 
  Clock, 
  Phone,
  ArrowRight,
  Zap,
  Users,
  Truck
} from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      name: "Daily",
      description: "Perfect for short trips and occasional rides",
      icon: Clock,
      price: 99,
      originalPrice: 149,
      period: "per day",
      badge: null,
      color: "border-gray-200",
      buttonColor: "bg-gray-900 hover:bg-gray-800",
      features: [
        "Unlimited rides within city",
        "Free battery swaps",
        "Basic customer support",
        "Mobile app access",
        "Insurance included"
      ],
      limitations: [
        "No home delivery",
        "Standard support hours"
      ]
    },
    {
      name: "Weekly",
      description: "Great for regular commuters and short-term needs",
      icon: Star,
      price: 599,
      originalPrice: 799,
      period: "per week",
      badge: "Popular",
      color: "border-primary ring-2 ring-primary/20",
      buttonColor: "bg-primary hover:bg-primary/90",
      features: [
        "Everything in Daily plan",
        "Home delivery & pickup",
        "Priority customer support",
        "Free helmet included",
        "7-day damage protection",
        "Multi-city travel allowed"
      ],
      limitations: []
    },
    {
      name: "Monthly",
      description: "Best value for long-term usage and businesses",
      icon: Crown,
      price: 1999,
      originalPrice: 2999,
      period: "per month",
      badge: "Best Value",
      color: "border-yellow-400 ring-2 ring-yellow-400/20",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
      features: [
        "Everything in Weekly plan",
        "24/7 premium support",
        "Free maintenance & repairs",
        "Express battery swaps",
        "Nationwide travel coverage",
        "Business expense receipts",
        "Multiple vehicle allocation",
        "Custom branding (for businesses)"
      ],
      limitations: []
    }
  ];

  const additionalServices = [
    {
      name: "Express Delivery",
      description: "Vehicle delivered within 30 minutes",
      price: "₹99",
      icon: Truck
    },
    {
      name: "Premium Support",
      description: "24/7 priority customer service",
      price: "₹199/month",
      icon: Phone
    },
    {
      name: "Multi-City Package",
      description: "Use KWICK vehicles in any city",
      price: "₹299/month",
      icon: MapPin
    },
    {
      name: "Business Plan",
      description: "Fleet management for businesses",
      price: "Custom",
      icon: Users
    }
  ];

  const faqs = [
    {
      question: "What's included in the rental?",
      answer: "All plans include the vehicle, insurance, unlimited battery swaps, basic maintenance, and access to our mobile app."
    },
    {
      question: "Are there any hidden charges?",
      answer: "No hidden charges! The price you see is what you pay. Only additional charges apply for services like express delivery or damage beyond normal wear."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Upgrades are immediate, and downgrades apply from your next billing cycle."
    },
    {
      question: "What if the vehicle breaks down?",
      answer: "We provide 24/7 roadside assistance. A replacement vehicle will be delivered to you within 2 hours at no extra cost."
    },
    {
      question: "Is there a security deposit?",
      answer: "Yes, we require a refundable security deposit of ₹2,000 which is returned when you end your rental period."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-red-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
              💰 No EMI, No Maintenance, No Worries
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Simple, Transparent
              <span className="block text-yellow-300">Pricing Plans</span>
            </h1>
            <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
              Choose the perfect plan for your mobility needs. All plans include 
              unlimited battery swaps, insurance, and our premium support.
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-1">
              <span className={`px-4 py-2 text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-white/70'}`}>
                Monthly Billing
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                className="mx-2"
              />
              <span className={`px-4 py-2 text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-white/70'}`}>
                Annual Billing
                <Badge className="ml-2 bg-green-500 text-white">Save 20%</Badge>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} hover:shadow-xl transition-all duration-300`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${plan.name === 'Weekly' ? 'bg-primary' : 'bg-yellow-500'} text-white px-4 py-1`}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl md:text-4xl font-bold text-gray-900">
                        ₹{isAnnual ? Math.round(plan.price * 0.8) : plan.price}
                      </span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      Originally ₹{plan.originalPrice}
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-green-600 font-semibold">
                        20% Annual Discount Applied
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center space-x-3">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/signup">
                    <Button className={`w-full ${plan.buttonColor} text-lg py-3`}>
                      Choose {plan.name}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Add-On Services
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your KWICK experience with premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-primary mb-3">{service.price}</div>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plan Comparison
            </h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Daily</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Weekly</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Monthly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Unlimited City Rides</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Battery Swaps</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Home Delivery</td>
                  <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">24/7 Support</td>
                  <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Multi-City Travel</td>
                  <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Business Features</td>
                  <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Electric Journey?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join thousands of satisfied riders who've made the switch to KWICK. 
            Choose your plan and get on the road in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Get Started Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                Talk to Sales
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-red-200">
            No setup fees • Cancel anytime • 7-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}

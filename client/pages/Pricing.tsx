import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
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
  Truck,
  IndianRupee,
  Calculator,
  TrendingUp,
  Award,
  Package,
  Timer,
  Target,
  Smartphone,
  AlertCircle,
  Info,
} from "lucide-react";

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("weekly");

  const pricingPlans = [
    {
      id: "daily",
      name: "Daily Rental",
      description: "Perfect for testing the waters and short trips",
      icon: Clock,
      price: 99,
      originalPrice: 149,
      period: "per day",
      badge: null,
      color: "border-gray-200",
      buttonColor: "bg-gray-900 hover:bg-gray-800",
      popularReason: null,
      earningPotential: "₹600-1,200/day",
      features: [
        "KWICK premium electric scooter",
        "Unlimited battery swaps",
        "Full insurance coverage",
        "24/7 customer support",
        "Mobile app with GPS tracking",
        "Free home delivery & pickup",
      ],
      limitations: ["Higher daily rate", "No long-term discounts"],
      bestFor: "New riders, occasional use",
    },
    {
      id: "weekly",
      name: "Weekly Rental",
      description: "Most popular choice for regular earners",
      icon: Star,
      price: 693,
      originalPrice: 1043,
      period: "per week",
      badge: "Most Popular",
      color: "border-primary ring-2 ring-primary/20",
      buttonColor: "bg-primary hover:bg-primary/90",
      popularReason: "Save ₹350/week vs daily rate",
      earningPotential: "₹4,200-8,400/week",
      features: [
        "KWICK premium electric scooter",
        "Unlimited battery swaps",
        "Priority customer support",
        "Full insurance + roadside assistance",
        "Advanced mobile app features",
        "Free delivery & maintenance",
        "Performance analytics dashboard",
        "Earning optimization tips",
      ],
      limitations: [],
      bestFor: "Regular delivery partners",
    },
    {
      id: "monthly",
      name: "Monthly Rental",
      description: "Maximum savings for serious delivery professionals",
      icon: Crown,
      price: 2970,
      originalPrice: 4470,
      period: "per month",
      badge: "Best Value",
      color: "border-green-200 ring-2 ring-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700",
      popularReason: "Save ₹1,500/month vs weekly rate",
      earningPotential: "₹18,000-36,000/month",
      features: [
        "KWICK premium electric scooter",
        "Unlimited battery swaps",
        "VIP priority support",
        "Comprehensive insurance package",
        "AI-powered earning optimization",
        "Free delivery, maintenance & repairs",
        "Dedicated account manager",
        "Performance bonus eligibility",
        "Partner referral rewards",
        "Multi-city travel support",
      ],
      limitations: [],
      bestFor: "Full-time delivery professionals",
    },
  ];

  const comparisonFeatures = [
    {
      name: "KWICK EV Scooter Access",
      daily: true,
      weekly: true,
      monthly: true,
    },
    {
      name: "Unlimited Battery Swaps",
      daily: true,
      weekly: true,
      monthly: true,
    },
    {
      name: "Full Insurance Coverage",
      daily: true,
      weekly: true,
      monthly: true,
    },
    { name: "24/7 Customer Support", daily: true, weekly: true, monthly: true },
    { name: "Mobile App with GPS", daily: true, weekly: true, monthly: true },
    { name: "Free Home Delivery", daily: true, weekly: true, monthly: true },
    { name: "Priority Support", daily: false, weekly: true, monthly: true },
    {
      name: "Performance Analytics",
      daily: false,
      weekly: true,
      monthly: true,
    },
    {
      name: "AI Earning Optimization",
      daily: false,
      weekly: false,
      monthly: true,
    },
    {
      name: "Dedicated Account Manager",
      daily: false,
      weekly: false,
      monthly: true,
    },
    { name: "Performance Bonuses", daily: false, weekly: false, monthly: true },
    { name: "Multi-city Travel", daily: false, weekly: false, monthly: true },
  ];

  const earningCalculator = [
    {
      service: "Food Delivery",
      hoursPerDay: 8,
      ordersPerHour: 3,
      avgOrderValue: 25,
      dailyEarning: 600,
      monthlyEarning: 18000,
      partners: ["Zomato", "Swiggy", "Uber Eats"],
    },
    {
      service: "E-commerce",
      hoursPerDay: 10,
      ordersPerHour: 4,
      avgOrderValue: 30,
      dailyEarning: 1200,
      monthlyEarning: 36000,
      partners: ["Amazon", "Flipkart", "Myntra"],
    },
    {
      service: "Quick Commerce",
      hoursPerDay: 9,
      ordersPerHour: 5,
      avgOrderValue: 20,
      dailyEarning: 900,
      monthlyEarning: 27000,
      partners: ["Blinkit", "Zepto", "Instamart"],
    },
  ];

  const selectedPlanDetails = pricingPlans.find(
    (plan) => plan.id === selectedPlan,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary via-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">
              🚀 Flexible Rental Plans
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your
              <span className="block text-green-300">Earning Plan</span>
            </h1>
            <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
              Rent our premium KWICK EV scooter and start earning immediately.
              All plans include unlimited battery swaps, full insurance, and
              24/7 support.
            </p>
            <div className="text-sm text-red-200">
              📍 Noida Sector 112 • 🔋 50+ Battery Stations • 💰 Earn up to
              ₹50,000/month
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.color} hover:shadow-xl transition-all cursor-pointer ${
                selectedPlan === plan.id ? "scale-105" : ""
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge
                    className={`${
                      plan.badge === "Most Popular"
                        ? "bg-primary"
                        : "bg-green-600"
                    } text-white px-4 py-1`}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.badge === "Most Popular"
                      ? "bg-primary/10"
                      : plan.badge === "Best Value"
                        ? "bg-green-100"
                        : "bg-gray-100"
                  }`}
                >
                  <plan.icon
                    className={`h-8 w-8 ${
                      plan.badge === "Most Popular"
                        ? "text-primary"
                        : plan.badge === "Best Value"
                          ? "text-green-600"
                          : "text-gray-600"
                    }`}
                  />
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  {plan.description}
                </CardDescription>

                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-sm text-gray-500 line-through mr-2">
                      ₹{plan.originalPrice}
                    </span>
                    <div className="flex items-center">
                      <IndianRupee className="h-6 w-6 text-gray-900" />
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{plan.period}</p>

                  {plan.popularReason && (
                    <div className="mt-3 text-green-600 font-semibold text-sm">
                      {plan.popularReason}
                    </div>
                  )}
                </div>

                <div className="bg-green-50 p-3 rounded-lg mb-6">
                  <p className="text-sm text-green-700 font-semibold">
                    Earning Potential
                  </p>
                  <p className="text-lg font-bold text-green-800">
                    {plan.earningPotential}
                  </p>
                  <p className="text-xs text-green-600">{plan.bestFor}</p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-500">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>

                <Link to="/signup">
                  <Button className={`w-full ${plan.buttonColor}`}>
                    Choose {plan.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            Detailed Plan Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-gray-900 font-semibold">
                    Features
                  </th>
                  <th className="text-center py-4 px-6 text-gray-900 font-semibold">
                    Daily
                  </th>
                  <th className="text-center py-4 px-6 text-primary font-semibold">
                    Weekly
                  </th>
                  <th className="text-center py-4 px-6 text-green-600 font-semibold">
                    Monthly
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">{feature.name}</td>
                    <td className="py-4 px-6 text-center">
                      {feature.daily ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.weekly ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.monthly ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Earning Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            <Calculator className="inline h-6 w-6 mr-2" />
            Earning Potential Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {earningCalculator.map((service, index) => (
              <Card key={index} className="border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{service.service}</CardTitle>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{service.monthlyEarning.toLocaleString()}/month
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hours/day:</span>
                    <span className="font-semibold">
                      {service.hoursPerDay} hrs
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orders/hour:</span>
                    <span className="font-semibold">
                      {service.ordersPerHour}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg order value:</span>
                    <span className="font-semibold">
                      ₹{service.avgOrderValue}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-3">
                    <span className="text-gray-600">Daily earnings:</span>
                    <span className="font-bold text-green-600">
                      ₹{service.dailyEarning}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-gray-600 mb-2">
                      Popular partners:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {service.partners.map((partner, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {partner}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="bg-green-50 p-6 rounded-lg inline-block">
              <h3 className="text-xl font-bold text-green-800 mb-2">
                💰 Combine Services for Maximum Earnings
              </h3>
              <p className="text-green-700">
                Top riders earn ₹50,000+ monthly by working with multiple
                platforms
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose KWICK */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Choose KWICK?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Battery className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Unlimited Battery Swaps</h3>
              <p className="text-sm text-gray-600">
                Never worry about charging. 50+ swap stations across NCR.
              </p>
            </div>

            <div className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Complete Insurance</h3>
              <p className="text-sm text-gray-600">
                Full coverage for vehicle, rider, and third-party damages.
              </p>
            </div>

            <div className="text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Round-the-clock assistance for any issues or emergencies.
              </p>
            </div>

            <div className="text-center">
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">AI Optimization</h3>
              <p className="text-sm text-gray-600">
                Smart algorithms to maximize your daily earnings.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  What's included in the rental?
                </h3>
                <p className="text-sm text-gray-600">
                  Complete KWICK EV scooter, unlimited battery swaps, full
                  insurance, maintenance, roadside assistance, and 24/7 customer
                  support.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  How do battery swaps work?
                </h3>
                <p className="text-sm text-gray-600">
                  Simply visit any of our 50+ swap stations, exchange your
                  depleted battery for a fully charged one in under 30 seconds.
                  It's free and unlimited.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  Can I cancel my rental?
                </h3>
                <p className="text-sm text-gray-600">
                  Yes, you can cancel with 24 hours notice. Monthly plans
                  require 7 days notice. No hidden cancellation charges.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  How much can I really earn?
                </h3>
                <p className="text-sm text-gray-600">
                  Our top riders earn ₹50,000+ monthly. Average earnings range
                  from ₹18,000-₹35,000 depending on hours worked and delivery
                  platforms used.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  What documents do I need?
                </h3>
                <p className="text-sm text-gray-600">
                  Valid driving license, Aadhaar card, address proof, and one
                  emergency contact. KYC verification takes 2-4 hours.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  Is there a security deposit?
                </h3>
                <p className="text-sm text-gray-600">
                  Small refundable security deposit based on your plan. Daily:
                  ₹2,000, Weekly: ₹5,000, Monthly: ₹10,000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-red-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join hundreds of riders already earning with KWICK. Your profitable,
            eco-friendly future starts today!
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
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us: +91 98765 43210
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

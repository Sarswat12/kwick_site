import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Phone,
  User,
  MapPin,
  ArrowRight,
  Chrome,
  Facebook,
  CheckCircle,
  Shield,
  Clock,
  FileCheck
} from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    referralCode: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Handle signup logic
      console.log('Signup attempt:', formData);
      // Redirect to KYC page
      window.location.href = '/account';
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
    // Handle social signup
  };

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const signupSteps = [
    {
      icon: User,
      title: "Personal Details",
      description: "Basic information about you"
    },
    {
      icon: Shield,
      title: "Account Security",
      description: "Password and verification"
    },
    {
      icon: FileCheck,
      title: "KYC Verification",
      description: "Document verification (next step)"
    }
  ];

  const benefits = [
    "Instant vehicle booking in 2 minutes",
    "No down payment or EMI required",
    "Unlimited battery swaps included",
    "24/7 customer support",
    "Multi-city travel coverage",
    "Zero maintenance costs"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Signup Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Link to="/" className="inline-block">
                <span className="text-3xl font-bold text-primary">KWICK</span>
              </Link>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Join KWICK Today
              </h2>
              <p className="mt-2 text-gray-600">
                Start your electric journey in minutes
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4">
              {signupSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= currentStep 
                      ? 'bg-primary text-white' 
                      : index + 1 === currentStep + 1
                      ? 'bg-primary/20 text-primary'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1 < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < signupSteps.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  {currentStep === 1 ? 'Create Account' : 'Set Password'}
                </CardTitle>
                <CardDescription className="text-center">
                  {currentStep === 1 
                    ? 'Enter your personal information' 
                    : 'Secure your account with a strong password'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {currentStep === 1 ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="John"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Doe"
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john.doe@example.com"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="city">City</Label>
                        <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                        <Input
                          id="referralCode"
                          type="text"
                          value={formData.referralCode}
                          onChange={(e) => handleInputChange('referralCode', e.target.value)}
                          placeholder="Enter referral code for discounts"
                          className="mt-1"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="Create a strong password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Must be at least 8 characters with letters and numbers
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirm your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="terms" className="text-sm leading-5">
                            I agree to the{' '}
                            <a href="#" className="text-primary hover:text-primary/80">
                              Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-primary hover:text-primary/80">
                              Privacy Policy
                            </a>
                          </Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="marketing"
                            checked={formData.agreeToMarketing}
                            onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="marketing" className="text-sm leading-5">
                            I want to receive updates about new features and promotions
                          </Label>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex space-x-3">
                    {currentStep > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      className={`bg-primary hover:bg-primary/90 ${currentStep === 1 ? 'w-full' : 'flex-1'}`}
                      disabled={currentStep === 2 && !formData.agreeToTerms}
                    >
                      {currentStep === 1 ? 'Continue' : 'Create Account'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>

                {currentStep === 1 && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignup('google')}
                        className="w-full"
                      >
                        <Chrome className="h-4 w-4 mr-2" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignup('facebook')}
                        className="w-full"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                    </div>
                  </>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {currentStep === 2 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Next: KYC Verification</h4>
                    <p className="text-sm text-blue-700">
                      After creating your account, you'll complete a quick KYC process 
                      to verify your identity. This usually takes 2-4 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Benefits & Branding */}
        <div className="hidden lg:flex bg-gradient-to-br from-primary via-red-600 to-red-700 text-white">
          <div className="flex flex-col justify-center p-12 w-full">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6">
                Start Your Electric Revolution
              </h1>
              <p className="text-xl mb-8 text-red-100">
                Join the KWICK community and experience the future of sustainable mobility in India.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span className="text-red-100">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="font-semibold mb-4">What happens after signup?</h3>
                <div className="space-y-3 text-sm text-red-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span>Complete KYC verification (2-4 hours)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span>Choose your rental plan</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span>Book your first KWICK vehicle!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

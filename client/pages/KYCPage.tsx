import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Camera,
  Upload,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  User,
  CreditCard,
  Home,
  Car,
  Shield,
  Clock,
  Zap,
  Star
} from 'lucide-react';

interface KYCDocument {
  type: 'aadhaar' | 'address_proof' | 'pan_card' | 'driving_license';
  name: string;
  file: File | null;
  preview: string | null;
  status: 'pending' | 'uploaded' | 'verified';
  required: boolean;
}

export default function KYCPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const fileInputRefs = {
    aadhaar: useRef<HTMLInputElement>(null),
    address_proof: useRef<HTMLInputElement>(null),
    pan_card: useRef<HTMLInputElement>(null),
    driving_license: useRef<HTMLInputElement>(null)
  };

  const [documents, setDocuments] = useState<KYCDocument[]>([
    {
      type: 'aadhaar',
      name: 'Aadhaar Card',
      file: null,
      preview: null,
      status: 'pending',
      required: true
    },
    {
      type: 'address_proof',
      name: 'Address Proof',
      file: null,
      preview: null,
      status: 'pending',
      required: true
    },
    {
      type: 'pan_card',
      name: 'PAN Card',
      file: null,
      preview: null,
      status: 'pending',
      required: false
    },
    {
      type: 'driving_license',
      name: 'Driving License',
      file: null,
      preview: null,
      status: 'pending',
      required: true
    }
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    emergencyContact: '',
    occupation: ''
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    dataConsent: false,
    marketing: false
  });

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const getDocumentIcon = (type: string) => {
    const icons = {
      aadhaar: CreditCard,
      address_proof: Home,
      pan_card: FileCheck,
      driving_license: Car
    };
    const Icon = icons[type as keyof typeof icons] || FileCheck;
    return <Icon className="h-6 w-6" />;
  };

  const handleFileUpload = (documentType: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setDocuments(prev => prev.map(doc => 
        doc.type === documentType 
          ? { 
              ...doc, 
              file, 
              preview: e.target?.result as string, 
              status: 'uploaded' as const 
            }
          : doc
      ));
    };
    reader.readAsDataURL(file);
  };

  const calculateProgress = () => {
    const totalSteps = 4;
    return (currentStep / totalSteps) * 100;
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return personalInfo.firstName && personalInfo.lastName && personalInfo.email && personalInfo.phone;
      case 2:
        return personalInfo.address && personalInfo.city && personalInfo.dateOfBirth;
      case 3:
        const requiredDocs = documents.filter(doc => doc.required);
        return requiredDocs.every(doc => doc.status === 'uploaded');
      case 4:
        return agreements.terms && agreements.privacy && agreements.dataConsent;
      default:
        return false;
    }
  };

  const submitKYC = () => {
    // Generate user ID
    const userId = `USR${Date.now().toString().slice(-6)}`;
    
    // In real app, this would submit to backend
    console.log('KYC Submitted:', {
      userId,
      personalInfo,
      documents: documents.map(doc => ({
        type: doc.type,
        name: doc.name,
        status: doc.status
      })),
      agreements
    });

    // Store user ID in localStorage for demo
    localStorage.setItem('kwickUserId', userId);
    localStorage.setItem('kwickUserName', `${personalInfo.firstName} ${personalInfo.lastName}`);
    localStorage.setItem('kwickKYCStatus', 'pending');

    // Navigate to account page
    navigate('/account');
  };

  const steps = [
    {
      number: 1,
      title: getText('Personal Details', 'व्यक्तिगत विवरण'),
      description: getText('Basic information', 'बुनियादी जानकारी')
    },
    {
      number: 2,
      title: getText('Address Details', 'पता विवरण'),
      description: getText('Contact information', 'संपर्क जानकारी')
    },
    {
      number: 3,
      title: getText('Document Upload', 'दस्तावेज़ अपलोड'),
      description: getText('Identity verification', 'पहचान सत्यापन')
    },
    {
      number: 4,
      title: getText('Review & Submit', 'समीक्षा और जमा करें'),
      description: getText('Final confirmation', 'अंतिम पुष्टि')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-block mb-6">
            <span className="text-3xl font-bold text-primary">KWICK</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getText('KYC Verification', 'केवाईसी सत्यापन')}
          </h1>
          <p className="text-gray-600">
            {getText('Complete your identity verification to start riding', 'सवारी शुरू करने के लिए अपना पहचान सत्यापन पूरा करें')}
          </p>
          
          {/* Language Toggle */}
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep > step.number 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : currentStep === step.number
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-bold">{step.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={calculateProgress()} className="h-2" />
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              {getText('Step', 'चरण')} {currentStep} {getText('of', 'का')} 4: {steps[currentStep - 1]?.title}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <User className="h-5 w-5 mr-2" />}
              {currentStep === 2 && <Home className="h-5 w-5 mr-2" />}
              {currentStep === 3 && <FileCheck className="h-5 w-5 mr-2" />}
              {currentStep === 4 && <Shield className="h-5 w-5 mr-2" />}
              {steps[currentStep - 1]?.title}
            </CardTitle>
            <CardDescription>
              {steps[currentStep - 1]?.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-slide-in-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{getText('First Name *', 'प्रथम नाम *')}</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder={getText('John', 'राम')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{getText('Last Name *', 'अंतिम नाम *')}</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder={getText('Doe', 'कुमार')}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">{getText('Email Address *', 'ईमेल पता *')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{getText('Phone Number *', 'फोन नंबर *')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">{getText('Date of Birth', 'जन्म तिथि')}</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupation">{getText('Occupation', 'व्यवसाय')}</Label>
                    <Input
                      id="occupation"
                      value={personalInfo.occupation}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, occupation: e.target.value }))}
                      placeholder={getText('Software Engineer', 'सॉफ्टवेयर इंजीनियर')}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address Details */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-slide-in-left">
                <div>
                  <Label htmlFor="address">{getText('Full Address *', 'पूरा पता *')}</Label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder={getText('House/Flat No., Street, Area', 'मकान/फ्लैट नं., गली, क्षेत्र')}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">{getText('City *', 'शहर *')}</Label>
                    <Input
                      id="city"
                      value={personalInfo.city}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, city: e.target.value }))}
                      placeholder={getText('Noida', 'नोएडा')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">{getText('State', 'राज्य')}</Label>
                    <Select value={personalInfo.state} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, state: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={getText('Select State', 'राज्य चुनें')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="up">Uttar Pradesh</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="haryana">Haryana</SelectItem>
                        <SelectItem value="punjab">Punjab</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">{getText('PIN Code', 'पिन कोड')}</Label>
                    <Input
                      id="pincode"
                      value={personalInfo.pincode}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, pincode: e.target.value }))}
                      placeholder="201301"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="emergency">{getText('Emergency Contact', 'आपातकालीन संपर्क')}</Label>
                  <Input
                    id="emergency"
                    type="tel"
                    value={personalInfo.emergencyContact}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="+91 99999 88888"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slide-in-left">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📋 {getText('Document Guidelines', 'दस्तावेज़ दिशानिर्देश')}</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• {getText('Clear, readable images only', 'केवल स्पष्ट, पढ़ने योग्य चित्र')}</li>
                    <li>• {getText('All corners visible', 'सभी कोने दिखाई दें')}</li>
                    <li>• {getText('JPG, PNG formats (max 5MB)', 'JPG, PNG प्रारूप (अधिकतम 5MB)')}</li>
                    <li>• {getText('No screenshots or photocopies', 'कोई स्क्रीनशॉट या फोटोकॉपी नहीं')}</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {documents.map((document) => (
                    <div key={document.type} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getDocumentIcon(document.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{document.name}</h4>
                            {document.required && (
                              <Badge variant="destructive" className="text-xs">
                                {getText('Required', 'आवश्यक')}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {document.status === 'uploaded' && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>

                      <input
                        ref={fileInputRefs[document.type]}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(document.type, file);
                        }}
                        className="hidden"
                      />

                      {document.preview ? (
                        <div className="space-y-3">
                          <img 
                            src={document.preview} 
                            alt={document.name}
                            className="w-full h-32 object-cover rounded border"
                          />
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRefs[document.type].current?.click()}
                              className="flex-1"
                            >
                              <Camera className="h-4 w-4 mr-1" />
                              {getText('Change', 'बदलें')}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => fileInputRefs[document.type].current?.click()}
                          className="w-full h-24 border-dashed"
                        >
                          <div className="text-center">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {getText('Upload', 'अपलोड करें')} {document.name}
                            </span>
                          </div>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-slide-in-left">
                {/* Personal Info Review */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">{getText('Personal Information', 'व्यक्तिगत जानकारी')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">{getText('Name:', 'नाम:')}</span>
                      <span className="ml-2 font-medium">{personalInfo.firstName} {personalInfo.lastName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{getText('Email:', 'ईमेल:')}</span>
                      <span className="ml-2 font-medium">{personalInfo.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{getText('Phone:', 'फोन:')}</span>
                      <span className="ml-2 font-medium">{personalInfo.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{getText('City:', 'शहर:')}</span>
                      <span className="ml-2 font-medium">{personalInfo.city}</span>
                    </div>
                  </div>
                </div>

                {/* Documents Review */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">{getText('Uploaded Documents', 'अपलोड किए गए दस्तावेज़')}</h4>
                  <div className="space-y-2">
                    {documents.filter(doc => doc.status === 'uploaded').map((doc) => (
                      <div key={doc.type} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-4">
                  <h4 className="font-medium">{getText('Terms & Agreements', 'नियम और समझौते')}</h4>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms"
                      checked={agreements.terms}
                      onCheckedChange={(checked) => setAgreements(prev => ({ ...prev, terms: checked as boolean }))}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      {getText('I agree to the', 'मैं सहमत हूं')}{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        {getText('Terms of Service', 'सेवा की शर्तें')}
                      </Link>{' '}
                      {getText('and', 'और')}{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        {getText('Privacy Policy', 'गोपनीयता नीति')}
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={(checked) => setAgreements(prev => ({ ...prev, privacy: checked as boolean }))}
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="text-sm leading-5">
                      {getText('I consent to the processing of my personal data for KYC verification', 'मैं केवाईसी सत्यापन के लिए अपने व्यक्तिगत डेटा के प्रसंस्करण के लिए सहम���ि देता हूं')}
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="dataConsent"
                      checked={agreements.dataConsent}
                      onCheckedChange={(checked) => setAgreements(prev => ({ ...prev, dataConsent: checked as boolean }))}
                      className="mt-1"
                    />
                    <Label htmlFor="dataConsent" className="text-sm leading-5">
                      {getText('I authorize KWICK to verify my information with third-party services', 'मैं KWICK को तृतीय-पक्ष सेवाओं के साथ अपनी जानकारी सत्यापित करने के लिए अधिकृत करता हूं')}
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="marketing"
                      checked={agreements.marketing}
                      onCheckedChange={(checked) => setAgreements(prev => ({ ...prev, marketing: checked as boolean }))}
                      className="mt-1"
                    />
                    <Label htmlFor="marketing" className="text-sm leading-5">
                      {getText('I want to receive updates about new features and promotions (optional)', 'मैं नई सुविधाओं और प्रचारों के बारे में अपडेट प्राप्त करना चाहता हूं (वैकल्पिक)')}
                    </Label>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">
                        {getText('What happens next?', 'आगे क्या होता है?')}
                      </h4>
                      <p className="text-sm text-green-800 mt-1">
                        {getText('Your KYC will be reviewed within 2-4 hours. You\'ll receive an email once approved and can start using KWICK immediately.', 'आपका केवाईसी 2-4 घंटों के भीतर समीक्षा किया जाएगा। अनुमोदन के बाद आपको एक ईमेल मिलेग�� और आप तुरंत KWICK का उपयोग शुरू कर सकते हैं।')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {getText('Previous', 'पिछला')}
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepComplete(currentStep)}
                  className="flex items-center bg-primary hover:bg-primary/90"
                >
                  {getText('Next', 'आगे')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={submitKYC}
                  disabled={!isStepComplete(4)}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {getText('Submit KYC', 'केवाईसी जमा करें')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-8 text-center animate-fade-in" style={{animationDelay: '0.5s'}}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {getText('Why Complete KYC?', 'केवाईसी क्यों पूरा करें?')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">{getText('Instant Access', 'तत्काल पहुंच')}</p>
              <p className="text-xs text-gray-600">{getText('Start riding immediately', 'तुरंत सवारी शुरू करें')}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">{getText('Secure Platform', 'सुरक्षित प्लेटफॉर्म')}</p>
              <p className="text-xs text-gray-600">{getText('Your data is protected', 'आपका डेटा सुरक्षित है')}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <Star className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">{getText('Premium Benefits', 'प्रीमियम लाभ')}</p>
              <p className="text-xs text-gray-600">{getText('Unlock all features', 'सभी सुविधाएं अनलॉक करें')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

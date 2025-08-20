import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Eye, 
  EyeOff, 
  Shield,
  Globe,
  AlertCircle
} from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  // Demo credentials helper
  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@kwick.in',
      password: 'admin123'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {getText('KWICK Admin Portal', 'KWICK एडमिन पोर्टल')}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {getText(
                  'Sign in to access the admin dashboard',
                  'एडमिन डैशबोर्ड एक्सेस करने के लिए साइन इन करें'
                )}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">
                  {getText('Email Address', 'ईमेल पता')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={getText('admin@kwick.in', 'admin@kwick.in')}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="password">
                  {getText('Password', 'पासवर्ड')}
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={getText('Enter your password', 'अपना पासवर्ड दर्ज करें')}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{getText('Signing in...', 'साइन इन हो रहा है...')}</span>
                  </div>
                ) : (
                  getText('Sign In', 'साइन इन करें')
                )}
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                {getText('Demo Credentials', 'डेमो क्रेडेंशियल')}
              </h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p>{getText('Admin:', 'एडमिन:')} admin@kwick.in / admin123</p>
                <p>{getText('Manager:', 'मैनेजर:')} manager@kwick.in / manager123</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 text-blue-700 border-blue-300"
                onClick={fillDemoCredentials}
                disabled={loading}
              >
                {getText('Use Demo Admin', 'डेमो एडमिन का उपयोग करें')}
              </Button>
            </div>

            {/* Language Toggle */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                disabled={loading}
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
              </Button>
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                {getText(
                  'This is a secure admin portal. All activities are logged.',
                  'यह एक सुरक्षित एडमिन पोर्टल है। सभी गतिविधियां लॉग की जाती हैं।'
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Main Site */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {getText('← Back to KWICK Website', '← KWICK वेबसाइट पर वापस जाएं')}
          </a>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard,
  Users,
  CreditCard,
  FileCheck,
  Truck,
  MessageSquare,
  FileText,
  Briefcase,
  Settings,
  Globe,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Shield,
  BarChart3,
  Zap,
  MapPin
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    {
      name: 'Dashboard',
      nameHi: 'डैशबोर्ड',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Analytics',
      nameHi: 'विश्लेषण',
      href: '/admin/analytics',
      icon: BarChart3,
      current: location.pathname === '/admin/analytics'
    },
    {
      name: 'User Management',
      nameHi: 'उपयोगकर्ता प्रबंधन',
      href: '/admin/users',
      icon: Users,
      current: location.pathname === '/admin/users'
    },
    {
      name: 'Payments',
      nameHi: 'भुगतान',
      href: '/admin/payments',
      icon: CreditCard,
      current: location.pathname === '/admin/payments'
    },
    {
      name: 'KYC Management',
      nameHi: 'केवाईसी प्रबंधन',
      href: '/admin/kyc',
      icon: FileCheck,
      current: location.pathname === '/admin/kyc'
    },
    {
      name: 'Fleet Management',
      nameHi: 'फ्लीट प्रबंधन',
      href: '/admin/fleet',
      icon: Truck,
      current: location.pathname === '/admin/fleet'
    },
    {
      name: 'IoT Devices',
      nameHi: 'IoT उपकरण',
      href: '/admin/iot',
      icon: Zap,
      current: location.pathname === '/admin/iot'
    },
    {
      name: 'Support Tickets',
      nameHi: 'सहायता टिकट',
      href: '/admin/support',
      icon: MessageSquare,
      current: location.pathname === '/admin/support'
    },
    {
      name: 'Blog Management',
      nameHi: 'ब्लॉग प्रबंधन',
      href: '/admin/blog',
      icon: FileText,
      current: location.pathname === '/admin/blog'
    },
    {
      name: 'Career Management',
      nameHi: 'करियर प्रबंधन',
      href: '/admin/careers',
      icon: Briefcase,
      current: location.pathname === '/admin/careers'
    },
    {
      name: 'Settings',
      nameHi: 'सेटिंग्स',
      href: '/admin/settings',
      icon: Settings,
      current: location.pathname === '/admin/settings'
    }
  ];

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Load admin user data
    fetchAdminProfile(token);
  }, [navigate]);

  const fetchAdminProfile = async (token: string) => {
    try {
      const response = await fetch('/api/admin/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setAdminUser(userData);
      } else {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Failed to fetch admin profile:', error);
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">KWICK Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {getText(item.name, item.nameHi)}
              </Link>
            ))}
          </nav>

          {/* Admin Profile */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {adminUser.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {adminUser.email}
                </p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {adminUser.role.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'lg:ml-64' : ''
      }`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={getText("Search users, payments, vehicles...", "उपयोगकर्ता, भुगतान, वाहन खोजें...")}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="hidden sm:flex"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'en' ? 'हिंदी' : 'English'}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* Logout */}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {getText('Logout', 'लॉगआउट')}
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  FileText,
  Briefcase,
  Calendar,
  User,
  Globe,
  TrendingUp,
  BarChart3,
  Users,
  ChevronLeft,
  ChevronRight,
  Save,
  X
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  titleHi?: string;
  slug: string;
  content: string;
  contentHi?: string;
  excerpt: string;
  excerptHi?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  featuredImage?: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

interface CareerPost {
  id: string;
  title: string;
  titleHi?: string;
  department: string;
  location: string;
  type: 'full_time' | 'part_time' | 'contract' | 'internship';
  experience: string;
  salary?: string;
  description: string;
  descriptionHi?: string;
  requirements: string[];
  requirementsHi?: string[];
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ContentFilters {
  search: string;
  status: string;
  category: string;
  dateFrom: string;
  dateTo: string;
}

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('blog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [careerPosts, setCareerPosts] = useState<CareerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ContentFilters>({
    search: '',
    status: '',
    category: '',
    dateFrom: '',
    dateTo: ''
  });
  const [selectedPost, setSelectedPost] = useState<BlogPost | CareerPost | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost | CareerPost>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchContent();
  }, [activeTab, currentPage, filters]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      if (activeTab === 'blog') {
        const mockBlogs: BlogPost[] = [
          {
            id: 'blog-1',
            title: 'The Future of Electric Mobility in India',
            titleHi: 'भारत में इलेक्ट्रिक मोबिलिटी का भविष्य',
            slug: 'future-electric-mobility-india',
            content: 'Electric vehicles are revolutionizing transportation...',
            contentHi: 'इलेक्ट्रिक वाहन परिवहन में क्रांति ला रहे हैं...',
            excerpt: 'Exploring the rapid growth of EV adoption in India',
            excerptHi: 'भारत में EV अपनाने की तीव्र वृद्धि की खोज',
            author: 'Tech Team',
            status: 'published',
            featuredImage: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75',
            tags: ['electric', 'mobility', 'india', 'future'],
            publishedAt: '2024-01-15T10:00:00Z',
            createdAt: '2024-01-10T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z',
            views: 2534
          },
          {
            id: 'blog-2',
            title: 'KWICK Battery Swapping Network Expansion',
            titleHi: 'KWICK बैटरी स्वैपिंग नेटवर्क विस्तार',
            slug: 'kwick-battery-swapping-expansion',
            content: 'We are expanding our battery swapping network...',
            contentHi: 'हम अपने बैटरी स्वैपिंग नेटवर्क का विस्तार कर रहे हैं...',
            excerpt: 'New battery swap stations coming to 50 more cities',
            excerptHi: '50 और शहरों में नए बैटरी स्वैप स्टेशन आ रहे हैं',
            author: 'Operations Team',
            status: 'published',
            tags: ['battery', 'swapping', 'expansion', 'infrastructure'],
            publishedAt: '2024-01-10T10:00:00Z',
            createdAt: '2024-01-05T10:00:00Z',
            updatedAt: '2024-01-10T10:00:00Z',
            views: 1876
          },
          {
            id: 'blog-3',
            title: 'Sustainable Transportation for Delivery Partners',
            titleHi: 'डिलीवरी पार्टनर्स के लिए टिकाऊ परिवहन',
            slug: 'sustainable-transportation-delivery',
            content: 'How KWICK is helping delivery partners...',
            contentHi: 'KWICK कैसे डिलीवरी पार्टनर्स की मदद कर रहा है...',
            excerpt: 'Empowering gig economy with electric vehicles',
            excerptHi: 'इलेक्ट्रिक वाहनों के साथ गिग इकॉनमी को सशक्त बनाना',
            author: 'Marketing Team',
            status: 'draft',
            tags: ['delivery', 'sustainability', 'gig-economy'],
            createdAt: '2024-01-08T10:00:00Z',
            updatedAt: '2024-01-12T10:00:00Z',
            views: 0
          }
        ];
        setBlogPosts(mockBlogs);
      } else {
        const mockCareers: CareerPost[] = [
          {
            id: 'career-1',
            title: 'Senior Software Engineer - Full Stack',
            titleHi: 'सीनियर सॉफ्टवेयर इंजीनियर - फुल स्टैक',
            department: 'Engineering',
            location: 'Bangalore',
            type: 'full_time',
            experience: '3-5 years',
            salary: '₹15-25 LPA',
            description: 'We are looking for a senior full-stack developer...',
            descriptionHi: 'हम एक सीनियर फुल-स्टैक डेवलपर की तलाश कर रहे हैं...',
            requirements: ['React.js', 'Node.js', 'TypeScript', 'MongoDB'],
            requirementsHi: ['React.js', 'Node.js', 'TypeScript', 'MongoDB'],
            status: 'active',
            applicationsCount: 42,
            createdAt: '2024-01-01T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z'
          },
          {
            id: 'career-2',
            title: 'Fleet Operations Manager',
            titleHi: 'फ्लीट ऑपरेशन्स मैनेजर',
            department: 'Operations',
            location: 'Mumbai',
            type: 'full_time',
            experience: '5-8 years',
            salary: '₹20-30 LPA',
            description: 'Manage our growing EV fleet operations...',
            descriptionHi: 'हमारे बढ़ते EV फ्लीट ऑपरेशन्स का प्रबंधन करें...',
            requirements: ['Fleet Management', 'Operations', 'Team Leadership'],
            requirementsHi: ['फ्लीट प्रबंधन', 'संचालन', 'टीम नेतृत्व'],
            status: 'active',
            applicationsCount: 28,
            createdAt: '2023-12-20T10:00:00Z',
            updatedAt: '2024-01-10T10:00:00Z'
          },
          {
            id: 'career-3',
            title: 'UI/UX Designer',
            titleHi: 'UI/UX डिज़ाइनर',
            department: 'Design',
            location: 'Delhi',
            type: 'full_time',
            experience: '2-4 years',
            salary: '₹8-15 LPA',
            description: 'Design intuitive user experiences...',
            descriptionHi: 'सहज उपयोगकर्ता अनुभव डिज़ाइन करें...',
            requirements: ['Figma', 'User Research', 'Prototyping'],
            requirementsHi: ['Figma', 'यूजर रिसर्च', 'प्रोटोटाइपिंग'],
            status: 'draft',
            applicationsCount: 0,
            createdAt: '2024-01-12T10:00:00Z',
            updatedAt: '2024-01-12T10:00:00Z'
          }
        ];
        setCareerPosts(mockCareers);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof ContentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleCreatePost = () => {
    setEditingPost({});
    setIsCreateDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost | CareerPost) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleSavePost = async () => {
    try {
      // In a real app, this would save to the backend
      console.log('Saving post:', editingPost);
      
      if (isCreateDialogOpen) {
        // Add new post
        if (activeTab === 'blog') {
          const newPost: BlogPost = {
            ...editingPost as BlogPost,
            id: `blog-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0
          };
          setBlogPosts(prev => [newPost, ...prev]);
        } else {
          const newPost: CareerPost = {
            ...editingPost as CareerPost,
            id: `career-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            applicationsCount: 0
          };
          setCareerPosts(prev => [newPost, ...prev]);
        }
      } else {
        // Update existing post
        if (activeTab === 'blog') {
          setBlogPosts(prev => prev.map(post => 
            post.id === editingPost.id ? { ...editingPost as BlogPost, updatedAt: new Date().toISOString() } : post
          ));
        } else {
          setCareerPosts(prev => prev.map(post => 
            post.id === editingPost.id ? { ...editingPost as CareerPost, updatedAt: new Date().toISOString() } : post
          ));
        }
      }

      setIsCreateDialogOpen(false);
      setIsEditDialogOpen(false);
      setEditingPost({});
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      if (activeTab === 'blog') {
        setBlogPosts(prev => prev.filter(post => post.id !== postId));
      } else {
        setCareerPosts(prev => prev.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const getText = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: { color: 'bg-green-100 text-green-800', text: getText('Published', 'प्रकाशित') },
      active: { color: 'bg-green-100 text-green-800', text: getText('Active', 'सक्रिय') },
      draft: { color: 'bg-yellow-100 text-yellow-800', text: getText('Draft', 'मसौदा') },
      archived: { color: 'bg-gray-100 text-gray-800', text: getText('Archived', 'संग्रहीत') },
      closed: { color: 'bg-red-100 text-red-800', text: getText('Closed', 'बंद') }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.draft;
    return (
      <Badge className={variant.color}>
        {variant.text}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getContentStats = () => {
    if (activeTab === 'blog') {
      const total = blogPosts.length;
      const published = blogPosts.filter(p => p.status === 'published').length;
      const drafts = blogPosts.filter(p => p.status === 'draft').length;
      const totalViews = blogPosts.reduce((sum, p) => sum + p.views, 0);
      return { total, published, drafts, totalViews };
    } else {
      const total = careerPosts.length;
      const active = careerPosts.filter(p => p.status === 'active').length;
      const drafts = careerPosts.filter(p => p.status === 'draft').length;
      const totalApplications = careerPosts.reduce((sum, p) => sum + p.applicationsCount, 0);
      return { total, active, drafts, totalApplications };
    }
  };

  const stats = getContentStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('Content Management', 'सामग्री प्रबंधन')}
          </h1>
          <p className="text-gray-600 mt-1">
            {getText('Manage blog posts and career listings', 'ब्लॉग पोस्ट और करियर लिस्टिंग का प्रबंधन करें')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            {getText('Analytics', 'विश्लेषण')}
          </Button>
          <Button onClick={handleCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'blog' 
              ? getText('New Post', 'नई पोस्ट')
              : getText('New Job', 'नई नौकरी')
            }
          </Button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {activeTab === 'blog' 
                    ? getText('Total Posts', 'कुल पोस्ट')
                    : getText('Total Jobs', 'कुल नौकरियां')
                  }
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              {activeTab === 'blog' ? (
                <FileText className="h-6 w-6 text-blue-600" />
              ) : (
                <Briefcase className="h-6 w-6 text-blue-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {activeTab === 'blog' 
                    ? getText('Published', 'प्रकाशित')
                    : getText('Active', 'सक्रिय')
                  }
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {activeTab === 'blog' ? stats.published : stats.active}
                </p>
              </div>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{getText('Drafts', 'मसौदे')}</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
              </div>
              <Edit className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {activeTab === 'blog' 
                    ? getText('Total Views', 'कुल दृश्य')
                    : getText('Applications', 'आवेदन')
                  }
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {activeTab === 'blog' ? stats.totalViews : stats.totalApplications}
                </p>
              </div>
              {activeTab === 'blog' ? (
                <Eye className="h-6 w-6 text-purple-600" />
              ) : (
                <Users className="h-6 w-6 text-purple-600" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="blog" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>{getText('Blog Posts', 'ब्लॉग पोस्ट')}</span>
          </TabsTrigger>
          <TabsTrigger value="careers" className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>{getText('Career Posts', 'करियर पोस्ट')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Blog Posts Tab */}
        <TabsContent value="blog" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                {getText('Blog Filters', 'ब्लॉग फ़िल्टर')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="search">{getText('Search', 'खोजें')}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder={getText('Title, content...', 'शीर्षक, सामग्री...')}
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>{getText('Status', 'स्थिति')}</Label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={getText('All Status', 'सभी स्थितियां')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{getText('All Status', 'सभी स���थितियां')}</SelectItem>
                      <SelectItem value="published">{getText('Published', 'प्रकाशित')}</SelectItem>
                      <SelectItem value="draft">{getText('Draft', 'मसौदा')}</SelectItem>
                      <SelectItem value="archived">{getText('Archived', 'संग्रहीत')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{getText('Category', 'श्रेणी')}</Label>
                  <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={getText('All Categories', 'सभी श्रेणियां')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{getText('All Categories', 'सभी श्रेणियां')}</SelectItem>
                      <SelectItem value="technology">{getText('Technology', 'प्रौद्योगिकी')}</SelectItem>
                      <SelectItem value="mobility">{getText('Mobility', 'गतिशीलता')}</SelectItem>
                      <SelectItem value="sustainability">{getText('Sustainability', 'स्थिरता')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{getText('Date From', 'दिनांक से')}</Label>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  />
                </div>

                <div>
                  <Label>{getText('Date To', 'दिनांक तक')}</Label>
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blog Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle>{getText('Blog Posts', 'ब्लॉग पोस्ट')} ({blogPosts.length})</CardTitle>
              <CardDescription>
                {getText('Manage your blog content', 'अपनी ब्लॉग सामग्री का प्रबंधन करें')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{getText('Title', 'शीर्षक')}</TableHead>
                      <TableHead>{getText('Author', 'लेखक')}</TableHead>
                      <TableHead>{getText('Status', 'स्थिति')}</TableHead>
                      <TableHead>{getText('Views', 'दृश्य')}</TableHead>
                      <TableHead>{getText('Published', 'प्रकाशित')}</TableHead>
                      <TableHead>{getText('Actions', 'क्रियाएं')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {language === 'hi' && post.titleHi ? post.titleHi : post.title}
                            </p>
                            <p className="text-sm text-gray-500">{post.slug}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{post.author}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(post.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-gray-400" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {post.publishedAt ? (
                            <div className="text-sm">
                              <div>{formatDate(post.publishedAt)}</div>
                              <div className="text-xs text-gray-500">
                                {getText('Updated:', 'अपडेट:')} {formatDate(post.updatedAt)}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Posts Tab */}
        <TabsContent value="careers" className="space-y-6">
          {/* Career Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle>{getText('Career Posts', 'करियर पोस्ट')} ({careerPosts.length})</CardTitle>
              <CardDescription>
                {getText('Manage job listings and applications', 'नौकरी की सूची और आवेदनों का प्रबंधन करें')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{getText('Position', 'पद')}</TableHead>
                      <TableHead>{getText('Department', 'विभाग')}</TableHead>
                      <TableHead>{getText('Location', 'स्थान')}</TableHead>
                      <TableHead>{getText('Type', 'प्रकार')}</TableHead>
                      <TableHead>{getText('Status', 'स्थिति')}</TableHead>
                      <TableHead>{getText('Applications', 'आवेदन')}</TableHead>
                      <TableHead>{getText('Actions', 'क्रियाएं')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {careerPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {language === 'hi' && post.titleHi ? post.titleHi : post.title}
                            </p>
                            <p className="text-sm text-gray-500">{post.experience}</p>
                            {post.salary && (
                              <p className="text-sm text-green-600">{post.salary}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{post.department}</TableCell>
                        <TableCell>{post.location}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {post.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(post.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="text-lg font-bold">{post.applicationsCount}</div>
                            <div className="text-xs text-gray-500">{getText('applications', 'आवेदन')}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`/careers/${post.id}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
          setEditingPost({});
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateDialogOpen ? 
                (activeTab === 'blog' ? getText('Create Blog Post', 'ब्लॉग पोस्ट बनाएं') : getText('Create Job Posting', 'नौकरी पोस्टिंग बनाएं')) :
                (activeTab === 'blog' ? getText('Edit Blog Post', 'ब्लॉग पोस्ट संपादित करें') : getText('Edit Job Posting', 'नौकरी पोस्टिंग संपादित करें'))
              }
            </DialogTitle>
            <DialogDescription>
              {activeTab === 'blog' 
                ? getText('Create or edit blog post content in multiple languages', 'कई भाषाओं में ब्लॉग पोस्ट सामग्री बनाएं या संपादित करें')
                : getText('Create or edit job posting details', 'नौकरी पोस्टिंग विवरण बनाएं या संपादित करें')
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {activeTab === 'blog' ? (
              // Blog Post Form
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{getText('Title (English)', 'शीर्षक (अंग्रेजी)')}</Label>
                    <Input
                      value={(editingPost as BlogPost)?.title || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter blog title"
                    />
                  </div>
                  <div>
                    <Label>{getText('Title (Hindi)', 'शीर्षक (हिंदी)')}</Label>
                    <Input
                      value={(editingPost as BlogPost)?.titleHi || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, titleHi: e.target.value }))}
                      placeholder="ब्लॉग शीर्षक दर्ज करें"
                    />
                  </div>
                  <div>
                    <Label>{getText('Slug', 'स्लग')}</Label>
                    <Input
                      value={(editingPost as BlogPost)?.slug || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="blog-post-url"
                    />
                  </div>
                  <div>
                    <Label>{getText('Author', 'लेखक')}</Label>
                    <Input
                      value={(editingPost as BlogPost)?.author || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Author name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{getText('Excerpt (English)', 'अंश (अंग्रेजी)')}</Label>
                    <Textarea
                      value={(editingPost as BlogPost)?.excerpt || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>{getText('Excerpt (Hindi)', 'अंश (हिंदी)')}</Label>
                    <Textarea
                      value={(editingPost as BlogPost)?.excerptHi || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, excerptHi: e.target.value }))}
                      placeholder="संक्षिप्त विवरण..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{getText('Content (English)', 'सामग्री (अंग्रेजी)')}</Label>
                    <Textarea
                      value={(editingPost as BlogPost)?.content || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Blog content..."
                      rows={8}
                    />
                  </div>
                  <div>
                    <Label>{getText('Content (Hindi)', 'सामग्री (हिंदी)')}</Label>
                    <Textarea
                      value={(editingPost as BlogPost)?.contentHi || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, contentHi: e.target.value }))}
                      placeholder="ब्लॉग सामग्री..."
                      rows={8}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>{getText('Status', 'स्थिति')}</Label>
                    <Select 
                      value={(editingPost as BlogPost)?.status || 'draft'} 
                      onValueChange={(value) => setEditingPost(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">{getText('Draft', 'मसौदा')}</SelectItem>
                        <SelectItem value="published">{getText('Published', 'प्रकाशित')}</SelectItem>
                        <SelectItem value="archived">{getText('Archived', 'संग्रहीत')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{getText('Featured Image URL', 'फीचर्ड इमेज URL')}</Label>
                    <Input
                      value={(editingPost as BlogPost)?.featuredImage || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, featuredImage: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label>{getText('Tags (comma separated)', 'टैग (कॉमा से अलग)')}</Label>
                    <Input
                      value={(editingPost as BlogPost)?.tags?.join(', ') || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, tags: e.target.value.split(', ').filter(tag => tag.trim()) }))}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Career Post Form
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{getText('Position Title (English)', 'पद शीर्षक (अंग्रेजी)')}</Label>
                    <Input
                      value={(editingPost as CareerPost)?.title || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>{getText('Position Title (Hindi)', 'पद शीर्षक (हिंदी)')}</Label>
                    <Input
                      value={(editingPost as CareerPost)?.titleHi || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, titleHi: e.target.value }))}
                      placeholder="सीनियर सॉफ्टवेयर इंजीनियर"
                    />
                  </div>
                  <div>
                    <Label>{getText('Department', 'विभाग')}</Label>
                    <Input
                      value={(editingPost as CareerPost)?.department || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Engineering"
                    />
                  </div>
                  <div>
                    <Label>{getText('Location', 'स्थान')}</Label>
                    <Input
                      value={(editingPost as CareerPost)?.location || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Bangalore"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label>{getText('Type', 'प्रकार')}</Label>
                    <Select 
                      value={(editingPost as CareerPost)?.type || 'full_time'} 
                      onValueChange={(value) => setEditingPost(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time">Full Time</SelectItem>
                        <SelectItem value="part_time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{getText('Experience', 'अनुभव')}</Label>
                    <Input
                      value={(editingPost as CareerPost)?.experience || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="2-5 years"
                    />
                  </div>
                  <div>
                    <Label>{getText('Salary', 'वेतन')}</Label>
                    <Input
                      value={(editingPost as CareerPost)?.salary || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, salary: e.target.value }))}
                      placeholder="₹10-15 LPA"
                    />
                  </div>
                  <div>
                    <Label>{getText('Status', 'स्थिति')}</Label>
                    <Select 
                      value={(editingPost as CareerPost)?.status || 'draft'} 
                      onValueChange={(value) => setEditingPost(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">{getText('Draft', 'मसौदा')}</SelectItem>
                        <SelectItem value="active">{getText('Active', 'सक्रिय')}</SelectItem>
                        <SelectItem value="closed">{getText('Closed', 'बंद')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{getText('Description (English)', 'विवरण (अंग्रेजी)')}</Label>
                    <Textarea
                      value={(editingPost as CareerPost)?.description || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Job description..."
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label>{getText('Description (Hindi)', 'विवरण (हिंदी)')}</Label>
                    <Textarea
                      value={(editingPost as CareerPost)?.descriptionHi || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, descriptionHi: e.target.value }))}
                      placeholder="नौकरी का विवरण..."
                      rows={6}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{getText('Requirements (English)', 'आवश्यकताएं (अंग्रेजी)')}</Label>
                    <Textarea
                      value={(editingPost as CareerPost)?.requirements?.join('\n') || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, requirements: e.target.value.split('\n').filter(req => req.trim()) }))}
                      placeholder="React.js&#10;Node.js&#10;TypeScript"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {getText('One requirement per line', 'प्रति पंक्ति एक आवश्यकता')}
                    </p>
                  </div>
                  <div>
                    <Label>{getText('Requirements (Hindi)', 'आवश्यकताएं (हिंदी)')}</Label>
                    <Textarea
                      value={(editingPost as CareerPost)?.requirementsHi?.join('\n') || ''}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, requirementsHi: e.target.value.split('\n').filter(req => req.trim()) }))}
                      placeholder="React.js&#10;Node.js&#10;TypeScript"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {getText('One requirement per line', 'प्रति पंक्ति एक आवश्यकता')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setIsEditDialogOpen(false);
                  setEditingPost({});
                }}
              >
                <X className="h-4 w-4 mr-2" />
                {getText('Cancel', 'रद्द करें')}
              </Button>
              <Button onClick={handleSavePost}>
                <Save className="h-4 w-4 mr-2" />
                {isCreateDialogOpen ? getText('Create', 'बनाएं') : getText('Save Changes', 'परिवर्तन सहेजें')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

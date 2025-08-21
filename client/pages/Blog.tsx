import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Zap,
  Leaf,
  Car,
  Battery,
  DollarSign,
  Star,
  MapPin,
  Share2,
  BookOpen,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  publishedAt: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How KWICK Riders Are Earning ₹50,000+ Monthly Through Smart Delivery Strategies',
      excerpt: 'Discover the proven strategies our top riders use to maximize their earnings with KWICK electric scooters.',
      content: 'Full blog content here...',
      author: 'Rajesh Kumar',
      authorRole: 'KWICK Success Coach',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-20',
      category: 'earnings',
      tags: ['delivery', 'earnings', 'strategy', 'success'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      readTime: 8,
      views: 2456,
      likes: 234,
      comments: 45,
      featured: true
    },
    {
      id: '2',
      title: 'The Environmental Impact: How Every KWICK Ride Saves the Planet',
      excerpt: 'Learn about the massive environmental benefits of choosing electric vehicles and how you contribute to a cleaner India.',
      content: 'Full blog content here...',
      author: 'Dr. Priya Sharma',
      authorRole: 'Environmental Scientist',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-18',
      category: 'environment',
      tags: ['environment', 'sustainability', 'green', 'impact'],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
      readTime: 6,
      views: 1789,
      likes: 156,
      comments: 28,
      featured: true
    },
    {
      id: '3',
      title: 'Battery Swap Revolution: Why KWICK\'s Network is Game-Changing',
      excerpt: 'Explore how our innovative battery swap technology eliminates range anxiety and keeps you moving.',
      content: 'Full blog content here...',
      author: 'Amit Singh',
      authorRole: 'Technology Lead',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-15',
      category: 'technology',
      tags: ['battery', 'technology', 'innovation', 'convenience'],
      image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop',
      readTime: 10,
      views: 3245,
      likes: 289,
      comments: 67,
      featured: false
    },
    {
      id: '4',
      title: 'From Zero to Hero: Success Stories of KWICK Delivery Partners',
      excerpt: 'Read inspiring stories of riders who transformed their lives with KWICK and now earn lakhs annually.',
      content: 'Full blog content here...',
      author: 'Neha Gupta',
      authorRole: 'Community Manager',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-12',
      category: 'success-stories',
      tags: ['success', 'inspiration', 'delivery', 'achievement'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      readTime: 12,
      views: 4156,
      likes: 478,
      comments: 89,
      featured: true
    },
    {
      id: '5',
      title: 'Complete Guide: KYC Process and Getting Started with KWICK',
      excerpt: 'Step-by-step guide to complete your KYC verification and start your KWICK journey in under 24 hours.',
      content: 'Full blog content here...',
      author: 'KWICK Support Team',
      authorRole: 'Customer Success',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-10',
      category: 'guide',
      tags: ['kyc', 'guide', 'onboarding', 'tutorial'],
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop',
      readTime: 5,
      views: 5678,
      likes: 345,
      comments: 123,
      featured: false
    },
    {
      id: '6',
      title: 'Cost Comparison: Renting vs Buying Electric Vehicles in 2024',
      excerpt: 'Detailed financial analysis showing why renting with KWICK is 60% more cost-effective than buying.',
      content: 'Full blog content here...',
      author: 'Financial Team',
      authorRole: 'Financial Analyst',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-08',
      category: 'finance',
      tags: ['cost', 'comparison', 'savings', 'analysis'],
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
      readTime: 15,
      views: 2134,
      likes: 167,
      comments: 34,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'earnings', name: 'Earnings & Tips', count: blogPosts.filter(p => p.category === 'earnings').length },
    { id: 'environment', name: 'Environment', count: blogPosts.filter(p => p.category === 'environment').length },
    { id: 'technology', name: 'Technology', count: blogPosts.filter(p => p.category === 'technology').length },
    { id: 'success-stories', name: 'Success Stories', count: blogPosts.filter(p => p.category === 'success-stories').length },
    { id: 'guide', name: 'Guides', count: blogPosts.filter(p => p.category === 'guide').length },
    { id: 'finance', name: 'Finance', count: blogPosts.filter(p => p.category === 'finance').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  const getCategoryIcon = (category: string) => {
    const icons = {
      'earnings': DollarSign,
      'environment': Leaf,
      'technology': Zap,
      'success-stories': Star,
      'guide': BookOpen,
      'finance': TrendingUp
    };
    const Icon = icons[category as keyof typeof icons] || BookOpen;
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'earnings': 'bg-green-100 text-green-800',
      'environment': 'bg-emerald-100 text-emerald-800',
      'technology': 'bg-blue-100 text-blue-800',
      'success-stories': 'bg-yellow-100 text-yellow-800',
      'guide': 'bg-purple-100 text-purple-800',
      'finance': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-red-600 to-red-700 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              KWICK Blog
            </h1>
            <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
              Insights, tips, and success stories from India's leading EV rental community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={post.id} className={`card-hover animate-fade-in ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className={`w-full object-cover rounded-t-lg ${index === 0 ? 'h-64 lg:h-80' : 'h-48'}`}
                  />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}>
                    {getCategoryIcon(post.category)}
                    <span className="ml-1 capitalize">{post.category.replace('-', ' ')}</span>
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-bold mb-3 hover:text-primary cursor-pointer transition-colors ${index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="lg:w-80">
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="justify-between w-full"
                  >
                    <span className="flex items-center">
                      {category.id !== 'all' && getCategoryIcon(category.id)}
                      <span className={category.id !== 'all' ? 'ml-2' : ''}>{category.name}</span>
                    </span>
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card key={post.id} className="card-hover animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}>
                    {getCategoryIcon(post.category)}
                    <span className="ml-1 capitalize">{post.category.replace('-', ' ')}</span>
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 hover:text-primary cursor-pointer transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views > 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Read
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-primary to-red-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with KWICK</h2>
          <p className="text-xl mb-8 text-red-100">
            Get the latest insights, tips, and success stories delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              className="bg-white text-gray-900 border-0"
            />
            <Button className="bg-white text-primary hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-red-200 mt-4">
            Join 10,000+ riders already subscribed to our newsletter
          </p>
        </section>
      </div>
    </div>
  );
}

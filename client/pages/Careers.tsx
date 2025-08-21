import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Clock, 
  IndianRupee,
  Users,
  TrendingUp,
  Zap,
  Heart,
  Coffee,
  Wifi,
  Car,
  Briefcase,
  GraduationCap,
  Target,
  Award,
  Globe,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Send,
  Building,
  Calendar,
  User
} from 'lucide-react';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  postedAt: string;
  urgency: 'low' | 'medium' | 'high';
  remote: boolean;
}

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const jobListings: JobListing[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Noida',
      type: 'full-time',
      experience: '3-5 years',
      salary: { min: 1200000, max: 2000000, currency: 'INR' },
      description: 'Join our engineering team to build the future of sustainable mobility in India. Work on cutting-edge EV technology and help scale our platform to millions of users.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years of experience with React, Node.js, and MongoDB',
        'Experience with cloud platforms (AWS/GCP)',
        'Strong problem-solving and communication skills',
        'Passion for sustainable technology'
      ],
      benefits: [
        'Competitive salary with equity',
        'Health insurance for family',
        'Flexible work hours',
        'Free KWICK vehicle access',
        'Learning and development budget'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
      postedAt: '2024-01-20',
      urgency: 'high',
      remote: true
    },
    {
      id: '2',
      title: 'Growth Marketing Manager',
      department: 'Marketing',
      location: 'Delhi',
      type: 'full-time',
      experience: '2-4 years',
      salary: { min: 800000, max: 1400000, currency: 'INR' },
      description: 'Drive user acquisition and engagement strategies for KWICK. Lead digital marketing campaigns and help us reach every corner of India.',
      requirements: [
        'MBA in Marketing or equivalent experience',
        'Experience with digital marketing and analytics',
        'Knowledge of growth hacking techniques',
        'Strong analytical and creative thinking',
        'Experience in startup environment preferred'
      ],
      benefits: [
        'Performance-based bonuses',
        'Health and wellness programs',
        'Team outings and events',
        'Professional development opportunities',
        'Stock options'
      ],
      skills: ['Digital Marketing', 'Analytics', 'Growth Hacking', 'SEO', 'Social Media'],
      postedAt: '2024-01-18',
      urgency: 'medium',
      remote: false
    },
    {
      id: '3',
      title: 'Operations Manager - Fleet',
      department: 'Operations',
      location: 'Gurgaon',
      type: 'full-time',
      experience: '4-7 years',
      salary: { min: 1000000, max: 1600000, currency: 'INR' },
      description: 'Oversee the day-to-day operations of our EV fleet. Ensure optimal vehicle utilization, maintenance scheduling, and customer satisfaction.',
      requirements: [
        'Bachelor\'s degree in Operations/Business',
        'Experience in fleet management or logistics',
        'Strong organizational and leadership skills',
        'Knowledge of automotive industry preferred',
        'Data-driven decision making approach'
      ],
      benefits: [
        'Company vehicle provided',
        'Travel allowances',
        'Health insurance',
        'Performance incentives',
        'Career growth opportunities'
      ],
      skills: ['Fleet Management', 'Operations', 'Leadership', 'Analytics', 'Project Management'],
      postedAt: '2024-01-15',
      urgency: 'high',
      remote: false
    },
    {
      id: '4',
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Bangalore',
      type: 'full-time',
      experience: '2-4 years',
      salary: { min: 700000, max: 1200000, currency: 'INR' },
      description: 'Create beautiful and intuitive user experiences for our mobile and web applications. Help design the future of sustainable mobility.',
      requirements: [
        'Bachelor\'s degree in Design or related field',
        'Proficiency in Figma, Sketch, or similar tools',
        'Strong portfolio demonstrating UX/UI skills',
        'Understanding of mobile-first design principles',
        'Experience with design systems'
      ],
      benefits: [
        'Creative freedom and ownership',
        'Latest design tools and equipment',
        'Flexible work arrangements',
        'Design conference attendance',
        'Mentorship programs'
      ],
      skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Design Systems'],
      postedAt: '2024-01-12',
      urgency: 'medium',
      remote: true
    },
    {
      id: '5',
      title: 'Customer Success Specialist',
      department: 'Customer Success',
      location: 'Mumbai',
      type: 'full-time',
      experience: '1-3 years',
      salary: { min: 500000, max: 800000, currency: 'INR' },
      description: 'Be the voice of our customers and ensure they have the best possible experience with KWICK. Help solve problems and drive customer satisfaction.',
      requirements: [
        'Excellent communication skills in Hindi and English',
        'Customer service experience preferred',
        'Problem-solving mindset',
        'Empathy and patience',
        'Tech-savvy with learning agility'
      ],
      benefits: [
        'Comprehensive training program',
        'Career advancement opportunities',
        'Health benefits',
        'Work-life balance',
        'Team building activities'
      ],
      skills: ['Customer Service', 'Communication', 'Problem Solving', 'CRM Tools', 'Multi-lingual'],
      postedAt: '2024-01-10',
      urgency: 'low',
      remote: false
    },
    {
      id: '6',
      title: 'Data Scientist',
      department: 'Data & Analytics',
      location: 'Pune',
      type: 'full-time',
      experience: '3-6 years',
      salary: { min: 1400000, max: 2200000, currency: 'INR' },
      description: 'Use data to drive business decisions and optimize our platform. Build predictive models and extract insights from our growing dataset.',
      requirements: [
        'Master\'s degree in Data Science, Statistics, or related field',
        'Strong programming skills in Python/R',
        'Experience with machine learning frameworks',
        'Knowledge of SQL and data visualization tools',
        'Experience with big data technologies'
      ],
      benefits: [
        'Cutting-edge technology stack',
        'Conference and training budget',
        'Flexible work environment',
        'Research opportunities',
        'Competitive compensation'
      ],
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
      postedAt: '2024-01-08',
      urgency: 'high',
      remote: true
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: jobListings.length },
    { id: 'Engineering', name: 'Engineering', count: jobListings.filter(j => j.department === 'Engineering').length },
    { id: 'Marketing', name: 'Marketing', count: jobListings.filter(j => j.department === 'Marketing').length },
    { id: 'Operations', name: 'Operations', count: jobListings.filter(j => j.department === 'Operations').length },
    { id: 'Design', name: 'Design', count: jobListings.filter(j => j.department === 'Design').length },
    { id: 'Customer Success', name: 'Customer Success', count: jobListings.filter(j => j.department === 'Customer Success').length },
    { id: 'Data & Analytics', name: 'Data & Analytics', count: jobListings.filter(j => j.department === 'Data & Analytics').length }
  ];

  const locations = ['all', 'Noida', 'Delhi', 'Gurgaon', 'Bangalore', 'Mumbai', 'Pune'];
  const jobTypes = ['all', 'full-time', 'part-time', 'contract', 'internship'];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  const getUrgencyBadge = (urgency: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return (
      <Badge className={variants[urgency as keyof typeof variants]}>
        {urgency === 'high' ? 'Urgent' : urgency === 'medium' ? 'Active' : 'Open'}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      'full-time': 'bg-blue-100 text-blue-800',
      'part-time': 'bg-purple-100 text-purple-800',
      'contract': 'bg-orange-100 text-orange-800',
      'internship': 'bg-green-100 text-green-800'
    };
    return (
      <Badge className={variants[type as keyof typeof variants]}>
        {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    const format = (amount: number) => {
      if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)}Cr`;
      if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`;
      return amount.toLocaleString();
    };
    return `₹${format(salary.min)} - ₹${format(salary.max)}`;
  };

  const companyValues = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technology to solve real-world problems'
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Building a greener future for India through clean mobility'
    },
    {
      icon: Users,
      title: 'Team Spirit',
      description: 'Collaborative culture where everyone\'s voice matters'
    },
    {
      icon: TrendingUp,
      title: 'Growth Mindset',
      description: 'Continuous learning and development opportunities'
    }
  ];

  const perks = [
    { icon: Coffee, text: 'Free meals and snacks' },
    { icon: Wifi, text: 'High-speed internet and latest tech' },
    { icon: Car, text: 'Free KWICK vehicle access' },
    { icon: GraduationCap, text: 'Learning and development budget' },
    { icon: Heart, text: 'Comprehensive health insurance' },
    { icon: Globe, text: 'Flexible work arrangements' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-red-600 to-red-700 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join the KWICK Revolution
            </h1>
            <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
              Help us build the future of sustainable mobility in India. Join a team that's making a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Learn About KWICK
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work at KWICK?</h2>
            <p className="text-xl text-gray-600">
              We're not just building a company, we're building the future of transportation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center card-hover animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Perks & Benefits */}
        <section className="mb-16 bg-white rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perks & Benefits</h2>
            <p className="text-gray-600">We take care of our team so they can focus on building amazing things</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors animate-slide-in-left" style={{animationDelay: `${index * 0.05}s`}}>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <perk.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{perk.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Job Search and Filters */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600">Find your perfect role and start making an impact</p>
          </div>

          <Card className="p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name} ({dept.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </section>

        {/* Job Listings */}
        <section>
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <Card key={job.id} className="card-hover animate-slide-up" style={{animationDelay: `${index * 0.05}s`}}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="outline" className="flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {job.department}
                            </Badge>
                            <Badge variant="outline" className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </Badge>
                            {getTypeBadge(job.type)}
                            {getUrgencyBadge(job.urgency)}
                            {job.remote && (
                              <Badge className="bg-purple-100 text-purple-800">Remote</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          <span>{formatSalary(job.salary)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 5).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 5 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Button className="bg-primary hover:bg-primary/90">
                        Apply Now
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-primary to-red-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl mb-8 text-red-100">
            We're always looking for talented people. Send us your resume and let's talk!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              <User className="mr-2 h-5 w-5" />
              Send Resume
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Send className="mr-2 h-5 w-5" />
              Contact HR
            </Button>
          </div>
          <p className="text-sm text-red-200 mt-6">
            📧 careers@kwick.in | 📞 +91 98765 43210
          </p>
        </section>

        {/* Company Stats */}
        <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Team Members</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-gray-600">Offices</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl font-bold text-primary mb-2">10k+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="text-3xl font-bold text-primary mb-2">₹50Cr+</div>
            <div className="text-gray-600">Funding Raised</div>
          </div>
        </section>
      </div>
    </div>
  );
}

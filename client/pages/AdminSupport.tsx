import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Plus, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Tag,
  Eye,
  Edit,
  Trash2,
  Send,
  Star,
  TrendingUp,
  Users,
  Timer,
  Zap,
  FileText,
  ArrowRight,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import AIChat from '@/components/AIChat';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'kyc' | 'rental' | 'battery' | 'general';
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responseTime?: number;
  resolutionTime?: number;
  rating?: number;
  feedback?: string;
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  ticketId: string;
  sender: 'user' | 'admin';
  senderName: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export default function AdminSupport() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT001',
      title: 'Battery swap station not working',
      description: 'The battery swap station at Sector 112 is showing error and not accepting battery swaps.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      userId: 'USR001',
      userName: 'Raj Kumar',
      userEmail: 'raj.kumar@email.com',
      userPhone: '+91 98765 43210',
      assignedTo: 'Admin User',
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T10:30:00Z',
      messages: [
        {
          id: 'MSG001',
          ticketId: 'TKT001',
          sender: 'user',
          senderName: 'Raj Kumar',
          message: 'The battery swap station at Sector 112 is showing error and not accepting battery swaps. I need urgent help as I\'m currently on a delivery.',
          timestamp: '2024-01-20T10:30:00Z'
        }
      ]
    },
    {
      id: 'TKT002',
      title: 'KYC verification taking too long',
      description: 'My KYC has been pending for 3 days. Please expedite the process.',
      status: 'in_progress',
      priority: 'medium',
      category: 'kyc',
      userId: 'USR002',
      userName: 'Priya Sharma',
      userEmail: 'priya.sharma@email.com',
      userPhone: '+91 98765 43211',
      assignedTo: 'KYC Team',
      createdAt: '2024-01-18T14:20:00Z',
      updatedAt: '2024-01-20T09:15:00Z',
      responseTime: 4,
      messages: [
        {
          id: 'MSG002',
          ticketId: 'TKT002',
          sender: 'user',
          senderName: 'Priya Sharma',
          message: 'My KYC has been pending for 3 days. Please expedite the process.',
          timestamp: '2024-01-18T14:20:00Z'
        },
        {
          id: 'MSG003',
          ticketId: 'TKT002',
          sender: 'admin',
          senderName: 'KYC Team',
          message: 'Hi Priya, we are reviewing your documents. We need a clearer image of your address proof. Please reupload.',
          timestamp: '2024-01-18T18:20:00Z'
        }
      ]
    },
    {
      id: 'TKT003',
      title: 'Payment refund request',
      description: 'I was charged twice for the weekly rental. Please refund the extra amount.',
      status: 'resolved',
      priority: 'medium',
      category: 'billing',
      userId: 'USR003',
      userName: 'Amit Singh',
      userEmail: 'amit.singh@email.com',
      userPhone: '+91 98765 43212',
      assignedTo: 'Finance Team',
      createdAt: '2024-01-15T11:45:00Z',
      updatedAt: '2024-01-17T16:30:00Z',
      responseTime: 2,
      resolutionTime: 48,
      rating: 5,
      feedback: 'Quick resolution, very satisfied!',
      messages: [
        {
          id: 'MSG004',
          ticketId: 'TKT003',
          sender: 'user',
          senderName: 'Amit Singh',
          message: 'I was charged twice for the weekly rental. Please refund the extra amount.',
          timestamp: '2024-01-15T11:45:00Z'
        },
        {
          id: 'MSG005',
          ticketId: 'TKT003',
          sender: 'admin',
          senderName: 'Finance Team',
          message: 'We have verified the double charge. The refund of ₹693 has been processed and will reflect in 3-5 business days.',
          timestamp: '2024-01-17T16:30:00Z'
        }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-red-100 text-red-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      technical: Zap,
      billing: FileText,
      kyc: User,
      rental: MessageCircle,
      battery: Timer,
      general: MessageSquare
    };
    
    const Icon = icons[category as keyof typeof icons] || MessageSquare;
    return <Icon className="h-4 w-4" />;
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: tickets.filter(t => t.responseTime).reduce((acc, t) => acc + (t.responseTime || 0), 0) / tickets.filter(t => t.responseTime).length || 0,
    avgRating: tickets.filter(t => t.rating).reduce((acc, t) => acc + (t.rating || 0), 0) / tickets.filter(t => t.rating).length || 0
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const message: TicketMessage = {
      id: `MSG${Date.now()}`,
      ticketId: selectedTicket.id,
      sender: 'admin',
      senderName: 'Admin User',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { 
            ...ticket, 
            messages: [...ticket.messages, message],
            updatedAt: new Date().toISOString()
          }
        : ticket
    ));

    setNewMessage('');
  };

  const updateTicketStatus = (ticketId: string, status: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: status as any, updatedAt: new Date().toISOString() }
        : ticket
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-1">Manage customer support requests and queries</p>
        </div>
        <Button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          AI Assistant
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.open}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime.toFixed(1)}h</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-1">{stats.avgRating.toFixed(1)}</div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Priority</Label>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Category</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="kyc">KYC</SelectItem>
                      <SelectItem value="rental">Rental</SelectItem>
                      <SelectItem value="battery">Battery</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTickets.map((ticket) => (
              <Card 
                key={ticket.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTicket?.id === ticket.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(ticket.category)}
                      <span className="font-medium text-sm">{ticket.id}</span>
                    </div>
                    <div className="flex space-x-1">
                      {getPriorityBadge(ticket.priority)}
                      {getStatusBadge(ticket.status)}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{ticket.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ticket.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{ticket.userName}</span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      {getCategoryIcon(selectedTicket.category)}
                      <span className="ml-2">{selectedTicket.title}</span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Ticket #{selectedTicket.id} • Created {new Date(selectedTicket.createdAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {getPriorityBadge(selectedTicket.priority)}
                    {getStatusBadge(selectedTicket.status)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Customer Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Customer Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTicket.userName}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTicket.userEmail}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTicket.userPhone}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTicket.category}</span>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="flex items-center space-x-3">
                  <Label>Update Status:</Label>
                  <Select 
                    value={selectedTicket.status} 
                    onValueChange={(value) => updateTicketStatus(selectedTicket.id, value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Messages */}
                <div>
                  <h4 className="font-medium mb-3">Conversation</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {selectedTicket.messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'admin' 
                            ? 'bg-primary text-white rounded-br-sm' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">
                              {message.senderName}
                            </span>
                            <span className="text-xs opacity-75">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your response..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-primary hover:bg-primary/90"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Resolution & Rating */}
                {selectedTicket.status === 'resolved' && selectedTicket.rating && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-green-800">Customer Feedback</h4>
                    <div className="flex items-center mb-2">
                      <span className="text-sm mr-2">Rating:</span>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < selectedTicket.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm">({selectedTicket.rating}/5)</span>
                    </div>
                    {selectedTicket.feedback && (
                      <p className="text-sm text-green-700">"{selectedTicket.feedback}"</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Ticket</h3>
                <p className="text-gray-600">Choose a support ticket from the list to view details and respond</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChat isVisible={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Phone,
  Mail,
  ExternalLink,
  Zap,
  Battery,
  CreditCard,
  FileCheck,
  MapPin,
  Clock,
  HelpCircle
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: string[];
}

interface AIChatProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

export default function AIChat({ isVisible = false, onToggle }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(isVisible);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm KWICK AI Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: ['Rental Plans', 'Battery Swap', 'KYC Status', 'Earnings Info']
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const predefinedResponses = {
    'rental plans': {
      text: "KWICK offers flexible rental plans:\n\n• Daily: ₹99/day\n• Weekly: ₹693/week (Save ₹0)\n• Monthly: ₹2,970/month (Save ₹0)\n\nAll plans include:\n✅ Unlimited battery swaps\n✅ Full maintenance\n✅ Insurance coverage\n✅ 24/7 support",
      quickReplies: ['Book Now', 'Battery Swap Info', 'Contact Support']
    },
    'battery swap': {
      text: "Free unlimited battery swaps at 50+ stations!\n\n🔋 Swap time: Under 30 seconds\n📍 Available 24/7 at major locations\n🗺️ Find stations using our map\n⚡ Always 100% charged batteries\n\nNeed directions to nearest station?",
      quickReplies: ['Find Stations', 'Swap Process', 'Station Hours']
    },
    'kyc status': {
      text: "KYC verification typically takes 2-4 hours.\n\nRequired documents:\n📄 Aadhaar Card\n🆔 Driving License\n🏠 Address Proof\n💳 PAN Card\n\nCheck your account page for current status!",
      quickReplies: ['Check Status', 'Upload Documents', 'KYC Help']
    },
    'earnings info': {
      text: "Earn ₹15,000-₹50,000 monthly with KWICK!\n\n💰 Food Delivery: ₹15,000-₹25,000\n📦 E-commerce: ₹20,000-₹35,000\n⚡ Quick Commerce: ₹18,000-₹30,000\n🏆 Premium Services: ₹25,000-₹50,000\n\nNo fuel costs, no maintenance!",
      quickReplies: ['Delivery Partners', 'How to Start', 'Success Stories']
    },
    'book now': {
      text: "Ready to start your KWICK journey?\n\n1️⃣ Complete registration\n2️⃣ Upload KYC documents\n3️⃣ Choose your plan\n4️⃣ Start earning!\n\n📞 Call: +91 98765 43210\n📧 Email: support@kwick.in",
      quickReplies: ['Call Now', 'Register', 'Visit Office']
    },
    'contact support': {
      text: "Get instant help:\n\n📞 Phone: +91 98765 43210\n📧 Email: support@kwick.in\n🏢 Office: Sector 112, Noida\n⏰ Hours: 24/7 support\n\nOr continue chatting with me!",
      quickReplies: ['Call Support', 'Email Support', 'Office Location']
    },
    'default': {
      text: "I understand you need help! Here are some things I can assist with:\n\n• Rental plans and pricing\n• Battery swap locations\n• KYC verification process\n• Earning opportunities\n• Technical support\n\nWhat would you like to know more about?",
      quickReplies: ['Rental Plans', 'Battery Swap', 'Earnings', 'Support']
    }
  };

  const getBotResponse = (userMessage: string): { text: string; quickReplies?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('rental') || message.includes('plan') || message.includes('price')) {
      return predefinedResponses['rental plans'];
    } else if (message.includes('battery') || message.includes('swap') || message.includes('charging')) {
      return predefinedResponses['battery swap'];
    } else if (message.includes('kyc') || message.includes('verification') || message.includes('document')) {
      return predefinedResponses['kyc status'];
    } else if (message.includes('earn') || message.includes('money') || message.includes('delivery') || message.includes('income')) {
      return predefinedResponses['earnings info'];
    } else if (message.includes('book') || message.includes('start') || message.includes('register')) {
      return predefinedResponses['book now'];
    } else if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return predefinedResponses['contact support'];
    } else {
      return predefinedResponses['default'];
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(currentMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setCurrentMessage(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    onToggle?.();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          size="lg"
          className="bg-primary hover:bg-primary/90 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-bounce" />
        <div className="absolute top-20 right-0 bg-black text-white text-xs px-3 py-1 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
          Need help? Chat with AI!
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="h-full shadow-2xl border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary to-red-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm">KWICK AI Assistant</CardTitle>
                <div className="flex items-center space-x-1 text-xs text-green-200">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                onClick={() => setIsMinimized(!isMinimized)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                onClick={toggleChat}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`p-3 rounded-lg whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {message.quickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs h-6 px-2 bg-white hover:bg-gray-50 border-gray-300"
                              onClick={() => handleQuickReply(reply)}
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t bg-gray-50">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8"
                  onClick={() => window.open('tel:+919876543210')}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call Support
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8"
                  onClick={() => window.open('/battery-map')}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  Find Stations
                </Button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  disabled={!currentMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by KWICK AI • Available 24/7
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

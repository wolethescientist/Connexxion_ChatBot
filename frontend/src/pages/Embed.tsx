import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { publicChatWithBot } from '@/lib/api';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotInfo {
  id: string;
  chatbot_name: string;
  organization_name: string;
}

const Embed = () => {
  const { chatbotId } = useParams<{ chatbotId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatbotInfo, setChatbotInfo] = useState<ChatbotInfo | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock chatbot info - replace with actual API call
    setChatbotInfo({
      id: chatbotId || '',
      chatbot_name: 'Support Assistant',
      organization_name: 'TechCorp',
    });

    // Add welcome message
    setMessages([
      {
        id: '1',
        content: 'Hello! I\'m here to help. What can I assist you with today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, [chatbotId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (!chatbotId) throw new Error('Chatbot ID is missing');
      const data = await publicChatWithBot(parseInt(chatbotId), inputMessage);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <header className="border-b bg-card flex items-center p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="h-8 w-8 p-0 mr-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          {chatbotInfo && (
            <div>
              <h1 className="text-sm font-semibold">{chatbotInfo.chatbot_name}</h1>
              <p className="text-xs text-muted-foreground">{chatbotInfo.organization_name}</p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <Badge variant="secondary" className="bg-success/10 text-success text-xs">
            Online
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* Chat Content */}
      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-secondary/5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[85%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border'
                    }`}
                    style={message.sender === 'user' ? { background: 'var(--gradient-primary)' } : {}}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-card border rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="text-xs text-muted-foreground">Typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t bg-card p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 text-sm"
              />
              <Button 
                onClick={sendMessage} 
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Minimized State */}
      {isMinimized && (
        <div className="p-4 text-center">
          <p className="text-sm text-muted-foreground">Chat minimized</p>
        </div>
      )}
    </div>
  );
};

export default Embed;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Bot, Plus, MessageCircle, Trash2, ExternalLink, Calendar, Building, Code } from 'lucide-react';
import CreateChatbotDialog from '@/components/CreateChatbotDialog';
import IntegrationDialog from '@/components/IntegrationDialog';
import { getUserChatbots, deleteChatbot, createChatbot } from '@/lib/api';

interface Chatbot {
  id: string;
  organization_name: string;
  chatbot_name: string;
  created_at: string;
  website_url?: string;
  has_pdf: boolean;
}

const Dashboard = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchChatbots();
  }, [user, navigate]);

  const fetchChatbots = async () => {
    try {
      setIsLoading(true);
      const data = await getUserChatbots();
      // Transform the data to match the Chatbot interface
      const transformedChatbots: Chatbot[] = data.map((bot: any) => ({
        id: bot.id.toString(),
        organization_name: bot.organization_name,
        chatbot_name: bot.chatbot_name,
        created_at: bot.created_at,
        website_url: bot.website_url,
        has_pdf: bot.pdf_data !== null,
      }));
      setChatbots(transformedChatbots);
    } catch (error) {
      toast({
        title: 'Failed to load chatbots',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChatbot = async (chatbotId: string) => {
    try {
      await deleteChatbot(chatbotId);
      setChatbots(chatbots.filter(bot => bot.id !== chatbotId));
      toast({
        title: 'Chatbot deleted',
        description: 'The chatbot has been successfully removed.',
      });
    } catch (error) {
      toast({
        title: 'Failed to delete chatbot',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-12 h-12 text-primary mx-auto animate-pulse" />
          <p className="text-muted-foreground mt-2">Loading your chatbots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Connexxion Agent</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user?.username}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Your Chatbots</h2>
            <p className="text-muted-foreground">Manage and monitor your AI assistants</p>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            style={{ background: 'var(--gradient-primary)' }}
            className="shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Chatbot
          </Button>
        </div>

        {/* Chatbots Grid */}
        {chatbots.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No chatbots yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first chatbot to get started with AI-powered customer support.
              </p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Chatbot
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatbots.map((chatbot) => (
              <Card 
                key={chatbot.id} 
                className="hover:shadow-lg transition-all duration-200 border-0"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{chatbot.chatbot_name}</CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Building className="w-3 h-3 mr-1" />
                        {chatbot.organization_name}
                      </CardDescription>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Created {formatDate(chatbot.created_at)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {chatbot.has_pdf && (
                      <Badge variant="secondary" className="text-xs">PDF Training</Badge>
                    )}
                    {chatbot.website_url && (
                      <Badge variant="secondary" className="text-xs">Website URL</Badge>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/chat/${chatbot.id}`)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedChatbotId(chatbot.id);
                        setIsIntegrationDialogOpen(true);
                      }}
                    >
                      <Code className="w-4 h-4 mr-1" />
                      Integrate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteChatbot(chatbot.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <CreateChatbotDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onChatbotCreated={fetchChatbots}
      />

      <IntegrationDialog 
        open={isIntegrationDialogOpen}
        onOpenChange={setIsIntegrationDialogOpen}
        chatbotId={selectedChatbotId}
      />
    </div>
  );
};

export default Dashboard;
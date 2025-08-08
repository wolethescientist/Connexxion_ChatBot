import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Link as LinkIcon } from 'lucide-react';
import { createChatbot } from '@/lib/api';

interface CreateChatbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChatbotCreated: () => void;
}

const CreateChatbotDialog: React.FC<CreateChatbotDialogProps> = ({
  open,
  onOpenChange,
  onChatbotCreated,
}) => {
  const [formData, setFormData] = useState({
    organization_name: '',
    chatbot_name: '',
    website_url: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('organization_name', formData.organization_name);
      formDataToSend.append('chatbot_name', formData.chatbot_name);
      if (formData.website_url) {
        formDataToSend.append('website_url', formData.website_url);
      }
      if (selectedFile) {
        formDataToSend.append('pdf_file', selectedFile);
      }

      await createChatbot(
        formData.organization_name, 
        formData.chatbot_name, 
        selectedFile, 
        formData.website_url || undefined
      );
      
      toast({
        title: 'Chatbot created successfully',
        description: `${formData.chatbot_name} is ready to use!`,
      });

      onChatbotCreated();
      onOpenChange(false);
      
      // Reset form
      setFormData({ organization_name: '', chatbot_name: '', website_url: '' });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: 'Failed to create chatbot',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select a PDF file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Chatbot</DialogTitle>
          <DialogDescription>
            Set up your AI assistant with training data from PDFs or website content.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="organization_name">Organization Name</Label>
            <Input
              id="organization_name"
              placeholder="e.g., Acme Corp"
              value={formData.organization_name}
              onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chatbot_name">Chatbot Name</Label>
            <Input
              id="chatbot_name"
              placeholder="e.g., Support Assistant"
              value={formData.chatbot_name}
              onChange={(e) => setFormData({ ...formData, chatbot_name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL (Optional)</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="website_url"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdf_file">Training PDF (Optional)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="pdf_file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-primary/10 file:text-primary"
              />
              {selectedFile && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Upload className="w-4 h-4 mr-1" />
                  {selectedFile.name}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              style={{ background: 'var(--gradient-primary)' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Chatbot'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatbotDialog;
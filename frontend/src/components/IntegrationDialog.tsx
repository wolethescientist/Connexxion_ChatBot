import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check } from 'lucide-react';

interface IntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatbotId: string | null;
}

const IntegrationDialog = ({ open, onOpenChange, chatbotId }: IntegrationDialogProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<'iframe' | 'bubble' | null>(null);

  if (!chatbotId) return null;

  const iframeCode = `<iframe\n  src="${window.location.origin}/embed/${chatbotId}"\n  width="400"\n  height="600"\n  style="border:none;"\n></iframe>`;
  const bubbleCode = `<script \n  src="${window.location.origin}/connexxion-widget.js" \n  data-chatbot-id="${chatbotId}"\n  defer\n></script>`;

  const copyToClipboard = (text: string, type: 'iframe' | 'bubble') => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: 'Copied to clipboard!' });
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }, (err) => {
      toast({ title: 'Failed to copy', description: err.message, variant: 'destructive' });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Integrate Chatbot</DialogTitle>
          <DialogDescription>
            Add this chatbot to your website by embedding the code below.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="bubble">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bubble">Chat Bubble</TabsTrigger>
            <TabsTrigger value="iframe">Iframe Embed</TabsTrigger>
          </TabsList>
          <TabsContent value="bubble">
            <div className="p-4 bg-secondary rounded-md mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Add a chat bubble to the bottom corner of your site. 
              </p>
              <div className="relative">
                <pre className="bg-background p-4 rounded-md text-sm overflow-x-auto"><code>{bubbleCode}</code></pre>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={() => copyToClipboard(bubbleCode, 'bubble')}
                >
                  {copied === 'bubble' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="iframe">
            <div className="p-4 bg-secondary rounded-md mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Embed the chat directly into your page content.
              </p>
              <div className="relative">
                <pre className="bg-background p-4 rounded-md text-sm overflow-x-auto"><code>{iframeCode}</code></pre>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={() => copyToClipboard(iframeCode, 'iframe')}
                >
                  {copied === 'iframe' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationDialog;

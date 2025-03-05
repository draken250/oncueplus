
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontal, ArrowDownCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  project_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  sender?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

interface ChatInterfaceProps {
  projectId: string;
  receiverId: string;
  receiverName: string;
}

const ChatInterface = ({ projectId, receiverId, receiverName }: ChatInterfaceProps) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Check if we should automatically scroll to bottom (if user is at bottom or new message is from user)
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        
        // Create messages table if it doesn't exist
        await createMessagesTableIfNeeded();
        
        const { data, error } = await supabase
          .from('project_messages')
          .select(`
            *,
            sender:sender_id(first_name, last_name, avatar_url)
          `)
          .eq('project_id', projectId)
          .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: 'Error fetching messages',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    const createMessagesTableIfNeeded = async () => {
      try {
        // Try to query the table to see if it exists
        const { error } = await supabase
          .from('project_messages')
          .select('id')
          .limit(1);
          
        // If we get an error about the relation not existing, create it
        if (error && error.message.includes('relation "project_messages" does not exist')) {
          toast({
            title: 'Setting up chat',
            description: 'First-time chat initialization...',
          });
          
          // We'll assume the user will run SQL to create the table
          // For now, let's just notify them
          toast({
            title: 'Chat system needs setup',
            description: 'Please contact support to complete chat setup.',
          });
        }
      } catch (error) {
        console.error('Error checking messages table:', error);
      }
    };

    if (user && projectId) {
      fetchMessages();
    }
    
    // Set up real-time subscription
    const channel = supabase
      .channel('project_messages_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'project_messages',
        filter: `project_id=eq.${projectId}`
      }, async (payload) => {
        // When a new message arrives, fetch the sender details
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', payload.new.sender_id)
          .single();
        
        if (!error) {
          const newMsg = {
            ...payload.new,
            sender: data
          };
          
          setMessages(current => [...current, newMsg]);
          
          // Auto-scroll to bottom for new messages if they're from the current user
          // or if the user is already at the bottom
          if (payload.new.sender_id === user?.id || shouldScrollToBottom) {
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, user, toast, shouldScrollToBottom]);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [isLoading, messages.length]);

  // Track scroll position to determine if we should auto-scroll on new messages
  useEffect(() => {
    const handleScroll = () => {
      if (!messagesContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      
      setShouldScrollToBottom(isAtBottom);
    };
    
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    try {
      setIsSending(true);
      
      const { error } = await supabase
        .from('project_messages')
        .insert({
          project_id: projectId,
          sender_id: user?.id,
          receiver_id: receiverId,
          content: newMessage.trim(),
          created_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error sending message',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col h-[500px]">
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-muted-foreground mb-2">No messages yet</p>
              <p className="text-sm text-muted-foreground">
                Send a message to start the conversation with {receiverName}
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isCurrentUser={message.sender_id === user?.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        
        {!shouldScrollToBottom && messages.length > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-16 right-6 rounded-full shadow-md"
            onClick={scrollToBottom}
          >
            <ArrowDownCircle className="h-5 w-5" />
          </Button>
        )}
        
        <div className="p-3 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isSending}
              className="flex-1"
            />
            <Button type="submit" disabled={isSending || !newMessage.trim()}>
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;

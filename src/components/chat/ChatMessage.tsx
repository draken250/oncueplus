
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const ChatMessage = ({ message, isCurrentUser }: ChatMessageProps) => {
  const senderName = message.sender 
    ? `${message.sender.first_name || ''} ${message.sender.last_name || ''}`.trim() 
    : 'User';
  
  const initials = senderName !== 'User' 
    ? `${message.sender?.first_name?.[0] || ''}${message.sender?.last_name?.[0] || ''}`.toUpperCase() 
    : 'U';
    
  const formattedTime = format(new Date(message.created_at), 'h:mm a');
  const formattedDate = format(new Date(message.created_at), 'MMM d');

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[75%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isCurrentUser && (
          <Avatar className="h-8 w-8 mt-1 flex-shrink-0 mx-2">
            <AvatarImage src={message.sender?.avatar_url || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        )}
        
        <div>
          <div 
            className={`
              rounded-lg px-4 py-2 
              ${isCurrentUser 
                ? 'bg-primary text-primary-foreground mr-2' 
                : 'bg-muted'
              }
            `}
          >
            <p className="whitespace-pre-line break-words">{message.content}</p>
          </div>
          
          <div 
            className={`
              text-xs text-muted-foreground mt-1 
              ${isCurrentUser ? 'text-right mr-2' : 'text-left ml-2'}
            `}
          >
            {formattedTime} · {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

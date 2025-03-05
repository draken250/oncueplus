
import { FC, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  CalendarDays, 
  ChevronLeft, 
  Clock, 
  Edit, 
  MessageCircle, 
  PauseCircle, 
  PlayCircle, 
  SendHorizontal, 
  UserCircle,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/chat/ChatInterface';

interface Person {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'completed' | 'paused';
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  client?: Person;
  client_id: string;
  freelancer?: Person;
  freelancer_id: string;
}

interface ProjectDetailsProps {
  project: Project;
  isFreelancer: boolean;
  onBack: () => void;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({ project, isFreelancer, onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState(project.status);
  
  const person = isFreelancer ? project.client : project.freelancer;
  const personName = person ? `${person.first_name || ''} ${person.last_name || ''}`.trim() : 'Unknown';
  const personInitials = personName !== 'Unknown' 
    ? `${person.first_name?.[0] || ''}${person.last_name?.[0] || ''}`.toUpperCase() 
    : '??';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const updateProjectStatus = async (newStatus: 'active' | 'completed' | 'paused') => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id);
      
      if (error) throw error;
      
      setCurrentStatus(newStatus);
      
      toast({
        title: 'Status updated',
        description: `Project status changed to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating project status:', error);
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="mb-4 -ml-2" 
        onClick={onBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <Badge className={getStatusColor(currentStatus)}>
                      {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                    </Badge>
                  </CardDescription>
                </div>
                
                {isFreelancer && (
                  <div className="flex gap-2">
                    {currentStatus !== 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => updateProjectStatus('active')}
                      >
                        <PlayCircle className="mr-1 h-4 w-4" /> Activate
                      </Button>
                    )}
                    
                    {currentStatus !== 'paused' && currentStatus !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => updateProjectStatus('paused')}
                      >
                        <PauseCircle className="mr-1 h-4 w-4" /> Pause
                      </Button>
                    )}
                    
                    {currentStatus !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => updateProjectStatus('completed')}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" /> Complete
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project.description || 'No description provided.'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>
                      Created: {format(new Date(project.created_at), 'PPP')}
                    </span>
                  </div>
                  
                  {project.start_date && (
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      <span>
                        Started: {format(new Date(project.start_date), 'PPP')}
                      </span>
                    </div>
                  )}
                  
                  {project.end_date && (
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      <span>
                        Deadline: {format(new Date(project.end_date), 'PPP')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="messages">
            <TabsList>
              <TabsTrigger value="messages" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" /> Messages
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messages" className="mt-4">
              <ChatInterface
                projectId={project.id}
                receiverId={isFreelancer ? project.client_id : project.freelancer_id}
                receiverName={personName}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {isFreelancer ? 'Client' : 'Freelancer'} Details
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={person?.avatar_url || ''} />
                  <AvatarFallback>{personInitials}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-medium">{personName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isFreelancer ? 'Client' : 'Freelancer'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

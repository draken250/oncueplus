
import React from 'react';
import { X, Calendar, Clock, User, Tag, MessageSquare, FileText, LinkIcon, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  start_date?: string;
  end_date?: string;
  client?: {
    id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
  freelancer?: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    avatar_url?: string | null;
  } | null;
  created_at: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

interface ProjectDetailsDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target?: string;
  time: string;
  link?: string;
}

const ProjectDetailsDialog: React.FC<ProjectDetailsDialogProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  // Mock activity data
  const activities: ActivityItem[] = [
    {
      id: '1',
      user: { name: 'John Doe', avatar: '/placeholder.svg' },
      action: 'changed the status of',
      target: project.title,
      time: '10:45 AM',
    },
    {
      id: '2',
      user: { name: 'Jane Smith', avatar: '/placeholder.svg' },
      action: 'added a comment in',
      target: project.title,
      time: '10:20 AM',
    },
    {
      id: '3',
      user: { name: 'Mike Johnson', avatar: '/placeholder.svg' },
      action: 'uploaded file',
      target: 'Design Assets',
      time: '09:45 AM',
    }
  ];

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'in progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
      case 'done':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'on-hold':
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'research':
      case 'planning':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAssignees = () => {
    const assignees = [];
    if (project.freelancer) {
      const freelancerName = [project.freelancer.first_name, project.freelancer.last_name]
        .filter(Boolean)
        .join(' ');
      if (freelancerName) {
        assignees.push({
          name: freelancerName,
          avatar: project.freelancer.avatar_url,
          initials: `${project.freelancer.first_name?.[0] || ''}${project.freelancer.last_name?.[0] || ''}`,
        });
      }
    }
    return assignees;
  };

  const assignees = getAssignees();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-xl">{project.title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Created time</span>
              </div>
              <div>
                {project.created_at && format(new Date(project.created_at), 'MMMM d, yyyy h:mm a')}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bookmark className="h-4 w-4" />
                <span>Status</span>
              </div>
              <div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Due Date</span>
              </div>
              <div>
                {project.end_date 
                  ? format(new Date(project.end_date), 'MMMM d, yyyy') 
                  : 'No deadline set'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>Priority</span>
              </div>
              <div className={getPriorityColor(project.priority || 'medium')}>
                {project.priority 
                  ? project.priority.charAt(0).toUpperCase() + project.priority.slice(1) 
                  : 'Medium'}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Assignees</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {assignees.length > 0 ? (
                assignees.map((assignee, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={assignee.avatar || ''} alt={assignee.name} />
                      <AvatarFallback>{assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{assignee.name}</span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No assignees</span>
              )}
            </div>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Project Description</span>
            </div>
            <div className="text-sm">
              {project.description || 'No description provided.'}
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="work">My Work</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="space-y-4 mt-4">
              <div className="text-sm font-medium">Today</div>
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 py-3">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>{' '}
                      {activity.action}{' '}
                      {activity.target && (
                        <span className="font-medium text-primary">{activity.target}</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="work">
              <div className="py-8 text-center text-muted-foreground">
                No work items found
              </div>
            </TabsContent>
            
            <TabsContent value="assigned">
              <div className="py-8 text-center text-muted-foreground">
                No assigned items
              </div>
            </TabsContent>
            
            <TabsContent value="comments">
              <div className="py-8 text-center text-muted-foreground">
                No comments yet
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;

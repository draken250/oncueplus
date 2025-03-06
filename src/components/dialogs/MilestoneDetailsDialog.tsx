
import React from 'react';
import { X, Calendar, Clock, CheckCircle, AlertCircle, User, Tag, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Milestone {
  id: string;
  title: string;
  description?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  due_date?: string;
  project_id: string;
  project_title?: string;
  progress?: number;
  created_at: string;
  priority?: 'low' | 'medium' | 'high';
}

interface MilestoneDetailsDialogProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
}

const MilestoneDetailsDialog: React.FC<MilestoneDetailsDialogProps> = ({ milestone, isOpen, onClose }) => {
  if (!milestone) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'Not Started';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'on_hold':
        return 'On Hold';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-xl">{milestone.title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            {milestone.project_title && (
              <div className="text-sm text-muted-foreground">
                Project: <span className="font-medium text-foreground">{milestone.project_title}</span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <Badge className={getStatusColor(milestone.status)}>
                {getStatusLabel(milestone.status)}
              </Badge>
              
              {milestone.progress !== undefined && (
                <div className="w-full sm:max-w-[200px] space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Created</span>
              </div>
              <div>
                {milestone.created_at && format(new Date(milestone.created_at), 'MMMM d, yyyy')}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Due Date</span>
              </div>
              <div>
                {milestone.due_date 
                  ? format(new Date(milestone.due_date), 'MMMM d, yyyy') 
                  : 'No due date set'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>Priority</span>
              </div>
              <div className={getPriorityColor(milestone.priority || 'medium')}>
                {milestone.priority 
                  ? milestone.priority.charAt(0).toUpperCase() + milestone.priority.slice(1) 
                  : 'Medium'}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Description</span>
            </div>
            <div className="text-sm whitespace-pre-line">
              {milestone.description || 'No description provided.'}
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4 mt-4">
              <div className="text-sm font-medium">Yesterday</div>
              <div className="flex items-start gap-3 py-3">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="font-medium">John Smith</span> changed status from{' '}
                    <span className="text-primary">Not Started</span> to{' '}
                    <span className="text-primary">In Progress</span>
                  </div>
                  <div className="text-xs text-muted-foreground">October 3, 2023</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <div className="py-8 text-center text-muted-foreground">
                No tasks associated with this milestone
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

export default MilestoneDetailsDialog;

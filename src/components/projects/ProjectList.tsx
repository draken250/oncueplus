
import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, ChevronRight, Clock, UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';

interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'completed' | 'paused';
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  client?: {
    id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
  freelancer?: {
    id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  onProjectClick: (project: Project) => void;
  isFreelancer: boolean;
}

const ProjectList: FC<ProjectListProps> = ({ 
  projects, 
  isLoading, 
  onProjectClick,
  isFreelancer 
}) => {
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
              <div className="flex justify-between mt-4">
                <div className="h-10 bg-muted rounded-full w-10"></div>
                <div className="h-8 bg-muted rounded w-24"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg border-border mt-4">
        <h3 className="text-lg font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-4">
          {isFreelancer 
            ? "You haven't created any projects yet." 
            : "You don't have any active projects."}
        </p>
        {isFreelancer && (
          <Button variant="outline">
            Create your first project
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      {projects.map((project) => {
        const person = isFreelancer ? project.client : project.freelancer;
        const personName = person ? `${person.first_name || ''} ${person.last_name || ''}`.trim() : 'Unknown';
        const personInitials = personName !== 'Unknown' 
          ? `${person.first_name?.[0] || ''}${person.last_name?.[0] || ''}`.toUpperCase() 
          : '??';
        
        return (
          <Card 
            key={project.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onProjectClick(project)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              
              {project.description && (
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}
              
              <div className="flex items-center text-xs text-muted-foreground mb-4">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={person?.avatar_url || ''} />
                    <AvatarFallback>{personInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">
                      {personName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isFreelancer ? 'Client' : 'Freelancer'}
                    </p>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProjectList;

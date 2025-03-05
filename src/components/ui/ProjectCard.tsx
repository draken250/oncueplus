
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';

export interface Project {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'completed' | 'pending' | 'on-hold';
  lastUpdated: string;
  progress: number;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className }) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-md bg-card border border-border",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium line-clamp-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">Client: {project.client}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>
      
      <div className="mt-4">
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{project.progress}%</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarClock className="h-3 w-3 mr-1" />
          <span>Updated {project.lastUpdated}</span>
        </div>
        
        <Button variant="ghost" size="sm" asChild className="p-0 h-auto hover:bg-transparent">
          <Link to={`/project/${project.id}`} className="flex items-center text-primary font-medium text-sm">
            View Details 
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;

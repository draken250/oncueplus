
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectList from '@/components/projects/ProjectList';

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

interface ProjectTabsProps {
  projects: Project[];
  loading: boolean;
  onProjectClick: (project: Project) => void;
  isFreelancer: boolean;
}

const ProjectTabs = ({ projects, loading, onProjectClick, isFreelancer }: ProjectTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Projects</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="paused">Paused</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <ProjectList 
          projects={projects} 
          isLoading={loading} 
          onProjectClick={onProjectClick}
          isFreelancer={isFreelancer}
        />
      </TabsContent>
      
      <TabsContent value="active">
        <ProjectList 
          projects={projects.filter(p => p.status === 'active')} 
          isLoading={loading} 
          onProjectClick={onProjectClick}
          isFreelancer={isFreelancer}
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <ProjectList 
          projects={projects.filter(p => p.status === 'completed')} 
          isLoading={loading} 
          onProjectClick={onProjectClick}
          isFreelancer={isFreelancer}
        />
      </TabsContent>
      
      <TabsContent value="paused">
        <ProjectList 
          projects={projects.filter(p => p.status === 'paused')} 
          isLoading={loading} 
          onProjectClick={onProjectClick}
          isFreelancer={isFreelancer}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;

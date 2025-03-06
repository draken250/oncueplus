
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useProjects } from '@/hooks/useProjects';
import ProjectDetails from '@/components/projects/ProjectDetails';
import ProjectForm from '@/components/projects/ProjectForm';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import ProjectDetailsDialog from '@/components/dialogs/ProjectDetailsDialog';
import MilestoneDetailsDialog from '@/components/dialogs/MilestoneDetailsDialog';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectTabs from '@/components/projects/ProjectTabs';

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

const ProjectManagement = () => {
  const { projects, loading, isFreelancer, handleCreateProject, filterProjects } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [projectForDialog, setProjectForDialog] = useState(null);
  
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false);
  const [milestone, setMilestone] = useState<Milestone>({
    id: '1',
    title: 'Complete Homepage Design',
    description: 'Finalize the homepage design including responsive layouts for mobile and tablet devices.',
    status: 'in_progress',
    due_date: new Date().toISOString(),
    project_id: '1',
    project_title: 'Website Redesign',
    progress: 65,
    created_at: new Date().toISOString(),
    priority: 'medium'
  });

  const filteredProjects = filterProjects(searchQuery);
  
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };
  
  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const openProjectDialog = (project) => {
    setProjectForDialog(project);
    setShowProjectDialog(true);
  };

  const openMilestoneDialog = () => {
    setShowMilestoneDialog(true);
  };

  const onCreateProject = async (projectData) => {
    const success = await handleCreateProject(projectData);
    if (success) {
      setShowProjectForm(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-32 max-w-7xl mx-auto w-full px-4 md:px-6 relative">
        <AnimatedGradient className="opacity-30" />
        
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Project Management</h1>
            <p className="text-muted-foreground">
              {isFreelancer 
                ? 'Manage your client projects in one place' 
                : 'Track and manage your ongoing projects'}
            </p>
          </div>
          
          {selectedProject ? (
            <ProjectDetails 
              project={selectedProject} 
              isFreelancer={isFreelancer} 
              onBack={handleBackToList} 
            />
          ) : (
            <>
              <ProjectFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isFreelancer={isFreelancer}
                onNewProject={() => setShowProjectForm(true)}
                onViewSampleMilestone={openMilestoneDialog}
              />
              
              <ProjectTabs 
                projects={filteredProjects} 
                loading={loading} 
                onProjectClick={openProjectDialog}
                isFreelancer={isFreelancer}
              />
            </>
          )}
          
          {showProjectForm && (
            <ProjectForm 
              onSubmit={onCreateProject} 
              onCancel={() => setShowProjectForm(false)} 
            />
          )}
        </div>
      </main>
      
      <ProjectDetailsDialog 
        project={projectForDialog}
        isOpen={showProjectDialog}
        onClose={() => setShowProjectDialog(false)}
      />
      
      <MilestoneDetailsDialog
        milestone={milestone}
        isOpen={showMilestoneDialog}
        onClose={() => setShowMilestoneDialog(false)}
      />
      
      <Footer />
    </div>
  );
};

export default ProjectManagement;

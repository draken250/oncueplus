import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Search, Filter, Clock } from 'lucide-react';
import ProjectList from '@/components/projects/ProjectList';
import ProjectDetails from '@/components/projects/ProjectDetails';
import ProjectForm from '@/components/projects/ProjectForm';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import ProjectDetailsDialog from '@/components/dialogs/ProjectDetailsDialog';
import MilestoneDetailsDialog from '@/components/dialogs/MilestoneDetailsDialog';

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
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
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

  useEffect(() => {
    if (profile?.role === 'freelancer' || profile?.role === 'admin') {
      setIsFreelancer(true);
    }
  }, [profile]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        const { data, error } = isFreelancer 
          ? await supabase
              .from('projects')
              .select('*, client:client_id(id, first_name, last_name, avatar_url)')
              .eq('freelancer_id', user?.id)
              .order('created_at', { ascending: false })
          : await supabase
              .from('projects')
              .select('*, freelancer:freelancer_id(id, first_name, last_name, avatar_url)')
              .eq('client_id', user?.id)
              .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: 'Error fetching projects',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user, isFreelancer, toast]);

  const filteredProjects = searchQuery 
    ? projects.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : projects;
    
  const handleCreateProject = async (projectData) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          { 
            ...projectData,
            freelancer_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select();
      
      if (error) throw error;
      
      setProjects([data[0], ...projects]);
      setShowProjectForm(false);
      
      toast({
        title: 'Project created',
        description: 'Your project has been created successfully.',
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error creating project',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
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
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={openMilestoneDialog}>
                    View Sample Milestone
                  </Button>
                  
                  {isFreelancer && (
                    <Button onClick={() => setShowProjectForm(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" /> New Project
                    </Button>
                  )}
                </div>
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="paused">Paused</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <ProjectList 
                    projects={filteredProjects} 
                    isLoading={loading} 
                    onProjectClick={(project) => openProjectDialog(project)}
                    isFreelancer={isFreelancer}
                  />
                </TabsContent>
                
                <TabsContent value="active">
                  <ProjectList 
                    projects={filteredProjects.filter(p => p.status === 'active')} 
                    isLoading={loading} 
                    onProjectClick={(project) => openProjectDialog(project)}
                    isFreelancer={isFreelancer}
                  />
                </TabsContent>
                
                <TabsContent value="completed">
                  <ProjectList 
                    projects={filteredProjects.filter(p => p.status === 'completed')} 
                    isLoading={loading} 
                    onProjectClick={(project) => openProjectDialog(project)}
                    isFreelancer={isFreelancer}
                  />
                </TabsContent>
                
                <TabsContent value="paused">
                  <ProjectList 
                    projects={filteredProjects.filter(p => p.status === 'paused')} 
                    isLoading={loading} 
                    onProjectClick={(project) => openProjectDialog(project)}
                    isFreelancer={isFreelancer}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
          
          {showProjectForm && (
            <ProjectForm 
              onSubmit={handleCreateProject} 
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

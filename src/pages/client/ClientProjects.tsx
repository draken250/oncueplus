
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ClientSidebar from '@/components/client/ClientSidebar';

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  freelancer: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
}

const ClientProjects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            freelancer:freelancer_id(id, first_name, last_name, avatar_url)
          `)
          .eq('client_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        
        setProjects(data as Project[] || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Failed to load projects",
          description: "An error occurred while fetching your projects. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [user, toast]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <ClientSidebar />
        
        <main className="flex-1 py-20 p-4 md:p-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
              <p className="text-muted-foreground">
                View and manage all your ongoing and completed projects.
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            ) : (
              <>
                {projects.length === 0 ? (
                  <div className="text-center py-12 border border-dashed rounded-lg">
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any active projects.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
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
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
                            </div>
                            
                            {project.end_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Due {new Date(project.end_date).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {project.freelancer ? 
                                  `${project.freelancer.first_name?.[0] || ''}${project.freelancer.last_name?.[0] || ''}` : 
                                  'F'}
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium line-clamp-1">
                                  {project.freelancer ? 
                                    `${project.freelancer.first_name || ''} ${project.freelancer.last_name || ''}`.trim() : 
                                    'Freelancer'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Assigned
                                </p>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="icon">
                              <ArrowRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientProjects;

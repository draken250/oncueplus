
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Project {
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
  client_id: string;
  freelancer_id: string;
}

export const useProjects = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFreelancer, setIsFreelancer] = useState(false);

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
      
      toast({
        title: 'Project created',
        description: 'Your project has been created successfully.',
      });
      
      return true;
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error creating project',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const filterProjects = (searchQuery: string) => {
    return searchQuery 
      ? projects.filter(project => 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : projects;
  };

  return {
    projects,
    loading,
    isFreelancer,
    handleCreateProject,
    filterProjects
  };
};

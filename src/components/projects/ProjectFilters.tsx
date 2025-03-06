
import { useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFreelancer: boolean;
  onNewProject: () => void;
  onViewSampleMilestone: () => void;
}

const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  isFreelancer,
  onNewProject,
  onViewSampleMilestone
}: ProjectFiltersProps) => {
  return (
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
        <Button variant="outline" onClick={onViewSampleMilestone}>
          View Sample Milestone
        </Button>
        
        {isFreelancer && (
          <Button onClick={onNewProject}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Project
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;

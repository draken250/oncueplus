import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Filter, 
  Search, 
  BarChart, 
  Clock, 
  Users, 
  FileText, 
  CalendarDays,
  ArrowUpRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectCard, { Project } from '@/components/ui/ProjectCard';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Simulate API call to fetch projects
    setTimeout(() => {
      const demoProjects: Project[] = [
        {
          id: '1',
          title: 'Website Redesign',
          client: 'Acme Corporation',
          status: 'active',
          lastUpdated: '2 days ago',
          progress: 65,
        },
        {
          id: '2',
          title: 'Mobile App Development',
          client: 'TechStart Inc.',
          status: 'pending',
          lastUpdated: '5 days ago',
          progress: 25,
        },
        {
          id: '3',
          title: 'Brand Identity Design',
          client: 'Eco Solutions',
          status: 'completed',
          lastUpdated: '1 week ago',
          progress: 100,
        },
        {
          id: '4',
          title: 'Marketing Campaign',
          client: 'Global Retail',
          status: 'on-hold',
          lastUpdated: '3 days ago',
          progress: 45,
        },
        {
          id: '5',
          title: 'E-commerce Platform Integration',
          client: 'Fashion Boutique',
          status: 'active',
          lastUpdated: '1 day ago',
          progress: 70,
        },
        {
          id: '6',
          title: 'Content Strategy Development',
          client: 'Media Group',
          status: 'pending',
          lastUpdated: '4 days ago',
          progress: 15,
        },
      ];
      
      setProjects(demoProjects);
      setFilteredProjects(demoProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const filterProjectsByStatus = (status: string) => {
    if (status === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.status === status);
      setFilteredProjects(filtered);
    }
  };

  // Stats cards data
  const statsCards = [
    { title: 'Active Projects', value: '8', icon: <FileText className="h-5 w-5 text-blue-500" />, trend: '+2 from last month' },
    { title: 'Completed Tasks', value: '24', icon: <Clock className="h-5 w-5 text-green-500" />, trend: '+5 from last week' },
    { title: 'Active Clients', value: '12', icon: <Users className="h-5 w-5 text-purple-500" />, trend: 'Same as last month' },
    { title: 'Upcoming Deadlines', value: '5', icon: <CalendarDays className="h-5 w-5 text-red-500" />, trend: '3 this week' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-32 max-w-7xl mx-auto w-full px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Welcome Back!</h1>
          <p className="text-muted-foreground animate-fade-in">
            Here's an overview of your projects and tasks.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 animate-fade-in">
          {statsCards.map((card, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Projects Section */}
        <div className="animate-fade-in animation-delay-300">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Your Projects</h2>
                <TabsList className="bg-muted">
                  <TabsTrigger value="all" onClick={() => filterProjectsByStatus('all')}>All</TabsTrigger>
                  <TabsTrigger value="active" onClick={() => filterProjectsByStatus('active')}>Active</TabsTrigger>
                  <TabsTrigger value="pending" onClick={() => filterProjectsByStatus('pending')}>Pending</TabsTrigger>
                  <TabsTrigger value="completed" onClick={() => filterProjectsByStatus('completed')}>Completed</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex mt-4 md:mt-0 gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="pl-9 max-w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link to="/projects">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> New Project
                  </Button>
                </Link>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                        <div className="h-3 bg-muted rounded w-1/2 mb-6"></div>
                        <div className="h-2 bg-muted rounded w-full mb-2"></div>
                        <div className="flex justify-between mt-6">
                          <div className="h-3 bg-muted rounded w-1/3"></div>
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found. Try adjusting your search or filters.</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" /> Create New Project
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {['active', 'pending', 'completed'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Recently Updated & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 animate-fade-in animation-delay-500">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recently Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Client: {project.client}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" /> Updated {project.lastUpdated}
                      </div>
                    </div>
                    <Link
                      to={`/projects`}
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                    >
                      Details <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/projects">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" /> New Project
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" /> Message Client
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" /> Create Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" /> Add Client
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" /> Generate Report
                </Button>
                <Link to="/form-builder">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" /> Create Form
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

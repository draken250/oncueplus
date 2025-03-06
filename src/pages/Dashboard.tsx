
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
  MessageCircle,
  CheckCircle,
  Clock3,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectCard, { Project } from '@/components/ui/ProjectCard';
import { Badge } from '@/components/ui/badge';

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
    { title: 'Completed Tasks', value: '24', icon: <CheckCircle className="h-5 w-5 text-green-500" />, trend: '+5 from last week' },
    { title: 'Active Clients', value: '12', icon: <Users className="h-5 w-5 text-purple-500" />, trend: 'Same as last month' },
    { title: 'Upcoming Deadlines', value: '5', icon: <CalendarDays className="h-5 w-5 text-red-500" />, trend: '3 this week' },
  ];

  // Pending milestones data (similar to the image)
  const pendingMilestones = [
    {
      title: "Marketing Materials Development",
      client: "Local Market Expansion - Leonard Kramer & Sons",
      status: "pending approval",
      dueDate: "12/20/2023"
    },
    {
      title: "Loyalty Program Project Start",
      client: "Local Market Expansion - Leonard Kramer & Sons",
      status: "pending approval",
      dueDate: "12/27/2023"
    },
    {
      title: "Website Content Creation",
      client: "Global Distribution Co.",
      status: "in progress",
      dueDate: "12/15/2023"
    }
  ];

  // Invoice data (similar to the image)
  const invoices = [
    {
      id: "INV-2023-001",
      client: "Leonard Kramer & Sons",
      amount: "$4,500.00",
      issueDate: "11/29/2023",
      dueDate: "12/29/2023",
      status: "pending"
    },
    {
      id: "INV-2023-002",
      client: "Global Distribution Co.",
      amount: "$3,200.00",
      issueDate: "11/15/2023",
      dueDate: "12/15/2023",
      status: "paid"
    },
    {
      id: "INV-2023-003",
      client: "Tech Innovations LLC",
      amount: "$2,800.00",
      issueDate: "12/01/2023",
      dueDate: "01/01/2024",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-24 max-w-7xl mx-auto w-full px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground animate-fade-in">
            Here's an overview of your projects, milestones, and invoices.
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
        
        {/* Main Dashboard Content in Tabs */}
        <Tabs defaultValue="overview" className="w-full animate-fade-in animation-delay-300">
          <TabsList className="bg-muted mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Milestones Section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Pending Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingMilestones.map((milestone, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{milestone.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`${
                              milestone.status === "pending approval" 
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" 
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                            }`}
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.client}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            <span>Due: {milestone.dueDate}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">
                    View All Milestones
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Recent Invoices */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Recent Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium">{invoice.id}</h3>
                          <Badge 
                            variant="outline" 
                            className={`${
                              invoice.status === "pending" 
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" 
                                : "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            }`}
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Client: {invoice.client}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm font-medium">{invoice.amount}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Due: {invoice.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">
                    View All Invoices
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Recent Projects */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Recent Projects</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Filter className="h-4 w-4 mr-1" /> Filter
                      </Button>
                      <Link to="/projects">
                        <Button size="sm" className="h-8">
                          <Plus className="h-4 w-4 mr-1" /> New Project
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.slice(0, 4).map((project, index) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              project.status === "active" 
                                ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" 
                                : project.status === "completed"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                                : project.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                                : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                            }`}
                          >
                            {project.status}
                          </Badge>
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
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{project.lastUpdated}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">
                    View All Projects
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Projects</CardTitle>
                  <div className="flex items-center gap-2">
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
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" /> Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Milestones Tab */}
          <TabsContent value="milestones">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingMilestones.concat(pendingMilestones).map((milestone, index) => (
                    <div key={index} className="flex items-start justify-between border-b border-border pb-6 last:border-0 last:pb-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium mb-1">{milestone.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`${
                              milestone.status === "pending approval" 
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" 
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                            }`}
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{milestone.client}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" /> Due: {milestone.dueDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {milestone.status === "pending approval" && (
                          <Button size="sm">Approve</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Invoices</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" /> Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Create Invoice
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium text-sm">
                    <div className="col-span-2">Invoice #</div>
                    <div className="col-span-4">Client</div>
                    <div className="col-span-2">Issue Date</div>
                    <div className="col-span-2">Due Date</div>
                    <div className="col-span-1">Amount</div>
                    <div className="col-span-1 text-right">Status</div>
                  </div>
                  {invoices.concat(invoices).map((invoice, index) => (
                    <div key={index} className="p-4 grid grid-cols-12 border-t text-sm hover:bg-muted/20">
                      <div className="col-span-2 font-medium">{invoice.id}</div>
                      <div className="col-span-4">{invoice.client}</div>
                      <div className="col-span-2">{invoice.issueDate}</div>
                      <div className="col-span-2">{invoice.dueDate}</div>
                      <div className="col-span-1 font-medium">{invoice.amount}</div>
                      <div className="col-span-1 text-right">
                        <Badge 
                          variant="outline" 
                          className={`${
                            invoice.status === "pending" 
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" 
                              : "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          }`}
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

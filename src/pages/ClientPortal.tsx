
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Clock, 
  FileText, 
  Calendar,
  CheckCircle,
  AlertCircle,
  PauseCircle,
  FileArchive,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ClientSidebar from '@/components/client/ClientSidebar';

interface Project {
  id: string;
  title: string;
  status: string;
  updated_at: string;
  due_date?: string;
}

interface Invoice {
  id: string;
  title: string;
  amount: number;
  status: string;
  due_date: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  due_date?: string;
}

const ClientPortal = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (profile?.role !== 'client') {
      toast({
        title: "Access restricted",
        description: "This area is only for client users.",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }

    const fetchClientData = async () => {
      setIsLoading(true);
      try {
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', user?.id)
          .order('updated_at', { ascending: false });
        
        if (projectsError) throw projectsError;
        setProjects(projectsData || []);

        // For demo purposes, let's create some mock data for invoices and tasks
        // In a real app, you would fetch these from their respective tables
        const mockInvoices = [
          { id: '1', title: 'Website Design Phase 1', amount: 1800, status: 'paid', due_date: '2023-10-15' },
          { id: '2', title: 'Monthly Maintenance', amount: 350, status: 'pending', due_date: '2023-11-30' },
          { id: '3', title: 'Logo Redesign', amount: 500, status: 'overdue', due_date: '2023-10-01' },
        ];
        setInvoices(mockInvoices);
        
        const mockTasks = [
          { id: '1', title: 'Content Review', status: 'completed', due_date: '2023-10-20' },
          { id: '2', title: 'Feedback on Design Mockups', status: 'pending', due_date: '2023-11-15' },
          { id: '3', title: 'Approve Final Deliverables', status: 'pending', due_date: '2023-12-01' },
          { id: '4', title: 'Schedule Launch Meeting', status: 'in-progress', due_date: '2023-11-28' },
        ];
        setTasks(mockTasks);
      } catch (error) {
        console.error('Error fetching client data:', error);
        toast({
          title: "Failed to load data",
          description: "Could not load your projects and information. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, [user, profile, toast, navigate]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'on-hold':
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'overdue':
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <BarChart className="h-4 w-4" />;
      case 'on-hold':
      case 'paused':
        return <PauseCircle className="h-4 w-4" />;
      case 'overdue':
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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
              <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
              <p className="text-muted-foreground">
                Welcome back, {profile?.first_name}! Here's an overview of your projects and tasks.
              </p>
            </div>
            
            {/* Stats overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.filter(p => p.status === 'active').length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {projects.length} total projects
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'pending').length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tasks.filter(t => t.status === 'completed').length} completed
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Unpaid Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${invoices.filter(i => i.status !== 'paid').reduce((acc, i) => acc + i.amount, 0)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {invoices.filter(i => i.status !== 'paid').length} outstanding
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next: in 3 days
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content tabs */}
            <Tabs defaultValue="pending" className="mt-6">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending Milestones</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
                <TabsTrigger value="invoices">Recent Invoices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-4">
                {tasks.filter(t => t.status === 'pending').map(task => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(task.status)}`}>
                            {getStatusIcon(task.status)}
                            <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                          </span>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="w-full max-w-md" onClick={() => navigate('/client/tasks')}>
                    View All Tasks
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-4">
                {tasks.filter(t => t.status === 'in-progress').map(task => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(task.status)}`}>
                            {getStatusIcon(task.status)}
                            <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                          </span>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="w-full max-w-md" onClick={() => navigate('/client/tasks')}>
                    View All Tasks
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="invoices" className="space-y-4">
                {invoices.map(invoice => (
                  <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{invoice.title}</h3>
                          <p className="text-lg font-bold mt-1">${invoice.amount.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Due: {new Date(invoice.due_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            <span>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                          </span>
                          <Button variant="ghost" size="icon">
                            <FileArchive className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="w-full max-w-md" onClick={() => navigate('/client/invoices')}>
                    View All Invoices
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientPortal;

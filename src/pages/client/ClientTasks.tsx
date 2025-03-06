
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientSidebar from '@/components/client/ClientSidebar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarClock, CheckCircle, Clock, X } from 'lucide-react';

const ClientTasks = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  // Mock data for tasks
  const tasks = [
    { 
      id: '1', 
      title: 'Review website mockups', 
      project: 'Website Redesign',
      status: 'pending', 
      due_date: '2023-12-15'
    },
    { 
      id: '2', 
      title: 'Provide content for About Us page', 
      project: 'Website Redesign',
      status: 'completed', 
      due_date: '2023-11-20'
    },
    { 
      id: '3', 
      title: 'Approve logo variations', 
      project: 'Brand Identity',
      status: 'pending', 
      due_date: '2023-12-10'
    },
    { 
      id: '4', 
      title: 'Finalize contract terms', 
      project: 'Social Media Marketing',
      status: 'pending', 
      due_date: '2023-12-05'
    },
    { 
      id: '5', 
      title: 'Share access to Google Analytics', 
      project: 'Website Redesign',
      status: 'completed', 
      due_date: '2023-11-12'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <CalendarClock className="h-4 w-4" />;
      case 'overdue':
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
              <h1 className="text-3xl font-bold mb-2">Your Tasks</h1>
              <p className="text-muted-foreground">
                Review and complete requested tasks for your projects.
              </p>
            </div>
            
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Tasks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <div className="space-y-4">
                  {tasks.filter(t => t.status === 'pending').map(task => (
                    <Card key={task.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">Project: {task.project}</p>
                            <div className="flex items-center mt-2 gap-4">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <CalendarClock className="h-4 w-4" />
                                Due: {new Date(task.due_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(task.status)}`}>
                              {getStatusIcon(task.status)}
                              <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                            </span>
                            <Button size="sm">Complete</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="space-y-4">
                  {tasks.filter(t => t.status === 'completed').map(task => (
                    <Card key={task.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">Project: {task.project}</p>
                            <div className="flex items-center mt-2 gap-4">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <CalendarClock className="h-4 w-4" />
                                Completed on: {new Date(task.due_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(task.status)}`}>
                              {getStatusIcon(task.status)}
                              <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {tasks.map(task => (
                    <Card key={task.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">Project: {task.project}</p>
                            <div className="flex items-center mt-2 gap-4">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <CalendarClock className="h-4 w-4" />
                                {task.status === 'completed' ? 'Completed on:' : 'Due:'} {new Date(task.due_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(task.status)}`}>
                              {getStatusIcon(task.status)}
                              <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                            </span>
                            {task.status !== 'completed' && (
                              <Button size="sm">Complete</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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

export default ClientTasks;

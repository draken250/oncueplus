
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientSidebar from '@/components/client/ClientSidebar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarClock, CheckCircle, Clock, X } from 'lucide-react';
import MilestoneDetailsDialog from '@/components/dialogs/MilestoneDetailsDialog';

const ClientTasks = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock data for tasks
  const tasks = [
    { 
      id: '1', 
      title: 'Review website mockups', 
      project: 'Website Redesign',
      project_id: '123',
      status: 'in_progress', 
      due_date: '2023-12-15',
      description: 'Review the homepage mockups and provide feedback on the color scheme and layout.',
      progress: 25,
      created_at: '2023-11-30',
      priority: 'high'
    },
    { 
      id: '2', 
      title: 'Provide content for About Us page', 
      project: 'Website Redesign',
      project_id: '123',
      status: 'completed', 
      due_date: '2023-11-20',
      description: 'Write and submit the company history and mission statement for the About Us page.',
      progress: 100,
      created_at: '2023-11-10',
      priority: 'medium'
    },
    { 
      id: '3', 
      title: 'Approve logo variations', 
      project: 'Brand Identity',
      project_id: '124',
      status: 'not_started', 
      due_date: '2023-12-10',
      description: 'Review the three logo options and select one for further refinement.',
      progress: 0,
      created_at: '2023-11-25',
      priority: 'medium'
    },
    { 
      id: '4', 
      title: 'Finalize contract terms', 
      project: 'Social Media Marketing',
      project_id: '125',
      status: 'in_progress', 
      due_date: '2023-12-05',
      description: 'Review and sign off on the final contract terms for the social media marketing campaign.',
      progress: 50,
      created_at: '2023-11-28',
      priority: 'high'
    },
    { 
      id: '5', 
      title: 'Share access to Google Analytics', 
      project: 'Website Redesign',
      project_id: '123',
      status: 'completed', 
      due_date: '2023-11-12',
      description: 'Provide access credentials to Google Analytics for the development team.',
      progress: 100,
      created_at: '2023-11-08',
      priority: 'low'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'not_started':
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
      case 'not_started':
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in_progress':
        return <CalendarClock className="h-4 w-4" />;
      case 'overdue':
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const openTaskDetails = (task) => {
    // Convert task to milestone format for the dialog
    const milestoneTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      project_id: task.project_id,
      project_title: task.project,
      progress: task.progress,
      created_at: task.created_at,
      priority: task.priority
    };
    
    setSelectedTask(milestoneTask);
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
                  {tasks.filter(t => t.status !== 'completed').map(task => (
                    <Card 
                      key={task.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openTaskDetails(task)}
                    >
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
                              <span>{task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}</span>
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
                    <Card 
                      key={task.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openTaskDetails(task)}
                    >
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
                              <span>{task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}</span>
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
                    <Card 
                      key={task.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openTaskDetails(task)}
                    >
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
                              <span>{task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}</span>
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
      
      <MilestoneDetailsDialog
        milestone={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
      
      <Footer />
    </div>
  );
};

export default ClientTasks;

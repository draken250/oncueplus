
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientSidebar from '@/components/client/ClientSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Download, DollarSign } from 'lucide-react';

const ClientInvoices = () => {
  // Mock data for invoices
  const invoices = [
    { 
      id: '1', 
      title: 'Website Design Phase 1', 
      amount: 1800, 
      status: 'paid', 
      due_date: '2023-10-15',
      payment_date: '2023-10-12'
    },
    { 
      id: '2', 
      title: 'Monthly Maintenance', 
      amount: 350, 
      status: 'pending', 
      due_date: '2023-11-30'
    },
    { 
      id: '3', 
      title: 'Logo Redesign', 
      amount: 500, 
      status: 'overdue', 
      due_date: '2023-10-01'
    },
    { 
      id: '4', 
      title: 'SEO Optimization', 
      amount: 450, 
      status: 'paid', 
      due_date: '2023-09-15',
      payment_date: '2023-09-10'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
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
              <h1 className="text-3xl font-bold mb-2">Your Invoices</h1>
              <p className="text-muted-foreground">
                View and manage all your invoices.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Invoices</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {invoices.map(invoice => (
                    <Card key={invoice.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{invoice.title}</h3>
                            <div className="text-xl font-bold">${invoice.amount.toFixed(2)}</div>
                            <div className="flex items-center mt-2 gap-4">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {new Date(invoice.due_date).toLocaleDateString()}
                              </span>
                              {invoice.payment_date && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  Paid: {new Date(invoice.payment_date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            {invoice.status !== 'paid' && (
                              <Button size="sm">Pay Now</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pending">
                <div className="space-y-4">
                  {invoices.filter(i => i.status === 'pending' || i.status === 'overdue').map(invoice => (
                    <Card key={invoice.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{invoice.title}</h3>
                            <div className="text-xl font-bold">${invoice.amount.toFixed(2)}</div>
                            <div className="flex items-center mt-2 gap-4">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {new Date(invoice.due_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm">Pay Now</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="paid">
                <div className="space-y-4">
                  {invoices.filter(i => i.status === 'paid').map(invoice => (
                    <Card key={invoice.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{invoice.title}</h3>
                            <div className="text-xl font-bold">${invoice.amount.toFixed(2)}</div>
                            <div className="flex items-center mt-2 gap-4">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {new Date(invoice.due_date).toLocaleDateString()}
                              </span>
                              {invoice.payment_date && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  Paid: {new Date(invoice.payment_date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
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

export default ClientInvoices;

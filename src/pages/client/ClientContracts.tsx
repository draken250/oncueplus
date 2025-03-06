
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientSidebar from '@/components/client/ClientSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, FileCheck, FileText } from 'lucide-react';

const ClientContracts = () => {
  // Mock data for contracts
  const contracts = [
    { 
      id: '1', 
      title: 'Master Service Agreement', 
      status: 'active',
      date_signed: '2023-01-15',
      expiration_date: '2024-01-15',
    },
    { 
      id: '2', 
      title: 'Website Development Contract', 
      status: 'active',
      date_signed: '2023-03-22',
      expiration_date: '2023-12-31',
    },
    { 
      id: '3', 
      title: 'Non-Disclosure Agreement', 
      status: 'active',
      date_signed: '2023-01-10',
      expiration_date: null,
    },
    { 
      id: '4', 
      title: 'Social Media Management Contract', 
      status: 'draft',
      date_signed: null,
      expiration_date: null,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <ClientSidebar />
        
        <main className="flex-1 py-20 p-4 md:p-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Your Contracts</h1>
              <p className="text-muted-foreground">
                View and manage all your legal agreements.
              </p>
            </div>
            
            <div className="space-y-6">
              {contracts.map(contract => (
                <Card key={contract.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium mb-1">{contract.title}</h3>
                        <div className="flex items-center mt-2 space-x-4">
                          {contract.date_signed && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <FileCheck className="h-4 w-4" />
                              Signed: {new Date(contract.date_signed).toLocaleDateString()}
                            </span>
                          )}
                          
                          {contract.expiration_date && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Expires: {new Date(contract.expiration_date).toLocaleDateString()}
                            </span>
                          )}
                          
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            contract.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        {contract.status === 'draft' && (
                          <Button size="sm">
                            Sign Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientContracts;


import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientSidebar from '@/components/client/ClientSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileText, HelpCircle, Video } from 'lucide-react';

const ClientResources = () => {
  // Mock data for resources
  const resources = [
    { 
      id: '1', 
      title: 'Brand Guidelines PDF',
      description: 'Complete brand guidelines including logo usage, colors, and typography.',
      type: 'document',
      date_added: '2023-09-15',
    },
    { 
      id: '2', 
      title: 'Website User Manual',
      description: 'Instructions for managing your website content and features.',
      type: 'document',
      date_added: '2023-10-22',
    },
    { 
      id: '3', 
      title: 'Social Media Best Practices',
      description: 'Guidelines for maintaining consistent brand messaging on social platforms.',
      type: 'document',
      date_added: '2023-11-05',
    },
    { 
      id: '4', 
      title: 'CMS Training Video',
      description: 'Tutorial on how to use your content management system.',
      type: 'video',
      date_added: '2023-10-30',
    },
  ];

  const tutorials = [
    {
      id: '1',
      title: 'How to Update Website Content',
      description: 'Learn how to make basic content changes on your website.',
      duration: '5:30',
    },
    {
      id: '2',
      title: 'Uploading Images and Media',
      description: 'Proper ways to upload and format images for your website.',
      duration: '4:15',
    },
    {
      id: '3',
      title: 'Creating New Pages',
      description: 'Step-by-step guide to creating new pages on your website.',
      duration: '6:45',
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.',
    },
    {
      id: '2',
      question: 'How do I update my contact information?',
      answer: 'Go to your profile page by clicking on your name in the top-right corner, then select "Edit Profile" to update your contact information.',
    },
    {
      id: '3',
      question: 'Can I download copies of my invoices?',
      answer: 'Yes, you can download PDF copies of all invoices from the Invoices page by clicking the download button next to each invoice.',
    },
    {
      id: '4',
      question: 'How do I provide feedback on a design?',
      answer: 'You can provide feedback on designs by using the comment feature in the project details page or by messaging your project manager directly.',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5" />;
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
              <h1 className="text-3xl font-bold mb-2">Resources & Help</h1>
              <p className="text-muted-foreground">
                Access helpful resources, tutorials, and answers to common questions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Access your important documents and files.
                  </p>
                  <Button className="w-full" onClick={() => document.getElementById('resourcesSection')?.scrollIntoView({ behavior: 'smooth' })}>
                    View Documents
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5" />
                    Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how to use features with step-by-step videos.
                  </p>
                  <Button className="w-full" onClick={() => document.getElementById('tutorialsSection')?.scrollIntoView({ behavior: 'smooth' })}>
                    View Tutorials
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Find answers to commonly asked questions.
                  </p>
                  <Button className="w-full" onClick={() => document.getElementById('faqsSection')?.scrollIntoView({ behavior: 'smooth' })}>
                    View FAQs
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div id="resourcesSection" className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Documents & Resources</h2>
              <div className="space-y-4">
                {resources.map(resource => (
                  <Card key={resource.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getTypeIcon(resource.type)}
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Added: {new Date(resource.date_added).toLocaleDateString()}
                            </p>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div id="tutorialsSection" className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map(tutorial => (
                  <Card key={tutorial.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{tutorial.title}</h3>
                        <span className="text-xs text-muted-foreground border border-muted-foreground/30 px-2 py-0.5 rounded">
                          {tutorial.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{tutorial.description}</p>
                      <Button variant="secondary" size="sm" className="w-full">
                        <Video className="h-4 w-4 mr-2" />
                        Watch Tutorial
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div id="faqsSection">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map(faq => (
                  <Card key={faq.id}>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="mt-10 text-center p-6 border border-dashed rounded-lg">
              <HelpCircle className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Need more help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Contact our support team.
              </p>
              <Button>
                Contact Support
              </Button>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientResources;

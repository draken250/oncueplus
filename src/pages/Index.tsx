import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Users, 
  FileCheck, 
  BarChart3, 
  Layout, 
  MessageSquare, 
  Clock,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import FeatureCard from '@/components/ui/FeatureCard';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Users size={24} />,
      title: 'Client Management',
      description: 'Efficiently organize client information, communications, and project history in one place.',
    },
    {
      icon: <FileCheck size={24} />,
      title: 'Form Builder',
      description: 'Create custom onboarding forms to collect client requirements and project details.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Performance Reports',
      description: 'Generate comprehensive reports and share real-time project updates with clients.',
    },
    {
      icon: <Layout size={24} />,
      title: 'Project Dashboard',
      description: 'Get a clear overview of all your projects, deadlines, and tasks in a customizable dashboard.',
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Client Communication',
      description: 'Streamline client communications with integrated messaging and file sharing.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Time Tracking',
      description: 'Track time spent on projects and tasks to improve productivity and billing accuracy.',
    },
  ];

  const testimonials = [
    {
      quote: "OnCuePlus transformed how I manage client relationships. The onboarding forms have saved me hours of back-and-forth emails.",
      author: "Alex Rodriguez",
      role: "Web Developer"
    },
    {
      quote: "The reporting features help me maintain transparency with clients, and the dashboard gives me a clear overview of all my projects.",
      author: "Sarah Johnson",
      role: "Graphic Designer"
    },
    {
      quote: "I can't imagine running my freelance business without OnCuePlus now. It's become an essential part of my workflow.",
      author: "Michael Chen",
      role: "Marketing Consultant"
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <AnimatedGradient />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
            <div className="inline-flex items-center rounded-full px-3 py-1 mb-4 text-sm font-medium bg-accent text-primary">
              <Zap size={14} className="mr-1" />
              <span>All-in-one client management platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Streamline Your Client Collaboration
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in animation-delay-200">
              The complete platform that helps freelancers and agencies manage projects, 
              collect client information, and deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
              {user ? (
                <Button size="lg" className="px-6 rounded-md" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="px-6 rounded-md" asChild>
                    <Link to="/auth?tab=signup">
                      Get Started <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-6 rounded-md" asChild>
                    <Link to="/auth">
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="relative mx-auto mt-10 max-w-5xl animate-fade-in animation-delay-500">
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border shadow-2xl">
              <div className="glass-card w-full h-full flex items-center justify-center bg-accent/30 relative">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-8 md:p-12">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-background/90 rounded-lg flex items-center px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="mt-12 h-[calc(100%-4rem)] grid grid-cols-12 gap-4">
                    <div className="col-span-3 bg-white/90 dark:bg-gray-800/60 rounded-lg p-4">
                      <div className="w-full h-6 bg-primary/20 rounded mb-4"></div>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                      ))}
                    </div>
                    <div className="col-span-9 bg-white/90 dark:bg-gray-800/60 rounded-lg p-4">
                      <div className="w-1/3 h-6 bg-primary/20 rounded mb-4"></div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                      </div>
                      <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive suite of tools designed specifically for freelancers and agencies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <AnimatedGradient className="opacity-30" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Freelancers</h2>
            <p className="text-lg text-muted-foreground">
              Hear what other professionals are saying about OnCuePlus.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-lg mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Client Experience?</h2>
            <p className="text-xl mb-8 text-primary-foreground/80">
              Join thousands of freelancers and agencies who have streamlined their workflow with OnCuePlus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-6 text-primary font-medium">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="px-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How OnCuePlus Works</h2>
            <p className="text-lg text-muted-foreground">
              A simple, streamlined process to enhance your client management workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                title: "Create Custom Forms",
                description: "Build onboarding forms tailored to your specific needs to collect client information efficiently."
              },
              {
                step: 2,
                title: "Manage Projects",
                description: "Organize all your projects, set milestones, and track progress in a centralized dashboard."
              },
              {
                step: 3,
                title: "Share Reports",
                description: "Generate professional reports and provide clients with real-time updates on project status."
              }
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                
                {item.step < 3 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-6 text-muted-foreground transform rotate-0" />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild>
              <Link to="/dashboard">
                Explore the Dashboard <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We've got answers.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-border">
            {[
              {
                question: "How does the form builder work?",
                answer: "Our intuitive form builder allows you to create custom forms with various field types including text, multiple choice, file uploads, and more. You can organize fields into sections, add conditional logic, and customize the design to match your brand."
              },
              {
                question: "Can I white-label the client portal?",
                answer: "Yes! OnCuePlus offers white-labeling options that allow you to customize the portal with your own branding, colors, and logo, providing a seamless experience for your clients."
              },
              {
                question: "Is there a limit to how many clients I can manage?",
                answer: "No, there's no limit to the number of clients you can manage. Our plans are based on features and usage, not on the number of clients, so you can scale your business without worrying about outgrowing our platform."
              },
              {
                question: "Can I integrate OnCuePlus with other tools?",
                answer: "Absolutely! OnCuePlus integrates with popular tools like Google Calendar, Slack, Trello, Asana, and many more. We also offer an API for custom integrations with your existing workflow."
              },
              {
                question: "Is my data secure?",
                answer: "Security is our top priority. OnCuePlus uses enterprise-grade encryption, regular security audits, and follows industry best practices to ensure your data and your clients' information remains secure and confidential."
              }
            ].map((item, index) => (
              <div key={index} className="py-6">
                <h3 className="text-xl font-medium mb-3 flex items-start">
                  <CheckCircle2 className="h-6 w-6 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item.question}</span>
                </h3>
                <p className="text-muted-foreground pl-8">{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="#" className="text-primary hover:underline flex items-center justify-center">
              View all FAQs <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

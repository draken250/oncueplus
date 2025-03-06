
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  FileText, 
  FileCheck, 
  Clock,
  Users,
  FileArchive,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const ClientSidebar = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    // Close mobile sidebar when route changes
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/client',
      isActive: location.pathname === '/client',
    },
    {
      title: 'Projects',
      icon: <FileText className="h-5 w-5" />,
      path: '/client/projects',
      isActive: location.pathname === '/client/projects',
    },
    {
      title: 'Tasks',
      icon: <Clock className="h-5 w-5" />,
      path: '/client/tasks',
      isActive: location.pathname === '/client/tasks',
    },
    {
      title: 'Invoices',
      icon: <FileCheck className="h-5 w-5" />,
      path: '/client/invoices',
      isActive: location.pathname === '/client/invoices',
    },
    {
      title: 'Contracts',
      icon: <FileArchive className="h-5 w-5" />,
      path: '/client/contracts',
      isActive: location.pathname === '/client/contracts',
    },
    {
      title: 'Resources',
      icon: <HelpCircle className="h-5 w-5" />,
      path: '/client/resources',
      isActive: location.pathname === '/client/resources',
    },
  ];

  const sidebar = (
    <div className="flex flex-col h-full bg-card shadow-sm border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-1">Client Portal</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {profile?.first_name} {profile?.last_name}
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
              >
                <Button
                  variant={item.isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    item.isActive ? "bg-secondary" : ""
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t mt-auto">
        <div className="text-sm text-muted-foreground text-center">
          <p>Need help?</p>
          <p>Contact support team</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobileView && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 shadow-lg rounded-full h-12 w-12"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Desktop sidebar */}
      {!isMobileView && (
        <div className="hidden lg:block w-64 shrink-0">
          {sidebar}
        </div>
      )}

      {/* Mobile sidebar */}
      {isMobileView && isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background">
            {sidebar}
          </div>
        </div>
      )}
    </>
  );
};

export default ClientSidebar;

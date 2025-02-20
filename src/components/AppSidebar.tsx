
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Phone, 
  Users, 
  Mic, 
  Brain,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { isOpen, toggle } = useSidebar();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Phone, label: 'Calls', path: '/calls' },
    { icon: Users, label: 'Agents', path: '/agents' },
    { icon: Mic, label: 'Voices', path: '/voices' },
    { icon: Brain, label: 'Knowledge', path: '/knowledge' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200",
        "transition-all duration-300 ease-in-out transform",
        isOpen ? "w-64 translate-x-0" : "w-16 translate-x-0",
        "flex flex-col"
      )}>
        <div className="h-16 flex items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2">
            {isOpen ? (
              <h1 className="text-xl font-bold">Symphony CRM</h1>
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Link>
        </div>
        
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActive && "bg-gray-100"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-blue-600" : "text-gray-500"
                      )} />
                      {isOpen && (
                        <span className="ml-3 transition-opacity duration-200">
                          {item.label}
                        </span>
                      )}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center"
            onClick={toggle}
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={toggle}
        />
      )}
    </>
  );
}

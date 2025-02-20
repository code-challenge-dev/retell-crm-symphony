
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Phone, 
  Users, 
  Mic, 
  Brain,
  Settings,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { isOpen } = useSidebar();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Phone, label: 'Calls', path: '/calls' },
    { icon: Users, label: 'Agents', path: '/agents' },
    { icon: Mic, label: 'Voices', path: '/voices' },
    { icon: Brain, label: 'Knowledge', path: '/knowledge' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={cn(
      "fixed top-0 left-0 z-40 h-screen transition-transform bg-white border-r border-gray-200",
      isOpen ? "w-64" : "w-16",
      "flex flex-col"
    )}>
      <div className="h-16 flex items-center justify-center border-b">
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
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

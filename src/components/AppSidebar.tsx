
import { 
  Home, Users, Phone, Calendar, Settings, 
  ChevronLeft, ChevronRight, Mic, Brain
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Calls", icon: Phone, path: "/calls" },
  { title: "Agents", icon: Users, path: "/agents" },
  { title: "Knowledge Base", icon: Brain, path: "/knowledge" },
  { title: "Voices", icon: Mic, path: "/voices" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

const CollapsibleTrigger = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
      {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
    </div>
  );
};

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="glass border-r border-gray-200">
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800">Symphony CRM</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100/80
                        ${location.pathname === item.path 
                          ? 'bg-gray-100 text-gray-900 font-medium shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarTrigger>
        <CollapsibleTrigger />
      </SidebarTrigger>
    </Sidebar>
  );
}

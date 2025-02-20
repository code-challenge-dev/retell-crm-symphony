
import { 
  Home, Users, Phone, Calendar, Settings, 
  ChevronLeft, ChevronRight 
} from "lucide-react";
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
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Customers", icon: Users, path: "/customers" },
  { title: "Calls", icon: Phone, path: "/calls" },
  { title: "Calendar", icon: Calendar, path: "/calendar" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
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
                  <SidebarMenuButton asChild className="hover-lift">
                    <a href={item.path} className="flex items-center gap-3 px-4 py-2 rounded-lg">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarTrigger className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        {({ collapsed }) => (
          <button className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </SidebarTrigger>
    </Sidebar>
  );
}

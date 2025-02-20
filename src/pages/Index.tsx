
import { useQuery } from '@tanstack/react-query';
import { Phone, Users, Mic, Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { listCalls } from '@/services/retell/calls';
import { listAgents } from '@/services/retell/agents';
import { Card } from "@/components/ui/card";
import { RETELL_API_KEY } from '@/lib/retell';

const features = [
  {
    icon: Phone,
    title: "Call Management",
    description: "Make and receive calls with AI-powered agents",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    link: "/calls"
  },
  {
    icon: Users,
    title: "AI Agents",
    description: "Configure and manage your virtual agents",
    color: "text-green-500",
    bgColor: "bg-green-50",
    link: "/agents"
  },
  {
    icon: Brain,
    title: "Knowledge Base",
    description: "Train your agents with custom knowledge",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    link: "/knowledge"
  },
  {
    icon: Mic,
    title: "Voice Settings",
    description: "Customize agent voices and speech patterns",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    link: "/voices"
  }
];

export default function Index() {
  // Fetch initial data to display stats
  const { data: calls = [] } = useQuery({
    queryKey: ['calls'],
    queryFn: () => listCalls(),
  });

  const { data: agents = [] } = useQuery({
    queryKey: ['agents'],
    queryFn: () => listAgents(),
  });

  // Mask API key for display
  const maskedApiKey = RETELL_API_KEY.slice(0, 8) + '...' + RETELL_API_KEY.slice(-4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Welcome to Symphony CRM
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your intelligent customer relationship management platform powered by Retell AI
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600">{agents.length}</h3>
              <p className="text-gray-600">Active Agents</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-green-600">{calls.length}</h3>
              <p className="text-gray-600">Total Calls</p>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Link 
              key={feature.title}
              to={feature.link}
              className="group p-6 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon size={24} />
              </div>
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Learn more 
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="grid gap-4">
            {calls.slice(0, 5).map((call: any) => (
              <Card key={call.call_id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{call.call_type === 'web_call' ? 'Web Call' : 'Phone Call'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(call.start_timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      call.call_status === 'ended' ? 'text-green-500' :
                      call.call_status === 'ongoing' ? 'text-blue-500' :
                      'text-gray-500'
                    }`}>
                      {call.call_status.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration: {call.end_timestamp ? 
                        Math.round((call.end_timestamp - call.start_timestamp) / 1000) + 's' : 
                        'Ongoing'
                      }
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* API Info */}
        <div className="mt-16 text-center">
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium mb-4">
            Connected to Retell API
          </div>
          <p className="text-gray-600">
            Using API Key: {maskedApiKey}
          </p>
        </div>
      </div>
    </div>
  );
}

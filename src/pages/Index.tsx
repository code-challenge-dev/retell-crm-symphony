
import { Phone, Users, Mic, Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Welcome to Symphony CRM
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your intelligent customer relationship management platform powered by Retell AI
          </p>
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

        {/* API Info */}
        <div className="mt-16 text-center">
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium mb-4">
            Powered by Retell API
          </div>
          <p className="text-gray-600">
            Using API Key: key_bc69ed16c81fa347d618b4763cb7
          </p>
        </div>
      </div>
    </div>
  );
}

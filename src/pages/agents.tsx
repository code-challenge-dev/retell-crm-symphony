
import { Users } from "lucide-react";

export default function Agents() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold">Agents</h1>
      </div>
      <p className="text-gray-600">
        Manage your AI agents and their configurations.
      </p>
    </div>
  );
}

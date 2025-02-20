
import { Brain } from "lucide-react";

export default function Knowledge() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Brain className="w-8 h-8 text-purple-500" />
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
      </div>
      <p className="text-gray-600">
        Manage your AI knowledge base and training data.
      </p>
    </div>
  );
}


import { Mic } from "lucide-react";

export default function Voices() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Mic className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold">Voices</h1>
      </div>
      <p className="text-gray-600">
        Configure and manage your AI voice settings.
      </p>
    </div>
  );
}

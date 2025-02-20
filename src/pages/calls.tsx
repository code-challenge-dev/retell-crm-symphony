
import { Phone } from "lucide-react";

export default function Calls() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Phone className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Calls</h1>
      </div>
      <p className="text-gray-600">
        View and manage your call history and recordings here.
      </p>
    </div>
  );
}

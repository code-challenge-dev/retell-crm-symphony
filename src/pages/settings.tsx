
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-gray-500" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <p className="text-gray-600">
        Configure your application settings and preferences.
      </p>
    </div>
  );
}

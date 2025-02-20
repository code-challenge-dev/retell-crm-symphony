
import { useState, useEffect } from 'react';
import { Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { listCalls, createPhoneCall, createWebCall, RetellCall } from '@/lib/retell';

export default function CallsPage() {
  const [calls, setCalls] = useState<RetellCall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await listCalls();
        setCalls(response);
      } catch (error) {
        console.error('Error fetching calls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  const handleCreatePhoneCall = async () => {
    try {
      const result = await createPhoneCall(
        '+1234567890', // Replace with actual from number
        '+0987654321', // Replace with actual to number
        'your-agent-id' // Replace with actual agent ID
      );
      setCalls([result, ...calls]);
    } catch (error) {
      console.error('Error creating phone call:', error);
    }
  };

  const handleCreateWebCall = async () => {
    try {
      const result = await createWebCall('your-agent-id'); // Replace with actual agent ID
      setCalls([result, ...calls]);
    } catch (error) {
      console.error('Error creating web call:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calls</h1>
        <div className="space-x-4">
          <Button onClick={handleCreatePhoneCall} className="gap-2">
            <Phone className="w-4 h-4" />
            New Phone Call
          </Button>
          <Button onClick={handleCreateWebCall} className="gap-2">
            <Video className="w-4 h-4" />
            New Web Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading calls...</p>
        ) : (
          calls.map((call) => (
            <Card key={call.call_id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {call.call_type === 'phone_call' ? (
                    <Phone className="w-5 h-5" />
                  ) : (
                    <Video className="w-5 h-5" />
                  )}
                  {call.call_type === 'phone_call' ? call.to_number : 'Web Call'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Status: {call.call_status}</p>
                {call.transcript && (
                  <p className="mt-2 text-sm line-clamp-3">{call.transcript}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

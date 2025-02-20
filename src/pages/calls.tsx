
import { useState, useEffect } from 'react';
import { Phone, Video, Delete, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { listCalls, createPhoneCall, createWebCall } from '@/services/retell/calls';
import { listAgents } from '@/services/retell/agents';
import { listVoices } from '@/services/retell/voices';

export default function CallsPage() {
  const [calls, setCalls] = useState([]);
  const [agents, setAgents] = useState([]);
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [callsResponse, agentsResponse, voicesResponse] = await Promise.all([
          listCalls(),
          listAgents(),
          listVoices()
        ]);
        
        setCalls(callsResponse);
        setAgents(agentsResponse);
        setVoices(voicesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreatePhoneCall = async () => {
    if (!agents.length) {
      console.error('No agents available');
      return;
    }

    try {
      const result = await createPhoneCall({
        from_number: '+1234567890', // Replace with actual number
        to_number: '+0987654321', // Replace with actual number
        agent_id: agents[0].agent_id,
      });
      setCalls([result, ...calls]);
    } catch (error) {
      console.error('Error creating phone call:', error);
    }
  };

  const handleCreateWebCall = async () => {
    if (!agents.length) {
      console.error('No agents available');
      return;
    }

    try {
      const result = await createWebCall({
        agent_id: agents[0].agent_id,
      });
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
        ) : calls.length === 0 ? (
          <p>No calls found. Create a new call to get started.</p>
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
                {call.recording_url && (
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Play className="w-4 h-4 mr-2" />
                    Play Recording
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

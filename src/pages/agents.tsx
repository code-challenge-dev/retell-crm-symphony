
import { useState, useEffect } from 'react';
import { listAgents, createAgent } from '@/services/retell/agents';
import { listVoices } from '@/services/retell/voices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await listAgents();
        setAgents(response);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agents</h1>
        <Button>Create New Agent</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading agents...</p>
        ) : agents.length === 0 ? (
          <p>No agents found. Create a new agent to get started.</p>
        ) : (
          agents.map((agent) => (
            <Card key={agent.agent_id}>
              <CardHeader>
                <CardTitle>{agent.agent_name || 'Unnamed Agent'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Voice: {agent.voice_id}</p>
                <p>Status: Active</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

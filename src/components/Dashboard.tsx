import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Users, Brain, Mic } from 'lucide-react';
import { listCalls } from '@/services/retell/calls';
import { listAgents } from '@/services/retell/agents';
import { listKnowledgeBases } from '@/services/retell/knowledge';
import { listVoices } from '@/services/retell/voices';

export function Dashboard() {
  const [stats, setStats] = useState({
    calls: 0,
    agents: 0,
    knowledgeBases: 0,
    voices: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [calls, agents, knowledgeBases, voices] = await Promise.all([
          listCalls(),
          listAgents(),
          listKnowledgeBases(),
          listVoices(),
        ]);

        setStats({
          calls: calls.length || 0,
          agents: agents.length || 0,
          knowledgeBases: knowledgeBases.length || 0,
          voices: voices.length || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Calls', value: stats.calls, icon: Phone, color: 'text-blue-500' },
    { title: 'Active Agents', value: stats.agents, icon: Users, color: 'text-green-500' },
    { title: 'Knowledge Bases', value: stats.knowledgeBases, icon: Brain, color: 'text-purple-500' },
    { title: 'Available Voices', value: stats.voices, icon: Mic, color: 'text-orange-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            {/* We'll implement call history here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            {/* We'll implement agent status here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

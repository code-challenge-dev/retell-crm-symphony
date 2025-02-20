
import { useState } from 'react';
import { Users, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createAgent, listAgents, updateAgent } from '@/services/retell/agents';
import { listVoices } from '@/services/retell/voices';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Agents() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [agentName, setAgentName] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState('');

  // Fetch existing agents
  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryKey: ['agents'],
    queryFn: () => listAgents()
  });

  // Fetch available voices
  const { data: voices, isLoading: isLoadingVoices } = useQuery({
    queryKey: ['voices'],
    queryFn: () => listVoices()
  });

  // Create new agent
  const createAgentMutation = useMutation({
    mutationFn: () => createAgent({
      agent_name: agentName,
      voice_id: selectedVoiceId,
      response_engine: {
        type: 'retell-llm',
        llm_id: 'gpt-4', // Using default GPT-4 for this example
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast({
        title: "Agent created successfully",
        description: "Your new agent has been created",
      });
      setAgentName('');
      setSelectedVoiceId('');
    },
    onError: (error) => {
      toast({
        title: "Error creating agent",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold">Agents</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Agent</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Enter agent name"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />
          <Select
            value={selectedVoiceId}
            onValueChange={setSelectedVoiceId}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingVoices ? (
                <SelectItem value="loading" disabled>
                  Loading voices...
                </SelectItem>
              ) : (
                voices?.map((voice: any) => (
                  <SelectItem key={voice.voice_id} value={voice.voice_id}>
                    {voice.voice_name} ({voice.gender}, {voice.accent})
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <Button
            onClick={() => createAgentMutation.mutate()}
            disabled={!agentName || !selectedVoiceId}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold mb-4">Your Agents</h2>
        {isLoadingAgents ? (
          <div>Loading agents...</div>
        ) : agents?.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            No agents found. Create your first agent above.
          </Card>
        ) : (
          agents?.map((agent: any) => (
            <Card key={agent.agent_id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                    {agent.agent_name ? (
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.agent_name}`}
                        alt={agent.agent_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{agent.agent_name || 'Unnamed Agent'}</p>
                    <p className="text-sm text-gray-500">ID: {agent.agent_id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

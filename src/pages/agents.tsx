
import { useState } from 'react';
import { Users, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
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
  const { data: agents = [], isLoading: isLoadingAgents, error: agentsError } = useQuery({
    queryKey: ['agents'],
    queryFn: () => listAgents(),
    retry: 3,
  });

  // Fetch available voices
  const { data: voices = [], isLoading: isLoadingVoices } = useQuery({
    queryKey: ['voices'],
    queryFn: () => listVoices(),
  });

  // Create new agent
  const createAgentMutation = useMutation({
    mutationFn: () => createAgent({
      agent_name: agentName,
      voice_id: selectedVoiceId,
      response_engine: {
        type: 'retell-llm',
        llm_id: 'llm_5f23834a1e91167bc63041843ec2',
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

  if (agentsError) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center text-red-500">
          Error loading agents: {agentsError.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold">Agents</h1>
      </div>

      <div className="relative rounded-md border bg-white p-6 mb-8">
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
            <SelectContent position="popper" className="w-[240px]">
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
            disabled={!agentName || !selectedVoiceId || createAgentMutation.isPending}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent Name</TableHead>
              <TableHead>Agent Type</TableHead>
              <TableHead>Voice</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingAgents ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading agents...
                </TableCell>
              </TableRow>
            ) : agents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No agents found. Create your first agent above.
                </TableCell>
              </TableRow>
            ) : (
              agents.map((agent: any) => (
                <TableRow key={agent.agent_id}>
                  <TableCell className="font-medium">{agent.agent_name}</TableCell>
                  <TableCell>{agent.response_engine?.type || 'Unknown'}</TableCell>
                  <TableCell>
                    {agent.voice_id ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.voice_id}`}
                          alt={agent.voice_id}
                          className="w-6 h-6 rounded-full"
                        />
                        {agent.voice_id}
                      </div>
                    ) : (
                      'Not set'
                    )}
                  </TableCell>
                  <TableCell>{agent.phone_number || '-'}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

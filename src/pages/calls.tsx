
import { useState } from 'react';
import { Phone, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listCalls, createPhoneCall, createWebCall } from '@/services/retell/calls';
import { listAgents } from '@/services/retell/agents';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Calls() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fromNumber, setFromNumber] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState('');

  // Fetch calls
  const { data: calls = [], isLoading: isLoadingCalls, error: callsError } = useQuery({
    queryKey: ['calls'],
    queryFn: () => listCalls(),
    retry: 3,
    onError: (error: any) => {
      console.error('Error fetching calls:', error);
      toast({
        title: "Error loading calls",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Fetch agents
  const { data: agents = [], isLoading: isLoadingAgents, error: agentsError } = useQuery({
    queryKey: ['agents'],
    queryFn: () => listAgents(),
    retry: 3,
    onError: (error: any) => {
      console.error('Error fetching agents:', error);
      toast({
        title: "Error loading agents",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Create call mutation
  const createCallMutation = useMutation({
    mutationFn: (type: 'phone' | 'web') => {
      if (type === 'phone') {
        return createPhoneCall({
          to_number: phoneNumber,
          from_number: fromNumber,
          agent_id: selectedAgentId,
        });
      } else {
        return createWebCall({
          agent_id: selectedAgentId,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      toast({
        title: "Call created successfully",
        description: "Your call has been initiated",
      });
      setPhoneNumber('');
      setFromNumber('');
      setSelectedAgentId('');
    },
    onError: (error: any) => {
      console.error('Error creating call:', error);
      toast({
        title: "Error creating call",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (callsError || agentsError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Data</h2>
        <p className="text-gray-600">Please check your connection and try again</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Phone className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Calls</h1>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => createCallMutation.mutate('web')}
            disabled={!selectedAgentId || createCallMutation.isPending}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Web Call
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Make a Phone Call</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="fromNumber" className="block text-sm font-medium text-gray-700 mb-1">
                From Number
              </label>
              <Input
                id="fromNumber"
                placeholder="Enter source number (E.164 format)"
                value={fromNumber}
                onChange={(e) => setFromNumber(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="toNumber" className="block text-sm font-medium text-gray-700 mb-1">
                To Number
              </label>
              <Input
                id="toNumber"
                placeholder="Enter destination number (E.164 format)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select
              value={selectedAgentId}
              onValueChange={setSelectedAgentId}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingAgents ? (
                  <SelectItem value="loading" disabled>
                    Loading agents...
                  </SelectItem>
                ) : (
                  agents?.map((agent: any) => (
                    <SelectItem key={agent.agent_id} value={agent.agent_id}>
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                          {agent.agent_name ? (
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.agent_name}`}
                              alt={agent.agent_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                          )}
                        </div>
                        <span>{agent.agent_name || `Agent ${agent.agent_id.slice(0, 8)}`}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              onClick={() => createCallMutation.mutate('phone')}
              disabled={!phoneNumber || !fromNumber || !selectedAgentId || createCallMutation.isPending}
              className="flex-shrink-0"
            >
              Call
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
        {isLoadingCalls ? (
          <div className="text-center py-8 text-gray-600">Loading calls...</div>
        ) : calls?.length === 0 ? (
          <div className="text-center py-8 text-gray-600">No calls found</div>
        ) : (
          calls?.map((call: any) => (
            <Card key={call.call_id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{call.call_type === 'web_call' ? 'Web Call' : 'Phone Call'}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(call.start_timestamp).toLocaleString()}
                  </p>
                </div>
                

import { useState } from 'react';
import { Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation } from '@tanstack/react-query';
import { listCalls, createPhoneCall, createWebCall } from '@/services/retell/calls';

export default function Calls() {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agentId, setAgentId] = useState('');

  const { data: calls, isLoading: isLoadingCalls } = useQuery({
    queryKey: ['calls'],
    queryFn: () => listCalls(),
  });

  const createCallMutation = useMutation({
    mutationFn: (type: 'phone' | 'web') => {
      if (type === 'phone') {
        return createPhoneCall({
          to_number: phoneNumber,
          agent_id: agentId,
        });
      } else {
        return createWebCall({
          agent_id: agentId,
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Call created successfully",
        description: "Your call has been initiated",
      });
      setPhoneNumber('');
      setAgentId('');
    },
    onError: (error) => {
      toast({
        title: "Error creating call",
        description: error.message,
        variant: "destructive",
      });
    },
  });

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
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Web Call
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Make a Phone Call</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            placeholder="Enter agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />
          <Button
            onClick={() => createCallMutation.mutate('phone')}
            disabled={!phoneNumber || !agentId}
          >
            Call
          </Button>
        </div>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
        {isLoadingCalls ? (
          <div>Loading calls...</div>
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
                <div className="text-right">
                  <p className={`text-sm ${
                    call.call_status === 'ended' ? 'text-green-500' :
                    call.call_status === 'ongoing' ? 'text-blue-500' :
                    'text-gray-500'
                  }`}>
                    {call.call_status.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {call.end_timestamp ? 
                      Math.round((call.end_timestamp - call.start_timestamp) / 1000) + 's' : 
                      'Ongoing'
                    }
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

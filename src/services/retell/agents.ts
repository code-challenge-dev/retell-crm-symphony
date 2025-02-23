
import { RETELL_API_URL, RetellConfig } from '@/lib/retell';

export interface AgentConfig {
  voice_id: string;
  agent_name?: string;
  response_engine: {
    type: 'retell-llm';
    llm_id: string;
  };
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    } catch (e) {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }
  return response.json();
}

export async function createAgent(config: AgentConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-agent`, {        //this part fixed by ivan  agents->create-agent
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  return handleResponse(response);
}

export async function getAgent(agentId: string) {
  const response = await fetch(`${RETELL_API_URL}/get-agent/${agentId}`, {     //this part fixed by ivan  agents->get-agent
    ...RetellConfig,
  });
  return handleResponse(response);
}

export async function listAgents() {
  const response = await fetch(`${RETELL_API_URL}/list-agents`, {             //this part fixed by ivan  agents->list-agents
    ...RetellConfig,
  });
  return handleResponse(response);
}

export async function updateAgent(agentId: string, config: Partial<AgentConfig>) {    
  const response = await fetch(`${RETELL_API_URL}/get-agent/${agentId}`, {                   //this part fixed by ivan  agents->get-agent
    method: 'PATCH',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  return handleResponse(response);
}

export async function deleteAgent(agentId: string) {
  const response = await fetch(`${RETELL_API_URL}/agents/${agentId}`, {                         //this part fixed by ivan  agents->delete-agent
    method: 'DELETE',
    ...RetellConfig,
  });
  return handleResponse(response);
}


import { RETELL_API_URL, RetellConfig } from '@/lib/retell';

export interface AgentConfig {
  voice_id: string;
  agent_name?: string;
  response_engine: {
    type: 'retell-llm';
    llm_id: string;
  };
}

export async function createAgent(config: AgentConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-agent`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create agent');
  }
  return response.json();
}

export async function getAgent(agentId: string) {
  const response = await fetch(`${RETELL_API_URL}/get-agent/${agentId}`, {
    ...RetellConfig,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch agent');
  }
  return response.json();
}

export async function listAgents() {
  const response = await fetch(`${RETELL_API_URL}/list-agents`, {
    ...RetellConfig,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch agents');
  }
  return response.json();
}

export async function updateAgent(agentId: string, config: Partial<AgentConfig>) {
  const response = await fetch(`${RETELL_API_URL}/update-agent/${agentId}`, {
    method: 'PATCH',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update agent');
  }
  return response.json();
}

export async function deleteAgent(agentId: string) {
  const response = await fetch(`${RETELL_API_URL}/delete-agent/${agentId}`, {
    method: 'DELETE',
    ...RetellConfig,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete agent');
  }
  return response.json();
}

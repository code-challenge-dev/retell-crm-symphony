
import { RETELL_API_KEY, RETELL_API_URL } from '@/lib/retell';

export interface AgentConfig {
  voice_id: string;
  agent_name?: string;
  voice_model?: string;
  voice_temperature?: number;
  voice_speed?: number;
  volume?: number;
  responsiveness?: number;
  interruption_sensitivity?: number;
  enable_backchannel?: boolean;
  backchannel_frequency?: number;
  language?: string;
  response_engine: {
    type: 'retell-llm';
    llm_id: string;
  };
}

export async function createAgent(config: AgentConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-agent`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });
  return response.json();
}

export async function getAgent(agentId: string) {
  const response = await fetch(`${RETELL_API_URL}/get-agent/${agentId}`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    }
  });
  return response.json();
}

export async function listAgents() {
  const response = await fetch(`${RETELL_API_URL}/list-agents`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    }
  });
  return response.json();
}

export async function updateAgent(agentId: string, config: Partial<AgentConfig>) {
  const response = await fetch(`${RETELL_API_URL}/update-agent/${agentId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });
  return response.json();
}

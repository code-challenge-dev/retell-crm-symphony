
// Retell API configuration
export const RETELL_API_KEY = 'key_bc69ed16c81fa347d618b4763cb7';
export const RETELL_API_URL = 'https://api.retellai.com/v2';

// API Types
export interface RetellCall {
  call_id: string;
  call_type: 'web_call' | 'phone_call';
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';
  agent_id: string;
  from_number?: string;
  to_number?: string;
  direction?: 'inbound' | 'outbound';
  transcript?: string;
  recording_url?: string;
}

export interface RetellAgent {
  agent_id: string;
  voice_id: string;
  response_engine: {
    type: 'retell-llm';
    llm_id: string;
  };
}

// API Functions
export async function createPhoneCall(fromNumber: string, toNumber: string, agentId: string) {
  const response = await fetch(`${RETELL_API_URL}/create-phone-call`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from_number: fromNumber,
      to_number: toNumber,
      agent_id: agentId,
    }),
  });
  return response.json();
}

export async function createWebCall(agentId: string) {
  const response = await fetch(`${RETELL_API_URL}/create-web-call`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agent_id: agentId,
    }),
  });
  return response.json();
}

export async function createAgent(voiceId: string, llmId: string) {
  const response = await fetch(`${RETELL_API_URL}/create-agent`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      voice_id: voiceId,
      response_engine: {
        type: 'retell-llm',
        llm_id: llmId,
      },
    }),
  });
  return response.json();
}

export async function getCall(callId: string) {
  const response = await fetch(`${RETELL_API_URL}/get-call/${callId}`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    },
  });
  return response.json();
}

export async function listCalls() {
  const response = await fetch(`${RETELL_API_URL}/list-calls`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    },
  });
  return response.json();
}

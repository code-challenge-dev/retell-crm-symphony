
import { RETELL_API_KEY, RETELL_API_URL } from '@/lib/retell';

export interface CallConfig {
  from_number?: string;
  to_number?: string;
  agent_id: string;
  metadata?: Record<string, any>;
  retell_llm_dynamic_variables?: Record<string, any>;
}

export interface WebCallConfig {
  agent_id: string;
  metadata?: Record<string, any>;
  retell_llm_dynamic_variables?: Record<string, any>;
}

export async function createPhoneCall(config: CallConfig) {
  const response = await fetch(`${RETELL_API_URL}/calls/phone`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    throw new Error('Failed to create phone call');
  }
  return response.json();
}

export async function createWebCall(config: WebCallConfig) {
  const response = await fetch(`${RETELL_API_URL}/calls/web`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    throw new Error('Failed to create web call');
  }
  return response.json();
}

export async function updateCall(callId: string, metadata: Record<string, any>) {
  const response = await fetch(`${RETELL_API_URL}/calls/${callId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ metadata }),
  });
  if (!response.ok) {
    throw new Error('Failed to update call');
  }
  return response.json();
}

export async function listCalls(filters?: {
  agent_id?: string[];
  call_status?: ('registered' | 'ongoing' | 'ended' | 'error')[];
  call_type?: ('web_call' | 'phone_call')[];
  direction?: ('inbound' | 'outbound')[];
}) {
  const response = await fetch(`${RETELL_API_URL}/calls`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter_criteria: filters,
      sort_order: 'descending',
      limit: 50,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch calls');
  }
  return response.json();
}


import { RETELL_API_URL, RetellConfig } from '@/lib/retell';

export interface CallConfig {
  from_number?: string;
  to_number?: string;
  agent_id: string;
  metadata?: Record<string, any>;
  retell_llm_dynamic_variables?: Record<string, any>;
}

export interface BatchCallConfig {
  from_number: string;
  tasks: {
    to_number: string;
    retell_llm_dynamic_variables?: Record<string, any>;
  }[];
  name?: string;
  trigger_timestamp?: number;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    // Try to get error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    } catch (e) {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }
  return response.json();
}

export async function createPhoneCall(config: CallConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-phone-call`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  return handleResponse(response);
}

export async function createWebCall(config: CallConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-web-call`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  return handleResponse(response);
}

export async function createBatchCall(config: BatchCallConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-batch-call`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  return handleResponse(response);
}

export async function listCalls(filters?: {
  agent_id?: string[];
  call_status?: ('registered' | 'ongoing' | 'ended' | 'error')[];
  call_type?: ('web_call' | 'phone_call')[];
  direction?: ('inbound' | 'outbound')[];
}) {
  console.log('Fetching calls with filters:', filters);
  const response = await fetch(`${RETELL_API_URL}/list-calls`, {
    method: 'GET', // Changed to GET
    ...RetellConfig,
  });
  return handleResponse(response);
}

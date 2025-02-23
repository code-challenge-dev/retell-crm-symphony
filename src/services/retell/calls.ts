
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
  const response = await fetch(`${RETELL_API_URL}/v2/create-phone-call`, {              //create-phone-call->v2/create-phone-call
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  return handleResponse(response);
}

export async function createWebCall(config: CallConfig) {
  const response = await fetch(`${RETELL_API_URL}/v2/create-web-call`, {                     //create-web-call->v2/create-web-call
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
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      }
    });
  }
  const queryString = params.toString();
  const url = queryString ? `${RETELL_API_URL}/calls?${queryString}` : `${RETELL_API_URL}/calls`;
  
  const response = await fetch(url, {
    method: 'GET',
    ...RetellConfig,
  });
  return handleResponse(response);
}

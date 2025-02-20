
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

export async function createPhoneCall(config: CallConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-phone-call`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create phone call');
  }
  return response.json();
}

export async function createWebCall(config: CallConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-web-call`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create web call');
  }
  return response.json();
}

export async function createBatchCall(config: BatchCallConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-batch-call`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create batch call');
  }
  return response.json();
}

export async function listCalls(filters?: {
  agent_id?: string[];
  call_status?: ('registered' | 'ongoing' | 'ended' | 'error')[];
  call_type?: ('web_call' | 'phone_call')[];
  direction?: ('inbound' | 'outbound')[];
}) {
  const response = await fetch(`${RETELL_API_URL}/list-calls`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify({
      filter_criteria: filters,
      sort_order: 'descending',
      limit: 50,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch calls');
  }
  return response.json();
}

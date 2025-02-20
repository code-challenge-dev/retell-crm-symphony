
import { RETELL_API_KEY, RETELL_API_URL } from '@/lib/retell';

export interface KnowledgeBase {
  knowledge_base_id: string;
  knowledge_base_name: string;
  status: 'in_progress' | 'complete' | 'error';
  enable_auto_refresh: boolean;
  last_refreshed_timestamp?: number;
}

export async function createKnowledgeBase(name: string, texts: { title: string, text: string }[], urls?: string[]) {
  const formData = new FormData();
  formData.append('knowledge_base_name', name);
  
  if (texts) {
    formData.append('knowledge_base_texts', JSON.stringify(texts));
  }
  
  if (urls) {
    formData.append('knowledge_base_urls', JSON.stringify(urls));
  }

  const response = await fetch(`${RETELL_API_URL}/create-knowledge-base`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    },
    body: formData
  });
  return response.json();
}

export async function getKnowledgeBase(id: string) {
  const response = await fetch(`${RETELL_API_URL}/get-knowledge-base/${id}`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    }
  });
  return response.json();
}

export async function listKnowledgeBases() {
  const response = await fetch(`${RETELL_API_URL}/list-knowledge-bases`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    }
  });
  return response.json();
}


import { RETELL_API_URL, RetellConfig } from '@/lib/retell';

export interface KnowledgeBaseConfig {
  knowledge_base_name: string;
  knowledge_base_texts?: {
    title: string;
    text: string;
  }[];
  knowledge_base_urls?: string[];
  enable_auto_refresh?: boolean;
}

export async function createKnowledgeBase(config: KnowledgeBaseConfig) {
  const response = await fetch(`${RETELL_API_URL}/create-knowledge-base`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create knowledge base');
  }
  return response.json();
}

export async function getKnowledgeBase(knowledgeBaseId: string) {
  const response = await fetch(`${RETELL_API_URL}/get-knowledge-base/${knowledgeBaseId}`, {
    ...RetellConfig,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch knowledge base');
  }
  return response.json();
}

export async function listKnowledgeBases() {
  const response = await fetch(`${RETELL_API_URL}/list-knowledge-bases`, {
    ...RetellConfig,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch knowledge bases');
  }
  return response.json();
}

export async function deleteKnowledgeBase(knowledgeBaseId: string) {
  const response = await fetch(`${RETELL_API_URL}/delete-knowledge-base/${knowledgeBaseId}`, {
    method: 'DELETE',
    ...RetellConfig,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete knowledge base');
  }
  return response.json();
}

export async function addKnowledgeBaseSources(knowledgeBaseId: string, config: {
  knowledge_base_texts?: { title: string; text: string; }[];
  knowledge_base_urls?: string[];
}) {
  const response = await fetch(`${RETELL_API_URL}/add-knowledge-base-sources/${knowledgeBaseId}`, {
    method: 'POST',
    ...RetellConfig,
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add knowledge base sources');
  }
  return response.json();
}

export async function deleteKnowledgeBaseSource(knowledgeBaseId: string, sourceId: string) {
  const response = await fetch(`${RETELL_API_URL}/delete-knowledge-base-source/${knowledgeBaseId}/source/${sourceId}`, {
    method: 'DELETE',
    ...RetellConfig,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete knowledge base source');
  }
  return response.json();
}

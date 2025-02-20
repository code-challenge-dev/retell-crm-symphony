
import { useState, useEffect } from 'react';
import { listKnowledgeBases, createKnowledgeBase } from '@/services/retell/knowledge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function KnowledgeBasePage() {
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKnowledgeBases = async () => {
      try {
        const response = await listKnowledgeBases();
        setKnowledgeBases(response);
      } catch (error) {
        console.error('Error fetching knowledge bases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledgeBases();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <Button>Create New Knowledge Base</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading knowledge bases...</p>
        ) : knowledgeBases.length === 0 ? (
          <p>No knowledge bases found. Create a new one to get started.</p>
        ) : (
          knowledgeBases.map((kb) => (
            <Card key={kb.knowledge_base_id}>
              <CardHeader>
                <CardTitle>{kb.knowledge_base_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Status: {kb.status}</p>
                {kb.last_refreshed_timestamp && (
                  <p>Last Updated: {new Date(kb.last_refreshed_timestamp).toLocaleString()}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

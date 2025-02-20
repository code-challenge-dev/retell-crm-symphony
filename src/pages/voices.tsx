
import { useState, useEffect } from 'react';
import { listVoices } from '@/services/retell/voices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function VoicesPage() {
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await listVoices();
        setVoices(response);
      } catch (error) {
        console.error('Error fetching voices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoices();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Voice Selection</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading voices...</p>
        ) : voices.length === 0 ? (
          <p>No voices available.</p>
        ) : (
          voices.map((voice) => (
            <Card key={voice.voice_id}>
              <CardHeader>
                <CardTitle>{voice.voice_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Provider: {voice.provider}</p>
                <p>Gender: {voice.gender}</p>
                {voice.accent && <p>Accent: {voice.accent}</p>}
                {voice.preview_audio_url && (
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Play className="w-4 h-4 mr-2" />
                    Preview Voice
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

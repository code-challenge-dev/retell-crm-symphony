
import { useState } from 'react';
import { Mic, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { listVoices } from '@/services/retell/voices';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Voices() {
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Fetch available voices
  const { data: voices, isLoading } = useQuery({
    queryKey: ['voices'],
    queryFn: () => listVoices()
  });

  const handlePlayPreview = (voiceId: string, previewUrl: string) => {
    if (playingVoiceId === voiceId) {
      setPlayingVoiceId(null);
      // Stop audio
    } else {
      setPlayingVoiceId(voiceId);
      // Play audio
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Mic className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold">Voices</h1>
      </div>

      <Card className="p-6">
        {isLoading ? (
          <div className="text-center py-8">Loading voices...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voice Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Accent</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voices?.map((voice: any) => (
                <TableRow key={voice.voice_id}>
                  <TableCell className="font-medium">{voice.voice_name}</TableCell>
                  <TableCell>{voice.provider}</TableCell>
                  <TableCell className="capitalize">{voice.gender}</TableCell>
                  <TableCell>{voice.accent}</TableCell>
                  <TableCell>{voice.age}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePlayPreview(voice.voice_id, voice.preview_audio_url)}
                      >
                        {playingVoiceId === voice.voice_id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Volume2 className="w-4 h-4 text-gray-400" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}

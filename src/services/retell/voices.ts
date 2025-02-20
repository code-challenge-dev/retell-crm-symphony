
import { RETELL_API_KEY, RETELL_API_URL } from '@/lib/retell';

export interface Voice {
  voice_id: string;
  voice_name: string;
  provider: 'elevenlabs' | 'openai' | 'deepgram';
  gender: 'male' | 'female';
  accent?: string;
  age?: string;
  preview_audio_url?: string;
}

export async function listVoices() {
  const response = await fetch(`${RETELL_API_URL}/list-voices`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch voices');
  }
  return response.json();
}

export async function getVoice(voiceId: string) {
  const response = await fetch(`${RETELL_API_URL}/get-voice/${voiceId}`, {
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch voice');
  }
  return response.json();
}

import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../config/openai';

const openai = new OpenAI({
  apiKey: OPENAI_CONFIG.apiKey,
  dangerouslyAllowBrowser: true,
});

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    // Converter Blob para File
    const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'pt',
    });

    return transcription.text;
  } catch (error) {
    console.error('Erro ao transcrever áudio:', error);
    throw new Error('Não foi possível transcrever o áudio.');
  }
}
import { useState, useCallback } from 'react';
import { AudioRecorder } from '../services/audioRecorder';
import { transcribeAudio } from '../services/transcription';

export function useAudioRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const audioRecorder = new AudioRecorder();

  const startRecording = useCallback(async () => {
    try {
      await audioRecorder.startRecording();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('Erro ao iniciar gravação');
      console.error(err);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      const audioBlob = await audioRecorder.stopRecording();
      setIsRecording(false);
      
      // Transcrever o áudio
      const text = await transcribeAudio(audioBlob);
      setTranscription(text);
    } catch (err) {
      setError('Erro ao parar gravação');
      console.error(err);
    }
  }, []);

  return {
    isRecording,
    transcription,
    error,
    startRecording,
    stopRecording,
  };
}
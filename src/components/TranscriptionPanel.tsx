import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useAudioRecording } from '../hooks/useAudioRecording';

export function TranscriptionPanel() {
  const {
    isRecording,
    transcription,
    error,
    startRecording,
    stopRecording,
  } = useAudioRecording();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Transcrição em Tempo Real</h2>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-2 rounded-full ${
            isRecording
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="h-64 overflow-y-auto bg-gray-50 p-4 rounded">
        {transcription ? (
          <p className="text-gray-700 whitespace-pre-wrap">{transcription}</p>
        ) : (
          <p className="text-gray-400 italic">
            {isRecording ? 'Gravando...' : 'Clique no botão do microfone para começar a gravação'}
          </p>
        )}
      </div>
    </div>
  );
}
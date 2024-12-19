export interface Meeting {
  id: string;
  title: string;
  date: Date;
  transcription: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  transcriptionReference?: string;
}
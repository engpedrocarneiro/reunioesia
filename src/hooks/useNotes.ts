import { useState, useCallback } from 'react';
import { generateAINotes } from '../services/openai';
import type { Note } from '../types';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

const STORAGE_KEY = 'meeting-notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadFromLocalStorage(STORAGE_KEY) || []);

  const addNote = useCallback(async (content: string, transcription: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
    };

    setNotes(prev => {
      const updatedNotes = [...prev, newNote];
      saveToLocalStorage(STORAGE_KEY, updatedNotes);
      return updatedNotes;
    });

    try {
      // Gerar notas complementares com IA
      const aiContent = await generateAINotes(transcription, content);
      
      const aiNote: Note = {
        id: Date.now().toString(),
        content: aiContent,
        type: 'ai',
        timestamp: new Date(),
        transcriptionReference: transcription,
      };

      setNotes(prev => {
        const updatedNotes = [...prev, aiNote];
        saveToLocalStorage(STORAGE_KEY, updatedNotes);
        return updatedNotes;
      });
    } catch (error) {
      console.error('Erro ao gerar notas com IA:', error);
    }
  }, []);

  return { notes, addNote };
}
import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { AlertCircle } from 'lucide-react';
import { ExportButton } from './ExportButton';

interface NotesEditorProps {
  transcription: string;
  title?: string;
}

export function NotesEditor({ transcription, title = 'Reunião' }: NotesEditorProps) {
  const [newNote, setNewNote] = useState('');
  const { notes, addNote } = useNotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      await addNote(newNote, transcription);
      setNewNote('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Anotações</h2>
        <ExportButton notes={notes} title={title} />
      </div>
      
      <div className="space-y-4 mb-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-3 rounded ${
              note.type === 'user' ? 'bg-white border' : 'bg-gray-50'
            }`}
          >
            <p className={note.type === 'user' ? 'text-black' : 'text-gray-600'}>
              {note.content}
            </p>
            <div className="text-xs text-gray-400 mt-1">
              {note.type === 'user' ? 'Sua nota' : 'Sugestão da IA'}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Digite suas anotações aqui... Use # para títulos"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <div className="flex justify-between items-center mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Adicionar Nota
          </button>
          <span className="text-sm text-gray-500">
            Use # para criar títulos (ex: # Tarefas)
          </span>
        </div>
      </form>
    </div>
  );
}
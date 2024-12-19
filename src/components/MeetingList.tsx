import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, Loader } from 'lucide-react';
import { useGoogleCalendar } from '../hooks/useGoogleCalendar';
import type { Meeting } from '../types';

interface MeetingListProps {
  onSelectMeeting: (meeting: Meeting) => void;
}

export function MeetingList({ onSelectMeeting }: MeetingListProps) {
  const { meetings, isLoading, error, signIn } = useGoogleCalendar();

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={signIn}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Nenhuma reunião encontrada</p>
        <button
          onClick={signIn}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Conectar com Google Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectMeeting(meeting)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
            <div className="flex items-center text-gray-500 space-x-4">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {format(meeting.date, "d 'de' MMMM", { locale: ptBR })}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {format(meeting.date, 'HH:mm')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
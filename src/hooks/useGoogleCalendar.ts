import { useState, useEffect, useCallback } from 'react';
import { GoogleCalendarService } from '../services/googleCalendar';
import type { Meeting } from '../types';

export function useGoogleCalendar() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const calendarService = GoogleCalendarService.getInstance();

  const loadMeetings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const meetings = await calendarService.listMeetings();
      setMeetings(meetings);
    } catch (err) {
      setError('Erro ao carregar reuniões');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async () => {
    try {
      await calendarService.signIn();
      await loadMeetings();
    } catch (err) {
      setError('Erro ao fazer login com Google');
      console.error(err);
    }
  }, [loadMeetings]);

  const signOut = useCallback(async () => {
    try {
      await calendarService.signOut();
      setMeetings([]);
    } catch (err) {
      setError('Erro ao fazer logout');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => loadMeetings();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [loadMeetings]);

  return {
    meetings,
    isLoading,
    error,
    signIn,
    signOut,
    loadMeetings,
  };
}
import { GOOGLE_CONFIG } from '../config/google';
import type { Meeting } from '../types';

export class GoogleCalendarService {
  private static instance: GoogleCalendarService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): GoogleCalendarService {
    if (!GoogleCalendarService.instance) {
      GoogleCalendarService.instance = new GoogleCalendarService();
    }
    return GoogleCalendarService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await new Promise((resolve, reject) => {
        gapi.load('client:auth2', async () => {
          try {
            await gapi.client.init({
              apiKey: GOOGLE_CONFIG.apiKey,
              clientId: GOOGLE_CONFIG.clientId,
              scope: GOOGLE_CONFIG.scope,
              discoveryDocs: GOOGLE_CONFIG.discoveryDocs,
            });
            this.isInitialized = true;
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      throw new Error('Falha ao inicializar o Google Calendar');
    }
  }

  async signIn(): Promise<void> {
    await this.initialize();
    await gapi.auth2.getAuthInstance().signIn();
  }

  async signOut(): Promise<void> {
    await this.initialize();
    await gapi.auth2.getAuthInstance().signOut();
  }

  async listMeetings(): Promise<Meeting[]> {
    await this.initialize();

    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.result.items.map(event => ({
      id: event.id,
      title: event.summary || 'Sem título',
      date: new Date(event.start.dateTime || event.start.date),
      transcription: '',
      notes: [],
    }));
  }
}
import type { Note } from '../types';

export class EmailService {
  static async sendNotesByEmail(notes: Note[], email: string): Promise<void> {
    // Mock do serviço de e-mail
    console.log(`Enviando notas para ${email}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('E-mail enviado com sucesso');
  }
}
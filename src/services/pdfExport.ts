import { jsPDF } from 'jspdf';
import type { Note } from '../types';

export class PdfExporter {
  static async exportNotes(notes: Note[], title: string): Promise<Blob> {
    const doc = new jsPDF();
    let yPosition = 20;

    // Título
    doc.setFontSize(16);
    doc.text(title, 20, yPosition);
    yPosition += 10;

    // Notas
    doc.setFontSize(12);
    notes.forEach(note => {
      // Adiciona tipo da nota
      doc.setFont('helvetica', 'bold');
      doc.text(note.type === 'user' ? 'Nota do Usuário:' : 'Sugestão da IA:', 20, yPosition);
      yPosition += 7;

      // Adiciona conteúdo
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(note.content, 170);
      lines.forEach(line => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, 20, yPosition);
        yPosition += 7;
      });
      yPosition += 5;
    });

    return doc.output('blob');
  }
}
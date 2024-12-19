import React, { useState } from 'react';
import { Download, Mail, Loader } from 'lucide-react';
import { PdfExporter } from '../services/pdfExport';
import { EmailService } from '../services/emailService';
import type { Note } from '../types';

interface ExportButtonProps {
  notes: Note[];
  title: string;
}

export function ExportButton({ notes, title }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const blob = await PdfExporter.exportNotes(notes, title);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);
    try {
      await EmailService.sendNotesByEmail(notes, email);
      setShowEmailForm(false);
      setEmail('');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <button
          onClick={handleExportPdf}
          disabled={isExporting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          {isExporting ? (
            <Loader className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Exportar PDF
        </button>
        <button
          onClick={() => setShowEmailForm(true)}
          disabled={isExporting}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <Mail className="h-4 w-4 mr-2" />
          Enviar por E-mail
        </button>
      </div>

      {showEmailForm && (
        <div className="absolute top-12 right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
          <form onSubmit={handleSendEmail}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o e-mail"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isExporting}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotesEditor } from '../components/NotesEditor';

describe('NotesEditor', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('renders correctly', () => {
    render(<NotesEditor transcription="" />);
    expect(screen.getByText('Anotações')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Digite suas anotações aqui/)).toBeInTheDocument();
  });

  it('allows adding new notes', async () => {
    render(<NotesEditor transcription="" />);
    const input = screen.getByPlaceholderText(/Digite suas anotações aqui/);
    const submitButton = screen.getByText('Adicionar Nota');

    fireEvent.change(input, { target: { value: 'Nova nota de teste' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Nova nota de teste')).toBeInTheDocument();
  });

  it('shows export options', () => {
    render(<NotesEditor transcription="" />);
    expect(screen.getByText('Exportar PDF')).toBeInTheDocument();
    expect(screen.getByText('Enviar por E-mail')).toBeInTheDocument();
  });
});
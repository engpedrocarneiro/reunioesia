import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TranscriptionPanel } from '../components/TranscriptionPanel';
import { useAudioRecording } from '../hooks/useAudioRecording';

// Mock do hook useAudioRecording
vi.mock('../hooks/useAudioRecording', () => ({
  useAudioRecording: vi.fn(),
}));

describe('TranscriptionPanel', () => {
  beforeEach(() => {
    // Reset do mock antes de cada teste
    vi.mocked(useAudioRecording).mockReturnValue({
      isRecording: false,
      transcription: '',
      error: null,
      startRecording: vi.fn(),
      stopRecording: vi.fn(),
    });
  });

  it('renders correctly', () => {
    render(<TranscriptionPanel />);
    expect(screen.getByText('Transcrição em Tempo Real')).toBeInTheDocument();
  });

  it('shows recording button', () => {
    render(<TranscriptionPanel />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays error message when present', () => {
    vi.mocked(useAudioRecording).mockReturnValue({
      isRecording: false,
      transcription: '',
      error: 'Erro de teste',
      startRecording: vi.fn(),
      stopRecording: vi.fn(),
    });

    render(<TranscriptionPanel />);
    expect(screen.getByText('Erro de teste')).toBeInTheDocument();
  });
});
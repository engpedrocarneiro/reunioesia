import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MeetingList } from '../components/MeetingList';
import { useGoogleCalendar } from '../hooks/useGoogleCalendar';

// Mock do hook useGoogleCalendar
vi.mock('../hooks/useGoogleCalendar', () => ({
  useGoogleCalendar: vi.fn(),
}));

describe('MeetingList', () => {
  beforeEach(() => {
    // Reset do mock antes de cada teste
    vi.mocked(useGoogleCalendar).mockReturnValue({
      meetings: [],
      isLoading: false,
      error: null,
      signIn: vi.fn(),
    });
  });

  it('renders empty state correctly', () => {
    render(<MeetingList onSelectMeeting={() => {}} />);
    expect(screen.getByText('Nenhuma reunião encontrada')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.mocked(useGoogleCalendar).mockReturnValue({
      meetings: [],
      isLoading: true,
      error: null,
      signIn: vi.fn(),
    });

    render(<MeetingList onSelectMeeting={() => {}} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays error message when present', () => {
    vi.mocked(useGoogleCalendar).mockReturnValue({
      meetings: [],
      isLoading: false,
      error: 'Erro de conexão',
      signIn: vi.fn(),
    });

    render(<MeetingList onSelectMeeting={() => {}} />);
    expect(screen.getByText('Erro de conexão')).toBeInTheDocument();
  });

  it('renders meeting list when data is available', () => {
    const mockMeetings = [
      {
        id: '1',
        title: 'Reunião de Teste',
        date: new Date(),
        transcription: '',
        notes: [],
      },
    ];

    vi.mocked(useGoogleCalendar).mockReturnValue({
      meetings: mockMeetings,
      isLoading: false,
      error: null,
      signIn: vi.fn(),
    });

    render(<MeetingList onSelectMeeting={() => {}} />);
    expect(screen.getByText('Reunião de Teste')).toBeInTheDocument();
  });
});
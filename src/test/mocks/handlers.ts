import { rest } from 'msw';
import { OPENAI_CONFIG } from '../../config/openai';

export const handlers = [
  // Mock para a API da OpenAI
  rest.post('https://api.openai.com/v1/chat/completions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        choices: [
          {
            message: {
              content: 'Resposta simulada da IA',
            },
          },
        ],
      })
    );
  }),

  // Mock para a API do Google Calendar
  rest.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: [
          {
            id: '1',
            summary: 'Reunião de Teste',
            start: { dateTime: new Date().toISOString() },
          },
        ],
      })
    );
  }),
];
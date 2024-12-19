import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../config/openai';

const openai = new OpenAI({
  apiKey: OPENAI_CONFIG.apiKey,
  dangerouslyAllowBrowser: true,
});

export async function generateAINotes(transcription: string, userNotes: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente especializado em gerar anotações complementares de reuniões. Analise a transcrição e as notas do usuário para criar anotações estruturadas e relevantes.',
        },
        {
          role: 'user',
          content: `
            Transcrição da reunião:
            ${transcription}

            Notas do usuário:
            ${userNotes}

            Por favor, gere anotações complementares estruturadas, destacando pontos importantes não cobertos nas notas do usuário.
            Se houver títulos marcados com "#", crie subtópicos detalhados para cada um.
          `,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Erro ao gerar notas com IA:', error);
    throw new Error('Não foi possível gerar as notas complementares.');
  }
}
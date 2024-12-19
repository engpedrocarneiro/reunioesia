import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import matchers from '@testing-library/jest-dom/matchers';

// Configura o servidor MSW
const server = setupServer(...handlers);

// Estende os matchers do Vitest
expect.extend(matchers);

// Setup e teardown do servidor MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());
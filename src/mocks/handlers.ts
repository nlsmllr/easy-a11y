import { http, HttpHandler, HttpResponse, passthrough } from 'msw';
import { vi } from 'vitest';

// Mocking matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

export const handlers: HttpHandler[] = [
  http.get('/test/:demoParameter', ({ request, params }) => {
    const { demoParameter } = params;
    if (demoParameter === '404') {
      return new Response('Not Found', { status: 404 });
    }
    if (demoParameter === 'json') {
      return HttpResponse.json({ message: 'Hello, World!' });
    }
    if (request.headers.get('x-auth-token') !== 'valid-token') {
      return new Response('Unauthorized', { status: 401 });
    }

    return passthrough();
  }),
];

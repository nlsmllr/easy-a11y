import { describe, expect, it } from 'vitest';

describe('demo endpoint', () => {
  it('returns 404 for an invalid page', async () => {
    const response = await fetch('/test/404');
    expect(response.status).toBe(404);
  });

  it('returns JSON response for "json" parameter', async () => {
    const response = await fetch('/test/json');
    expect(await response.json()).toEqual({ message: 'Hello, World!' });
  });

  it('returns 401 for unauthorized requests', async () => {
    const response = await fetch('/test/any', {
      headers: { 'x-auth-token': 'invalid-token' },
    });
    expect(response.status).toBe(401);
  });
});

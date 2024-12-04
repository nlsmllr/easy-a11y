'use client';

import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type CheckResult = {
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  accessibility: {
    issues: Array<{
      code: string;
      message: string;
      type: string;
    }>;
  };
};

export default function URLCheck() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/check-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to check URL');
        }
        setResults(data);
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error(`Received invalid response from server: ${text}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Error: ${errorMessage}. Please try again or contact support if the issue persists.`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter any URL to check</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            aria-label="URL to check"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Check URL'}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {results && (
          <div className="mt-4 space-y-4">
            <h2 className="text-xl font-semibold">Results:</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(results.lighthouse).map(([key, value]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="capitalize">{key}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{(value * 100).toFixed(0)}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <h3 className="text-lg font-semibold">Accessibility Issues:</h3>
            {results.accessibility.issues.length > 0 ? (
              results.accessibility.issues.map((issue, index) => (
                <Alert key={index} variant={issue.type === 'error' ? 'destructive' : 'default'}>
                  <AlertTitle>{issue.type === 'error' ? 'Error' : 'Warning'}</AlertTitle>
                  <AlertDescription>{issue.message}</AlertDescription>
                </Alert>
              ))
            ) : (
              <Alert>
                <AlertDescription>No accessibility issues found.</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

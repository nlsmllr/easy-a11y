import { VercelRequest, VercelResponse } from '@vercel/node';
import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import pa11y from 'pa11y';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let chrome;
  try {
    // Launch Chrome
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    // Run Lighthouse
    const runnerResult = await lighthouse(url, {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    });

    // Parse Lighthouse results
    const reportJson = JSON.parse(runnerResult.report);

    // Run pa11y with WCAG2AA
    const pa11yResults = await pa11y(url, { standard: 'WCAG2AA' });

    // Prepare the response
    const response = {
      lighthouse: {
        performance: reportJson.categories.performance.score,
        accessibility: reportJson.categories.accessibility.score,
        bestPractices: reportJson.categories['best-practices'].score,
        seo: reportJson.categories.seo.score,
      },
      accessibility: {
        issues: pa11yResults.issues,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while checking the URL' });
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

import { Launcher } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { NextResponse } from 'next/server';
import pa11y from 'pa11y';

export async function POST(req: Request) {
  let chrome;
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log(`Starting check for URL: ${url}`);

    // Launch Chrome
    try {
      chrome = await Launcher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
      console.log('Chrome launched successfully');
    } catch (chromeError) {
      console.error('Error launching Chrome:', chromeError);
      return NextResponse.json({ error: 'Failed to launch Chrome', details: chromeError.message }, { status: 500 });
    }

    // Run Lighthouse
    let reportJson;
    try {
      console.log('Starting Lighthouse check');
      const runnerResult = await lighthouse(url, {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
      });
      console.log('Lighthouse check completed');
      reportJson = JSON.parse(runnerResult.report);
    } catch (lighthouseError) {
      console.error('Error running Lighthouse:', lighthouseError);
      return NextResponse.json(
        { error: 'Failed to run Lighthouse check', details: lighthouseError.message },
        { status: 500 },
      );
    }

    // Run pa11y with WCAG2AA
    let pa11yResults;
    try {
      console.log('Starting pa11y check');
      pa11yResults = await pa11y(url, { standard: 'WCAG2AA' });
      console.log('pa11y check completed');
    } catch (pa11yError) {
      console.error('Error running pa11y:', pa11yError);
      return NextResponse.json(
        { error: 'Failed to run accessibility check', details: pa11yError.message },
        { status: 500 },
      );
    }

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

    console.log('Check completed successfully');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Unexpected error in API route:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred while checking the URL',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
        console.log('Chrome instance closed');
      } catch (killError) {
        console.error('Error killing Chrome instance:', killError);
      }
    }
  }
}

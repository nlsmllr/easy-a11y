declare module 'pa11y' {
  interface Pa11yResult {
    documentTitle: string;
    pageUrl: string;
    issues: Array<{
      code: string;
      context: string;
      message: string;
      selector: string;
      type: string;
      typeCode: number;
    }>;
  }

  interface Pa11yOptions {
    standard?: string;
    includeNotices?: boolean;
    includeWarnings?: boolean;
    level?: string;
  }

  function pa11y(url: string, options?: Pa11yOptions): Promise<Pa11yResult>;

  export = pa11y;
}

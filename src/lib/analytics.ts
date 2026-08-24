export interface SafeAnalyticsProperties {
  tool?: string;
  inputFormat?: string;
  outputFormat?: string;
  fileCount?: number;
  success?: boolean;
  durationBucket?: '<1s' | '1-3s' | '3-10s' | '>10s';
  errorCategory?: string;
  [key: string]: unknown;
}

export function track(eventName: string, properties: SafeAnalyticsProperties = {}): void {
  try {
    // Non-blocking asynchronous execution
    setTimeout(() => {
      // Filter out any sensitive properties if present
      const safeProps: SafeAnalyticsProperties = {
        tool: properties.tool,
        inputFormat: properties.inputFormat,
        outputFormat: properties.outputFormat,
        fileCount: properties.fileCount,
        success: properties.success,
        durationBucket: properties.durationBucket,
        errorCategory: properties.errorCategory,
      };

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics Track] ${eventName}:`, safeProps);
      }

      // If Google Analytics or window.gtag exists
      if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as unknown as { gtag: Function }).gtag === 'function') {
        (window as unknown as { gtag: Function }).gtag('event', eventName, safeProps);
      }
    }, 0);
  } catch (err) {
    // Analytics failure must never interrupt application execution
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics Error swallowed]', err);
    }
  }
}

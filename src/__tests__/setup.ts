// Polyfill URL.createObjectURL & revokeObjectURL if absent in jsdom environment
if (typeof window !== 'undefined') {
  if (!window.URL.createObjectURL) {
    window.URL.createObjectURL = (blob: Blob) => `blob:mock-url-${Math.random().toString(36).substring(7)}`;
  }
  if (!window.URL.revokeObjectURL) {
    window.URL.revokeObjectURL = () => {};
  }
}

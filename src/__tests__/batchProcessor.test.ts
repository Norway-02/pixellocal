import { describe, it, expect } from 'vitest';
import { BatchProcessor } from '../lib/engine/batchProcessor';

describe('BatchProcessor State Machine', () => {
  it('should initialize batch items in queued state', () => {
    const file1 = new File(['mock content 1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['mock content 2'], 'test2.png', { type: 'image/png' });

    const batch = new BatchProcessor([file1, file2]);
    const items = batch.getItems();

    expect(items.length).toBe(2);
    expect(items[0].status).toBe('queued');
    expect(items[1].status).toBe('queued');
  });

  it('should handle cancellation state transitions', () => {
    const file1 = new File(['mock content 1'], 'test1.jpg', { type: 'image/jpeg' });
    const batch = new BatchProcessor([file1]);

    batch.cancel();
    const items = batch.getItems();
    expect(items[0].status).toBe('cancelled');
    expect(items[0].error).toContain('cancelled');
  });
});

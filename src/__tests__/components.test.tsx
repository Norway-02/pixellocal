import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrivacyNotice from '../components/PrivacyNotice';
import AdSlot from '../components/AdSlot';

describe('UI Components', () => {
  it('should render privacy notice wording', () => {
    render(<PrivacyNotice />);
    const notice1 = screen.getByText('Processed locally in your browser');
    const notice2 = screen.getByText("Your image isn't uploaded to PixelLocal for normal processing.");
    expect(notice1).not.toBeNull();
    expect(notice2).not.toBeNull();
  });

  it('should render non-deceptive AdSlot placeholders', () => {
    render(<AdSlot position="header" />);
    const ad = screen.getByText('Advertisement');
    expect(ad).not.toBeNull();
  });
});

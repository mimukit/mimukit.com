import { describe, it, expect } from 'vitest';
import {
  isValidPostId,
  isValidFingerprintId,
  isAllowedOrigin,
  ALLOWED_ORIGINS,
} from '@/lib/feedback';

describe('isValidPostId', () => {
  it('accepts valid slugs', () => {
    expect(isValidPostId('hello-world')).toBe(true);
    expect(
      isValidPostId(
        'ai-and-cybersecurity-protecting-against-advanced-threats',
      ),
    ).toBe(true);
  });

  it('rejects empty and malformed ids', () => {
    expect(isValidPostId('')).toBe(false);
    expect(isValidPostId('has space')).toBe(false);
    expect(isValidPostId('has/slash')).toBe(false);
    expect(isValidPostId('inject;drop')).toBe(false);
    expect(isValidPostId('tab\there')).toBe(false);
  });
});

describe('isValidFingerprintId', () => {
  it('accepts a normal fingerprint', () => {
    expect(isValidFingerprintId('a'.repeat(32))).toBe(true);
  });

  it('rejects empty, non-string, and overlong values', () => {
    expect(isValidFingerprintId('')).toBe(false);
    expect(isValidFingerprintId(123 as unknown)).toBe(false);
    expect(isValidFingerprintId('a'.repeat(101))).toBe(false);
  });
});

describe('isAllowedOrigin', () => {
  it('accepts each allowed origin', () => {
    for (const origin of ALLOWED_ORIGINS) {
      expect(isAllowedOrigin(origin)).toBe(true);
    }
  });

  it('rejects missing and disallowed origins', () => {
    expect(isAllowedOrigin(null)).toBe(false);
    expect(isAllowedOrigin(undefined)).toBe(false);
    expect(isAllowedOrigin('https://evil.com')).toBe(false);
    expect(isAllowedOrigin('http://mimukit.com')).toBe(false);
  });
});

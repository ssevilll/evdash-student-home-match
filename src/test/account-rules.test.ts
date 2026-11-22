import { describe, expect, it } from 'vitest';
import { subscriptionPrice, isPromoCode, hasPremium } from '@/lib/account-rules';
describe('EvDash business rules', () => {
  it('charges 8 AZN without a code', () => expect(subscriptionPrice('')).toBe(8));
  it('charges 2 AZN rather than subtracting 2 for a valid code', () => expect(subscriptionPrice('EVDASH26')).toBe(2));
  it('requires exactly 8 characters ending in two digits', () => { expect(isPromoCode('ABCDEF12')).toBe(true); expect(isPromoCode('ABCDE12')).toBe(false); expect(isPromoCode('ABCDEFG2')).toBe(false); expect(isPromoCode('ABCDEFAB')).toBe(false); });
  it('blocks preferences without premium', () => expect(hasPremium({ status: 'inactive', current_end: '2030-01-01' })).toBe(false));
  it('allows active unexpired premium', () => expect(hasPremium({ status: 'active', current_end: '2030-01-01' }, Date.parse('2026-11-22'))).toBe(true));
  it('blocks expired premium', () => expect(hasPremium({ status: 'active', current_end: '2026-11-21' }, Date.parse('2026-11-22'))).toBe(false));
});

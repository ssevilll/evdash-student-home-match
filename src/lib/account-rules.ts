export const BASE_PRICE = 8;
export const PROMO_PRICE = 2;
export const isPromoCode = (code: string) => /^[A-Za-z0-9]{6}[0-9]{2}$/.test(code.trim());
export const subscriptionPrice = (code: string) => isPromoCode(code) ? PROMO_PRICE : BASE_PRICE;
export const hasPremium = (subscription: { status: string; current_end: string | null } | null | undefined, now = Date.now()) => Boolean(subscription && ['active', 'cancelled'].includes(subscription.status) && subscription.current_end && new Date(subscription.current_end).getTime() > now);

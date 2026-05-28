import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateTotal, subtotal } from '../src/cart.js';

describe('subtotal', () => {
  it('adds quantity times unit price for each item', () => {
    const items = [
      { name: 'Notebook', quantity: 2, unitPrice: 4.5 },
      { name: 'Pen', quantity: 3, unitPrice: 1.25 }
    ];

    assert.equal(subtotal(items), 12.75);
  });

  it('rejects negative quantities', () => {
    assert.throws(
      () => subtotal([{ name: 'Notebook', quantity: -1, unitPrice: 4.5 }]),
      /quantity cannot be negative/
    );
  });
});

describe('calculateTotal', () => {
  it('applies discount before tax', () => {
    const items = [
      { name: 'Notebook', quantity: 2, unitPrice: 10 }
    ];

    assert.equal(calculateTotal(items, { discountAmount: 5, taxRate: 0.1 }), 16.5);
  });

  it('does not allow discounts to make the total negative', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 10 }
    ];

    assert.equal(calculateTotal(items, { discountAmount: 25, taxRate: 0.1 }), 0);
  });

  it('applies SAVE10 promo code for a 10% discount', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 100 }
    ];

    assert.equal(calculateTotal(items, { promoCode: 'SAVE10' }), 90);
  });

  it('applies SAVE10 promo code after discountAmount', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 100 }
    ];

    // discountAmount reduces to 80, then SAVE10 gives 10% off => 72
    assert.equal(calculateTotal(items, { discountAmount: 20, promoCode: 'SAVE10' }), 72);
  });

  it('applies SAVE10 promo code with tax', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 100 }
    ];

    // SAVE10: 100 * 0.9 = 90, then 10% tax => 99
    assert.equal(calculateTotal(items, { promoCode: 'SAVE10', taxRate: 0.1 }), 99);
  });

  it('ignores unrecognized promo codes', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 100 }
    ];

    assert.equal(calculateTotal(items, { promoCode: 'UNKNOWN' }), 100);
  });

  it('SAVE10 on a zero subtotal (after discount) remains zero', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 10 }
    ];

    assert.equal(calculateTotal(items, { discountAmount: 20, promoCode: 'SAVE10' }), 0);
  });
});


import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateTotal, subtotal, totalItems } from '../src/cart.js';

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
});

describe('totalItems', () => {
  it('sums quantities across all items', () => {
    const items = [
      { name: 'Notebook', quantity: 2 },
      { name: 'Pen', quantity: 3 }
    ];

    assert.equal(totalItems(items), 5);
  });

  it('returns zero for an empty array', () => {
    assert.equal(totalItems([]), 0);
  });

  it('rejects negative quantities', () => {
    assert.throws(
      () => totalItems([{ name: 'Notebook', quantity: -1 }]),
      /quantity cannot be negative/
    );
  });

  it('throws when items is not an array', () => {
    assert.throws(
      () => totalItems('not an array'),
      /items must be an array/
    );
  });
});


import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateTotal, removeItem, subtotal } from '../src/cart.js';

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

describe('removeItem', () => {
  it('removes an item by name', () => {
    const items = [
      { name: 'Notebook', quantity: 2, unitPrice: 4.5 },
      { name: 'Pen', quantity: 3, unitPrice: 1.25 }
    ];

    assert.deepEqual(removeItem(items, 'Pen'), [
      { name: 'Notebook', quantity: 2, unitPrice: 4.5 }
    ]);
  });

  it('returns the original array when the name is not found', () => {
    const items = [
      { name: 'Notebook', quantity: 2, unitPrice: 4.5 }
    ];

    assert.equal(removeItem(items, 'Pen'), items);
  });

  it('throws TypeError when items is not an array', () => {
    assert.throws(
      () => removeItem('not an array', 'Notebook'),
      /items must be an array/
    );
  });
});


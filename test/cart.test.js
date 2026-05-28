import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateTotal, hasItem, subtotal } from '../src/cart.js';

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

  it('rejects negative unit prices', () => {
    assert.throws(
      () => subtotal([{ name: 'Notebook', quantity: 1, unitPrice: -4.5 }]),
      /unitPrice cannot be negative/
    );
  });

  it('throws when items is not an array', () => {
    assert.throws(
      () => subtotal('not an array'),
      /items must be an array/
    );
  });

  it('returns 0 for an empty array', () => {
    assert.equal(subtotal([]), 0);
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

  it('applies only tax when no discount is given', () => {
    const items = [
      { name: 'Notebook', quantity: 2, unitPrice: 10 }
    ];

    assert.equal(calculateTotal(items, { taxRate: 0.1 }), 22);
  });

  it('uses zero tax and zero discount by default', () => {
    const items = [
      { name: 'Notebook', quantity: 2, unitPrice: 10 }
    ];

    assert.equal(calculateTotal(items), 20);
  });

  it('rejects a negative taxRate', () => {
    const items = [{ name: 'Notebook', quantity: 1, unitPrice: 10 }];

    assert.throws(
      () => calculateTotal(items, { taxRate: -0.1 }),
      /taxRate cannot be negative/
    );
  });

  it('rejects a negative discountAmount', () => {
    const items = [{ name: 'Notebook', quantity: 1, unitPrice: 10 }];

    assert.throws(
      () => calculateTotal(items, { discountAmount: -5 }),
      /discountAmount cannot be negative/
    );
  });
});

describe('hasItem', () => {
  it('returns true when the item is present', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 4.5 },
      { name: 'Pen', quantity: 2, unitPrice: 1.25 }
    ];

    assert.equal(hasItem(items, 'Pen'), true);
  });

  it('returns false when the item is absent', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 4.5 }
    ];

    assert.equal(hasItem(items, 'Pen'), false);
  });

  it('throws when items is not an array', () => {
    assert.throws(
      () => hasItem('not an array', 'Pen'),
      /items must be an array/
    );
  });
});


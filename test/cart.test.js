import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateTotal, subtotal, applyDiscount } from '../src/cart.js';

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

describe('applyDiscount', () => {
  it('applies SAVE10 code to reduce unit prices by 10%', () => {
    const items = [
      { name: 'Notebook', quantity: 2, unitPrice: 10 },
      { name: 'Pen', quantity: 3, unitPrice: 2 }
    ];

    const result = applyDiscount(items, 'SAVE10');

    assert.equal(result[0].unitPrice, 9);
    assert.equal(result[1].unitPrice, 1.8);
  });

  it('applies SAVE20 code to reduce unit prices by 20%', () => {
    const items = [{ name: 'Notebook', quantity: 1, unitPrice: 10 }];

    const result = applyDiscount(items, 'SAVE20');

    assert.equal(result[0].unitPrice, 8);
  });

  it('applies HALF code to reduce unit prices by 50%', () => {
    const items = [{ name: 'Notebook', quantity: 1, unitPrice: 10 }];

    const result = applyDiscount(items, 'HALF');

    assert.equal(result[0].unitPrice, 5);
  });

  it('is case-insensitive for discount codes', () => {
    const items = [{ name: 'Notebook', quantity: 1, unitPrice: 10 }];

    const result = applyDiscount(items, 'save10');

    assert.equal(result[0].unitPrice, 9);
  });

  it('does not mutate the original items', () => {
    const items = [{ name: 'Notebook', quantity: 1, unitPrice: 10 }];

    applyDiscount(items, 'SAVE10');

    assert.equal(items[0].unitPrice, 10);
  });

  it('throws TypeError when items is not an array', () => {
    assert.throws(
      () => applyDiscount('not an array', 'SAVE10'),
      /items must be an array/
    );
  });

  it('throws TypeError when code is not a string', () => {
    assert.throws(
      () => applyDiscount([], 10),
      /code must be a non-empty string/
    );
  });

  it('throws TypeError when code is an empty string', () => {
    assert.throws(
      () => applyDiscount([], ''),
      /code must be a non-empty string/
    );
  });

  it('throws RangeError for an unknown discount code', () => {
    assert.throws(
      () => applyDiscount([], 'UNKNOWN'),
      /unknown discount code/
    );
  });
});


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

  it('adds shipping fee when subtotal is below the free shipping threshold', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 20 }
    ];

    assert.equal(calculateTotal(items, { freeShippingThreshold: 50 }), 25.99);
  });

  it('waives shipping fee when subtotal exactly meets the free shipping threshold', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 50 }
    ];

    assert.equal(calculateTotal(items, { freeShippingThreshold: 50 }), 50);
  });

  it('waives shipping fee when subtotal exceeds the free shipping threshold', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 60 }
    ];

    assert.equal(calculateTotal(items, { freeShippingThreshold: 50 }), 60);
  });

  it('does not add shipping fee when no threshold is set', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 20 }
    ];

    assert.equal(calculateTotal(items), 20);
  });

  it('includes shipping fee in the amount taxed', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 20 }
    ];

    assert.equal(calculateTotal(items, { freeShippingThreshold: 50, taxRate: 0.1 }), 28.59);
  });

  it('checks free shipping threshold against the discounted subtotal', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 60 }
    ];

    assert.equal(calculateTotal(items, { discountAmount: 20, freeShippingThreshold: 50 }), 45.99);
  });

  it('does not add shipping fee when subtotal meets threshold, and tax applies only to subtotal', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 50 }
    ];

    assert.equal(calculateTotal(items, { freeShippingThreshold: 50, taxRate: 0.1 }), 55);
  });

  it('waives shipping fee when discount brings subtotal to exactly meet the threshold', () => {
    const items = [
      { name: 'Notebook', quantity: 1, unitPrice: 60 }
    ];

    assert.equal(calculateTotal(items, { discountAmount: 10, freeShippingThreshold: 50 }), 50);
  });
});


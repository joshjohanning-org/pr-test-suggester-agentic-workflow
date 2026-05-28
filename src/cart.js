export function subtotal(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }

  return items.reduce((total, item) => {
    if (item.quantity < 0) {
      throw new RangeError('quantity cannot be negative');
    }

    if (item.unitPrice < 0) {
      throw new RangeError('unitPrice cannot be negative');
    }

    return total + item.quantity * item.unitPrice;
  }, 0);
}

export function calculateTotal(items, options = {}) {
  const {
    taxRate = 0,
    discountAmount = 0
  } = options;

  if (taxRate < 0) {
    throw new RangeError('taxRate cannot be negative');
  }

  if (discountAmount < 0) {
    throw new RangeError('discountAmount cannot be negative');
  }

  const discountedSubtotal = Math.max(0, subtotal(items) - discountAmount);

  return Number((discountedSubtotal * (1 + taxRate)).toFixed(2));
}

export function totalItems(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }

  return items.reduce((count, item) => {
    if (item.quantity < 0) {
      throw new RangeError('quantity cannot be negative');
    }

    return count + item.quantity;
  }, 0);
}

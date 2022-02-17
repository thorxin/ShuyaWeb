/**
 * Order Status Id - Ordered, Packed, Transporting, Transported or Deleted
 */
export const ORDERED = 1;
export const PACKED = 2;
export const DELIVERING = 3;
export const DELIVERED = 4;
export const DELETED = 5;

/**
 * Payment Status Id - Success, Checking or Fail
 */
export const PAYMENT_CHECKING = 1;
export const PAYMENT_SUCCESS = 2;
export const PAYMENT_FAIL = 3;

/**
 * Order Type - Product or Course
 */
export const ORDER_TYPE_COURSE = 'Course';
export const ORDER_TYPE_PRODUCT = 'Product';
